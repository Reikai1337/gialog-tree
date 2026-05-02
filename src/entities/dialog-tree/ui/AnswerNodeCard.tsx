import { Layers } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type { AnswerNodeColor, AnswerNode as AnswerNodeType } from "../model";
import type { ReactNode } from "react";
import { NodeMetaBadgesList } from "./NodeMetaBadgesList";
import { Separator } from "@shared/ui/separator";
import { Card } from "@shared/ui/card";

type Palette = {
  bg: string;
  border: string;
  accent: string;
  accentBg: string;
  text: string;
};

const ANSWER_COLORS: Record<AnswerNodeColor, Palette> = {
  green: {
    bg: "bg-[#052e16]",
    border: "border-[#166534]",
    accent: "text-[#4ade80]",
    accentBg: "bg-[#4ade80]",
    text: "text-[#bbf7d0]",
  },
  amber: {
    bg: "bg-[#1c1200]",
    border: "border-[#854d0e]",
    accent: "text-[#fbbf24]",
    accentBg: "bg-[#fbbf24]",
    text: "text-[#fef3c7]",
  },
  red: {
    bg: "bg-[#1f0a0a]",
    border: "border-[#991b1b]",
    accent: "text-[#f87171]",
    accentBg: "bg-[#f87171]",
    text: "text-[#fecaca]",
  },
  purple: {
    bg: "bg-[#0f0720]",
    border: "border-[#6d28d9]",
    accent: "text-[#c084fc]",
    accentBg: "bg-[#c084fc]",
    text: "text-[#ede9fe]",
  },
  default: {
    bg: "bg-gray-900",
    border: "border-gray-700",
    accent: "text-gray-400",
    accentBg: "bg-gray-400",
    text: "text-gray-300",
  },
};

type Props = AnswerNodeType & {
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
  selected?: boolean;
};

export function AnswerNodeCard({
  color,
  hint,
  text,
  selected,
  afterSlot,
  beforeSlot,
  meta,
}: Props) {
  const colors = ANSWER_COLORS[color];

  return (
    <div
      className={cn(
        "relative rounded-xl px-4 py-3 min-w-50 max-w-70 border transition-all duration-150",
        colors.bg,

        selected ? colors.border : colors.accent,
      )}
    >
      {beforeSlot}
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "text-[10px] font-semibold tracking-wider uppercase",
            colors.accent,
          )}
        >
          Ответ
        </div>
        <Separator />

        {!!meta.length && <NodeMetaBadgesList items={meta} />}
        <div
          className={cn("text-[13px] font-medium leading-snug", colors.text)}
        >
          {text}
        </div>

        {hint && (
          <div
            className={cn(
              "text-[11px] mt-1 leading-snug opacity-70",
              colors.accent,
            )}
          >
            {hint}
          </div>
        )}
      </div>
      {afterSlot}
    </div>
  );
}
