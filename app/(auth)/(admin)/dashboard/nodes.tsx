import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageSquare, ChevronRight, Layers } from "lucide-react";

// ─── Типы данных ──────────────────────────────────────────────────────────────

export type QuestionData = {
  label: string;
  hint?: string;
};

export type AnswerData = {
  label: string;
  emoji?: string;
};

export type ScenarioData = {
  label: string;
  description?: string;
  color?: string;
};

// ─── QuestionNode ─────────────────────────────────────────────────────────────
// Верхний уровень: задаёт вопрос пользователю.
// Handle снизу — из него выходят ветки к ответам.

export function QuestionNode({
  data,
  selected,
}: NodeProps<{ data: QuestionData }>) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: selected ? "1.5px solid #6366f1" : "1.5px solid #334155",
        borderRadius: 12,
        padding: "12px 16px",
        minWidth: 220,
        maxWidth: 300,
        boxShadow: selected
          ? "0 0 0 3px rgba(99,102,241,0.2)"
          : "0 4px 16px rgba(0,0,0,0.4)",
        transition: "all 0.15s ease",
      }}
    >
      {/* Входящий handle сверху (для вложенных вопросов) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#6366f1",
          border: "2px solid #0f172a",
          width: 10,
          height: 10,
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 8,
            padding: 7,
            flexShrink: 0,
          }}
        >
          <MessageSquare size={14} color="#6366f1" />
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#6366f1",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Вопрос
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#f1f5f9",
              lineHeight: 1.4,
            }}
          >
            {data.label}
          </div>
          {data.hint && (
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {data.hint}
            </div>
          )}
        </div>
      </div>

      {/* Исходящий handle снизу */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#6366f1",
          border: "2px solid #0f172a",
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}

// ─── AnswerNode ───────────────────────────────────────────────────────────────
// Вариант ответа под вопросом.
// Handle сверху (входит из вопроса), снизу (ведёт к сценарию).

export function AnswerNode({
  data,
  selected,
}: NodeProps<{ data: AnswerData }>) {
  return (
    <div
      style={{
        background: "#0c1a2e",
        border: selected ? "1.5px solid #22d3ee" : "1.5px solid #164e63",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 160,
        maxWidth: 240,
        boxShadow: selected
          ? "0 0 0 3px rgba(34,211,238,0.2)"
          : "0 2px 10px rgba(0,0,0,0.35)",
        transition: "all 0.15s ease",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#22d3ee",
          border: "2px solid #0c1a2e",
          width: 9,
          height: 9,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {data.emoji && (
          <span style={{ fontSize: 18, lineHeight: 1 }}>{data.emoji}</span>
        )}
        <div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#22d3ee",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Ответ
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#e2e8f0",
              lineHeight: 1.3,
            }}
          >
            {data.label}
          </div>
        </div>
        <ChevronRight
          size={14}
          color="#22d3ee"
          style={{ marginLeft: "auto", flexShrink: 0, opacity: 0.6 }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#22d3ee",
          border: "2px solid #0c1a2e",
          width: 9,
          height: 9,
        }}
      />
    </div>
  );
}

// ─── ScenarioNode ─────────────────────────────────────────────────────────────
// Итог ветки или начало нового сценария.
// Только входящий handle сверху (может быть и исходящий если сценарий продолжается).

const SCENARIO_COLORS: Record<
  string,
  { bg: string; border: string; accent: string; text: string }
> = {
  green: {
    bg: "#052e16",
    border: "#166534",
    accent: "#4ade80",
    text: "#bbf7d0",
  },
  amber: {
    bg: "#1c1200",
    border: "#854d0e",
    accent: "#fbbf24",
    text: "#fef3c7",
  },
  red: { bg: "#1f0a0a", border: "#991b1b", accent: "#f87171", text: "#fecaca" },
  purple: {
    bg: "#0f0720",
    border: "#6d28d9",
    accent: "#c084fc",
    text: "#ede9fe",
  },
  default: {
    bg: "#111827",
    border: "#374151",
    accent: "#9ca3af",
    text: "#d1d5db",
  },
};

export function ScenarioNode({
  data,
  selected,
}: NodeProps<{ data: ScenarioData }>) {
  const colors = SCENARIO_COLORS[data.color ?? "default"];

  return (
    <div
      style={{
        background: colors.bg,
        border: selected
          ? `1.5px solid ${colors.accent}`
          : `1.5px solid ${colors.border}`,
        borderRadius: 12,
        padding: "12px 16px",
        minWidth: 200,
        maxWidth: 280,
        boxShadow: selected
          ? `0 0 0 3px ${colors.accent}33`
          : "0 4px 14px rgba(0,0,0,0.4)",
        transition: "all 0.15s ease",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: colors.accent,
          border: `2px solid ${colors.bg}`,
          width: 10,
          height: 10,
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div
          style={{
            background: colors.border + "55",
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: 7,
            flexShrink: 0,
          }}
        >
          <Layers size={14} color={colors.accent} />
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: colors.accent,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Сценарий
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.text,
              lineHeight: 1.4,
            }}
          >
            {data.label}
          </div>
          {data.description && (
            <div
              style={{
                fontSize: 11,
                color: colors.accent + "aa",
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {data.description}
            </div>
          )}
        </div>
      </div>

      {/* Исходящий handle — если из этого сценария идёт следующий вопрос */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: colors.accent,
          border: `2px solid ${colors.bg}`,
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}

// ─── Экспорт nodeTypes ────────────────────────────────────────────────────────
// ВАЖНО: объявляй вне компонента, иначе React пересоздаёт на каждый рендер

export const nodeTypes = {
  question: QuestionNode,
  answer: AnswerNode,
  scenario: ScenarioNode,
};
