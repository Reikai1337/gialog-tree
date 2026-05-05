"use client";

import { Button } from "@shared/ui/button";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Actions = () => {
  return (
    <div className="p-2 flex gap-2 items-center justify-between">
      <GoBackButton />
      <RestartButton />
    </div>
  );
};

function GoBackButton() {
  const goBack = useRuntimeStore((s) => s.goBack);
  const canGoBack = useRuntimeStore((s) => s.canGoBack());
  return (
    <Button
      size="icon"
      variant="secondary"
      disabled={!canGoBack}
      onClick={goBack}
    >
      <ArrowLeft />
    </Button>
  );
}

function RestartButton() {
  const restart = useRuntimeStore((s) => s.start);
  const history = useRuntimeStore((s) => s.history);

  const [isConfirming, setIsConfirming] = useState(false);

  const canRestart = history.length > 1;

  const handleClick = () => {
    if (!canRestart) return;

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    restart();
    setIsConfirming(false);
  };

  return (
    <Button disabled={!canRestart} onClick={handleClick}>
      {isConfirming ? "Confirm restart" : "Restart"}
    </Button>
  );
}
