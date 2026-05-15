"use server";
import { revalidatePath } from "next/cache";

export async function revalidateScenario(id: string) {
  revalidatePath(`/admin/scenarios/${id}`);
}
