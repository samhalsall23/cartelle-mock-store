import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

import { REDIS_CHANNEL_ORDER_UPDATES } from "@/lib/constants";
import { parseOrderStreamEvent } from "@/lib/parsers";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  let cleanup = () => {};

  const stream = new ReadableStream({
    start(controller) {
      const sub = redis.subscribe([REDIS_CHANNEL_ORDER_UPDATES]);
      let isClosed = false;

      cleanup = () => {
        if (isClosed) {
          return;
        }

        isClosed = true;
        sub.unsubscribe();

        try {
          controller.close();
        } catch {
          // Stream may already be closed.
        }
      };

      // Clean when client disconnects
      req.signal.addEventListener("abort", cleanup);

      sub.on("message", ({ message }) => {
        if (isClosed) {
          return;
        }

        const orderStreamEvent = parseOrderStreamEvent(message);

        if (!orderStreamEvent) {
          return;
        }

        try {
          controller.enqueue(`data: ${orderStreamEvent}\n\n`);
        } catch {
          // connection closed, do nothing
          cleanup();
        }
      });
    },

    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
