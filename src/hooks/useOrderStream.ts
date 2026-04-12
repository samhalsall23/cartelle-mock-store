import { useCallback } from "react";

import { OrderStreamEvent } from "@/types/client";
import { isOrderStreamEvent } from "@/lib/parsers";
import { useStream } from "@/hooks/useStream";

type UseOrderStreamOptions = {
  onOrderUpdate?: (orderStreamEvent: OrderStreamEvent) => void;
};

// TO DO: add case for each order event

export function useOrderStream(options: UseOrderStreamOptions = {}) {
  // === PROPS ===
  const { onOrderUpdate } = options;

  const onOrderMessage = useCallback(
    (event: MessageEvent<string>) => {
      if (!isOrderStreamEvent(event.data)) {
        return;
      }

      onOrderUpdate?.(event.data);
    },
    [onOrderUpdate],
  );

  useStream({
    streamApi: "/api/orders/stream",
    onMessage: onOrderMessage,
  });
}
