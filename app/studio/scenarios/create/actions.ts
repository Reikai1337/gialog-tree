"use server";
import { revalidatePath } from "next/cache";

export async function revalidateScenarios() {
  revalidatePath(`/admin/scenarios`);
}
