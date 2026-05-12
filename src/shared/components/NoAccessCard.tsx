"use client";

import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/button";
import { Card, CardContent } from "@shared/ui/card";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

export const NoAccessCard = ({ className }: Props) => {
  const router = useRouter();

  return (
    <Card className={cn("border-border/60 shadow-sm", className)}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border bg-muted/40">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Access restricted
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Your account doesn’t currently have permission to view this page. If
            you believe this is a mistake, please contact your administrator.
          </p>

          <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={() => router.back()}>
              Go back
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => router.push("/")}
            >
              Go to homepage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
