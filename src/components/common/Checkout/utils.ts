import {
  MOCK_ARRIVAL_DAYS_MIN,
  MOCK_ARRIVAL_DAYS_MAX,
} from "@/lib/constants/checkout-constants";

export function calculateMockArrivalDate(): string {
  // Random 5-7 days from today
  const daysToAdd =
    Math.floor(
      Math.random() * (MOCK_ARRIVAL_DAYS_MAX - MOCK_ARRIVAL_DAYS_MIN + 1),
    ) + MOCK_ARRIVAL_DAYS_MIN;

  const arrivalDate = new Date();
  arrivalDate.setDate(arrivalDate.getDate() + daysToAdd);

  // Format: "Fri, Jan 31"
  return arrivalDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
