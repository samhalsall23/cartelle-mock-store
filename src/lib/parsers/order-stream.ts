import { OrderStreamEvent } from "@/types/client/order-stream";
import {
  REDIS_STRING_ORDER_CANCELLED,
  REDIS_STRING_ORDER_CREATED,
  REDIS_STRING_ORDER_PAID,
  REDIS_STRING_ORDER_REFUNDED,
} from "@/lib/constants";

export function isOrderStreamEvent(value: unknown): value is OrderStreamEvent {
  if (typeof value !== "string") {
    return false;
  }

  return (
    value === REDIS_STRING_ORDER_CREATED ||
    value === REDIS_STRING_ORDER_PAID ||
    value === REDIS_STRING_ORDER_REFUNDED ||
    value === REDIS_STRING_ORDER_CANCELLED
  );
}

export function parseOrderStreamEvent(
  message: unknown,
): OrderStreamEvent | null {
  return isOrderStreamEvent(message) ? message : null;
}
