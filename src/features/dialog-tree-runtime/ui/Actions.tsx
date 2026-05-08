"use client";

import { Button } from "@shared/ui/button";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const GoBackButton = () => {
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
};
export const RestartButton = () => {
  const restart = useRuntimeStore((s) => s.start);
  const history = useRuntimeStore((s) => s.history);

  const [isConfirming, setIsConfirming] = useState(false);

  const canRestart = history.length > 1;

  useEffect(() => {
    if (!isConfirming) return;
    const timer = setTimeout(() => setIsConfirming(false), 3000);
    return () => clearTimeout(timer);
  }, [isConfirming]);

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
    <Button
      disabled={!canRestart}
      onClick={handleClick}
      data-confirming={isConfirming}
    >
      {isConfirming ? "Confirm restart" : "Restart"}
    </Button>
  );
};
