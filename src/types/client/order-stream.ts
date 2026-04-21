import {
  REDIS_STRING_ORDER_CANCELLED,
  REDIS_STRING_ORDER_CREATED,
  REDIS_STRING_ORDER_PAID,
  REDIS_STRING_ORDER_REFUNDED,
} from "@/lib/constants/redis-constants";

export type OrderStreamEventType =
  | typeof REDIS_STRING_ORDER_CREATED
  | typeof REDIS_STRING_ORDER_PAID
  | typeof REDIS_STRING_ORDER_REFUNDED
  | typeof REDIS_STRING_ORDER_CANCELLED;

export type OrderStreamEvent = OrderStreamEventType;
