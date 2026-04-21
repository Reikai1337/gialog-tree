import { cacheLife } from "next/cache";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = async () => {
  // "use cache";
  // cacheLife("minutes");
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await data.json();

  console.log("getPosts fn");

  return posts;
};
