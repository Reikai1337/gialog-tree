"use client";
import { Card } from "@shared/ui/card";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { useMemo } from "react";

export const CurrentSpeechText = () => {
  const speech = useRuntimeStore((s) => s.getActiveSpeech());

  return (
    <Card asChild className="p-2 overflow-y-auto">
      <ScrollArea>
        <p className="text-5xl">{speech ? speech.data.text : "none"}</p>
      </ScrollArea>
    </Card>
  );
};
