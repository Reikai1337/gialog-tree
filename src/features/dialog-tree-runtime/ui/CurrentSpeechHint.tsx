"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { Button } from "@shared/ui/button";
import { Info } from "lucide-react";

export const CurrentSpeechHint = () => {
  const hint = useRuntimeStore((s) => s.getActiveSpeech()?.data.hint);

  if (!hint) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">
          <Info />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-md">
        <p>{hint}</p>
      </TooltipContent>
    </Tooltip>
  );
};
