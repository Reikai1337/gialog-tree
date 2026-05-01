import { MessageCircleQuestionMark, MessageSquare } from "lucide-react";
import { cn } from "@shared/lib/utils";
import type {
  ScenarioNodeColor,
  QuestionNode as QuestionNodeType,
} from "../model";
import type { ReactNode } from "react";

type Props = QuestionNodeType & {
  selected?: boolean;
  beforeSlot?: ReactNode;
  afterSlot?: ReactNode;
};

export function QuestionNode({
  title,
  description,
  afterSlot,
  beforeSlot,
  selected,
}: Props) {
  return (
    <div
      className={`
        bg-slate-900 rounded-xl px-4 py-3 min-w-55 max-w-75
        transition-all duration-150 ease-in-out
        ${selected ? "border border-indigo-500" : "border border-slate-700"}
      `}
    >
      {beforeSlot}

      <div className="flex items-start gap-2.5">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-1.5 shrink-0">
          <MessageSquare size={14} className="text-indigo-500" />
        </div>
        <div>
          <div className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1">
            Вопрос
          </div>
          <div className="text-sm font-medium text-slate-100 leading-snug">
            {title}
          </div>
          <div className="text-xs text-slate-500 mt-1 leading-snug">
            {description}
          </div>
        </div>
      </div>

      {afterSlot}
    </div>
  );
}
