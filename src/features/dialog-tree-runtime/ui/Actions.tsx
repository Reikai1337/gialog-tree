"use client";

import { Button } from "@shared/ui/button";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";

export const Actions = () => {
  const start = useRuntimeStore((s) => s.start);
  return (
    <div className="p-2 flex gap-2 items-center">
      <Button onClick={start}>Start</Button>
    </div>
  );
};
