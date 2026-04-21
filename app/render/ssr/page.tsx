import { LandingLayout } from "@app/layouts/Landing";
import { Button } from "@shared/ui/button";
import { Separator } from "@shared/ui/separator";
import Link from "next/link";
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// export const dynamic = '';

// One request = one load
export default async function SSR() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    { cache: "no-store" },
  ).then((response) => response.json());

  console.log("SSR log");

  return (
    <LandingLayout>
      <div className="text-center">SSR</div>
      <ul className="flex w-full flex-col gap-2 text-sm">
        {posts.map((p) => (
          <li key={p.id}>
            <dl className="flex flex-col gap-2 p-2">
              <Button className="max-w-full" asChild variant="ghost">
                <Link href={`/user/${p.userId}`}>
                  <dt className="truncate">{p.title}</dt>
                </Link>
              </Button>
              <dd className="text-muted-foreground">{p.body}</dd>
            </dl>
            <Separator />
          </li>
        ))}
      </ul>
    </LandingLayout>
  );
}
