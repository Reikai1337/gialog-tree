import { ChevronRight, MessageSquareReply } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type { SpeechNode as SpeechNodeType } from "../model";
import type { ReactNode } from "react";
import { NodeMetaBadgesList } from "./NodeMetaBadgesList";
import { Separator } from "@shared/ui/separator";

type Props = SpeechNodeType & {
  selected?: boolean;
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
};

export function SpeechNodeCard({
  hint,
  text,
  afterSlot,
  beforeSlot,
  selected,
  meta,
}: Props) {
  return (
    <div
      className={cn(
        "bg-[#0c1a2e] rounded-[10px] px-3.5 py-2.5 min-w-40 max-w-160 border-[1.5px] transition-all duration-150",
        selected ? "border-cyan-400" : "border-cyan-900",
      )}
    >
      {beforeSlot}
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-1">
          Speech
        </div>
        <Separator />
        {!!meta.length && <NodeMetaBadgesList items={meta} />}
        <div className="text-sm font-medium text-slate-200 leading-[1.3]">
          {text}
        </div>
        {hint && (
          <div className="text-xs text-slate-500 mt-1 leading-snug">{hint}</div>
        )}
      </div>
      {afterSlot}
    </div>
  );
}
