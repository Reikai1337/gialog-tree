"use client";
import { Card } from "@shared/ui/card";
import { ScrollArea } from "@shared/ui/scroll-area";
import { useRuntimeStore } from "../providers/RuntimeStoreProvider";
import { useMemo } from "react";
import { Button } from "@shared/ui/button";

export const AnswersList = () => {
  const getConnectedChoices = useRuntimeStore((s) => s.getConnectedChoices);
  const activeSpeechId = useRuntimeStore((s) => s.activeSpeechId);
  const pickAnswer = useRuntimeStore((s) => s.pickAnswer);

  const choices = useMemo(() => {
    if (!activeSpeechId) return [];

    return [...getConnectedChoices(activeSpeechId)].sort((a, b) =>
      (a.data.text ?? "").localeCompare(b.data.text ?? "", "ru"),
    );
  }, [activeSpeechId, getConnectedChoices]);

  return (
    <Card asChild className="p-2 overflow-y-auto">
      <ScrollArea>
        <div className=" flex gap-1 flex-wrap">
          {choices.map((c) => (
            <Button onClick={() => pickAnswer(c.id)} key={c.id}>
              {c.data.text}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
