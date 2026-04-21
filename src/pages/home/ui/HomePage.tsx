import { LandingLayout } from "@app/layouts/Landing";
import { AuthProvider } from "@app/providers/auth";
import { UserInfo } from "@entities/user";
import { Button } from "@shared/ui/button";
import { Separator } from "@shared/ui/separator";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const HomePage = async () => {
  // const posts: Post[] = await fetch(
  //   "https://jsonplaceholder.typicode.com/posts",
  // ).then((response) => response.json());

  return (
    <AuthProvider>
      <LandingLayout>
        <h1>home</h1>
        <UserInfo />
        {/* <div>123</div> */}
        {/* <ul className="flex w-full flex-col gap-2 text-sm">
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
      </ul> */}
      </LandingLayout>
    </AuthProvider>
  );
};
