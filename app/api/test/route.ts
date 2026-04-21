import { getPosts } from "@shared/api/posts";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const posts = await getPosts();

  console.log("GET REQUEST log");

  return Response.json(posts);
  // const path = request.nextUrl.searchParams.get("path");

  // if (path) {
  //   revalidatePath(path);
  //   return Response.json({ revalidated: true, now: Date.now() });
  // }

  // return Response.json({
  //   revalidated: false,
  //   now: Date.now(),
  //   message: "Missing path to revalidate",
  // });
}
