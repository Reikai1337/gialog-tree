import { Layers } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type {
  ScenarioNodeColor,
  ScenarioNode as ScenarioNodeType,
  ScenarioNode,
} from "../model";
import type { ReactNode } from "react";

type Palette = {
  bg: string;
  border: string;
  accent: string;
  accentBg: string;
  text: string;
};

const SCENARIO_COLORS: Record<ScenarioNodeColor, Palette> = {
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

type Props = ScenarioNodeType & {
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
  selected?: boolean;
};

export function ScenarioNode({
  color,
  description,
  title,
  selected,
  afterSlot,
  beforeSlot,
}: Props) {
  const colors = SCENARIO_COLORS[color];

  return (
    <div
      className={cn(
        "relative rounded-xl px-4 py-3 min-w-50 max-w-70 border transition-all duration-150",
        colors.bg,

        selected ? colors.border : colors.accent,
      )}
    >
      {beforeSlot}

      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "rounded-lg p-1.5 border shrink-0",
            colors.border,
            "bg-white/5",
          )}
        >
          <Layers className={colors.accent} size={14} />
        </div>

        <div>
          <div
            className={cn(
              "text-[10px] font-semibold tracking-wider uppercase mb-1",
              colors.accent,
            )}
          >
            Сценарий
          </div>

          <div
            className={cn("text-[13px] font-medium leading-snug", colors.text)}
          >
            {title}
          </div>

          {description && (
            <div
              className={cn(
                "text-[11px] mt-1 leading-snug opacity-70",
                colors.accent,
              )}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      {afterSlot}
    </div>
  );
}
