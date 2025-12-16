/**
 * Formats a date to "4 Mar, 2025" format
 */

export function formatBlogDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
