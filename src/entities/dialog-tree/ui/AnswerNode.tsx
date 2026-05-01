import { ChevronRight, MessageSquareReply } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type { AnswerNode as AnswerNodeType, ScenarioNodeColor } from "../model";
import type { ReactNode } from "react";

type Palette = {
  bg: string;
  border: string;
  accent: string;
  accentBg: string;
  text: string;
};

const ANSWER_COLORS: Record<ScenarioNodeColor, Palette> = {
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
  selected?: boolean;
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
};

export function AnswerNode({
  description,
  title,
  afterSlot,
  beforeSlot,
  selected,
}: Props) {
  return (
    <div
      className={cn(
        "bg-[#0c1a2e] rounded-[10px] px-3.5 py-2.5 min-w-40 max-w-60 border-[1.5px] transition-all duration-150",
        selected ? "border-cyan-400" : "border-cyan-900",
      )}
    >
      {beforeSlot}
      <div className="flex items-center gap-2">
        <div
          className={
            "rounded-lg p-1.5 border shrink-0 bg-white/5 border-gray-700"
          }
        >
          <MessageSquareReply className="text-gray-400" size={14} />
        </div>

        <div>
          <div className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-1">
            Ответ
          </div>
          <div className="text-sm font-medium text-slate-200 leading-[1.3]">
            {title}
          </div>
          <div className="text-xs text-slate-500 mt-1 leading-snug">
            {description}
          </div>
        </div>

        <ChevronRight
          size={14}
          className="ml-auto shrink-0 text-cyan-400 opacity-60"
        />
      </div>
      {afterSlot}
    </div>
  );
}
