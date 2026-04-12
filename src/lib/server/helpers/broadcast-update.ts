import { Redis } from "@upstash/redis";

import { REDIS_CHANNEL_ORDER_UPDATES } from "@/lib/constants";
import { OrderStreamEventType } from "@/types/client";

const redis = Redis.fromEnv();

export const broadcastOrderUpdate = async (type: OrderStreamEventType) => {
  await redis.publish(REDIS_CHANNEL_ORDER_UPDATES, type);
};
