import { ChevronRight, MessageSquareReply } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type { SpeechNode as SpeechNodeType } from "../model";
import type { ReactNode } from "react";

type Props = SpeechNodeType & {
  selected?: boolean;
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
};

export function SpeechNode({
  hint,
  text,
  afterSlot,
  beforeSlot,
  selected,
}: Props) {
  return (
    <div
      className={cn(
        "bg-[#0c1a2e] rounded-[10px] px-3.5 py-2.5 min-w-40 max-w-160 border-[1.5px] transition-all duration-150",
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
            Speech
          </div>
          <div className="text-sm font-medium text-slate-200 leading-[1.3]">
            {text}
          </div>
          <div className="text-xs text-slate-500 mt-1 leading-snug">{hint}</div>
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
