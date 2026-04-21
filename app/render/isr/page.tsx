import { LandingLayout } from "@app/layouts/Landing";
import { Button } from "@shared/ui/button";
import { Separator } from "@shared/ui/separator";
import Link from "next/link";
import { Test } from "./Test";
import { getPosts } from "@shared/api/posts";

// export const revalidate = 300

export default async function ISR() {
  const posts = await getPosts();

  console.log("ISR log");

  return (
    <LandingLayout>
      {/* <Test /> */}
      <div className="text-center">ISR</div>
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
