import { ServerActionResponse } from "@/types";

export async function handleServerAction<T>(
  fn: () => Promise<T>,
): Promise<ServerActionResponse<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}
