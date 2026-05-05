"use client";
import { Card } from "@shared/ui/card";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { useMemo } from "react";
import { Button } from "@shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/ui/empty";
import { GitBranch } from "lucide-react";
import type { OutcomeNodeColor } from "@entities/dialog-tree";

const BUTTON_BY_OUTCOME: Record<OutcomeNodeColor, string> = {
  green:
    "border-green-400/20 bg-green-400/10 text-green-200 backdrop-blur-sm hover:bg-green-400/15",

  amber:
    "border-amber-400/20 bg-amber-400/10 text-amber-100 backdrop-blur-sm hover:bg-amber-400/15",

  red: "border-red-400/20 bg-red-400/10 text-red-200 backdrop-blur-sm hover:bg-red-400/15",

  purple:
    "border-purple-400/20 bg-purple-400/10 text-purple-200 backdrop-blur-sm hover:bg-purple-400/15",

  default:
    "border-white/10 bg-white/5 text-gray-200 backdrop-blur-sm hover:bg-white/10",
};

export const OutcomesList = () => {
  const getSpeechOutcomes = useRuntimeStore((s) => s.getSpeechOutcomes);
  const activeSpeechId = useRuntimeStore((s) => s.activeSpeechId);
  const pickOutcome = useRuntimeStore((s) => s.pickOutcome);

  const choices = useMemo(() => {
    if (!activeSpeechId) return [];

    return [...getSpeechOutcomes(activeSpeechId)].sort((a, b) =>
      (a.data.text ?? "").localeCompare(b.data.text ?? "", "ru"),
    );
  }, [activeSpeechId, getSpeechOutcomes]);

  if (!choices.length) return <EmptyState />;

  return (
    <Card asChild className="p-2 overflow-y-auto">
      <ScrollArea>
        <div className=" flex gap-2 flex-wrap justify-around">
          {choices.map((c) => (
            <Button
              className={BUTTON_BY_OUTCOME[c.data.color]}
              color={"green"}
              onClick={() => pickOutcome(c.id)}
              key={c.id}
            >
              {c.data.text}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

function EmptyState() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GitBranch />
        </EmptyMedia>
        <EmptyTitle>No outcomes yet</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
