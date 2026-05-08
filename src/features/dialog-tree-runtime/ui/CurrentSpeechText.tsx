"use client";
import { Card } from "@shared/ui/card";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/ui/empty";
import { MessageCircle } from "lucide-react";
import { Button } from "@shared/ui/button";

export const CurrentSpeechText = () => {
  const speech = useRuntimeStore((s) => s.getActiveSpeech());

  if (!speech) return <EmptyState />;

  return (
    <Card asChild className="p-2 overflow-y-auto">
      <ScrollArea>
        <p className="text-3xl">{speech ? speech.data.text : "none"}</p>
      </ScrollArea>
    </Card>
  );
};

function EmptyState() {
  const start = useRuntimeStore((s) => s.start);

  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircle />
        </EmptyMedia>
        <EmptyTitle>No speech yet</EmptyTitle>
        <EmptyDescription>Start a conversation to continue</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={start} size="sm">
          Start
        </Button>
      </EmptyContent>
    </Empty>
  );
}
