import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { nodeTypes } from "./nodes";
import { initialNodes, initialEdges } from "./data";

// ─── Стили для кастомного скроллбара и фона ───────────────────────────────────
const globalStyle = `
  .react-flow__renderer { background: #020617 !important; }
  .react-flow__controls { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; }
  .react-flow__controls-button {
    background: #0f172a;
    border: none;
    border-bottom: 1px solid #1e293b;
    color: #94a3b8;
    fill: #94a3b8;
  }
  .react-flow__controls-button:hover { background: #1e293b; }
  .react-flow__minimap { background: #0f172a !important; border: 1px solid #1e293b !important; border-radius: 8px; }
  .react-flow__edge-path { stroke-width: 1.5; }
`;

// ─── Счётчики ID ──────────────────────────────────────────────────────────────
let nodeId = 100;
let edgeId = 100;
const nextNodeId = () => `n-${nodeId++}`;
const nextEdgeId = () => `e-${edgeId++}`;

// ─── Главный компонент ────────────────────────────────────────────────────────
export function DialogTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Когда пользователь соединяет два handle мышкой — добавляем edge
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: nextEdgeId(),
            style: { stroke: "#6366f155", strokeWidth: 1.5 },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  // Клик по ноде — показываем в панели
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Клик по пустому месту — снимаем выделение
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // ── Добавление новых нод ──────────────────────────────────────────────────

  const addQuestion = useCallback(() => {
    const newNode: Node = {
      id: nextNodeId(),
      type: "question",
      // Помещаем в центр текущего viewport (упрощённо)
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 100 },
      data: { label: "Новый вопрос", hint: "Редактируй через data" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const addAnswer = useCallback(() => {
    const newNode: Node = {
      id: nextNodeId(),
      type: "answer",
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 300 },
      data: { label: "Новый ответ", emoji: "💡" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const addScenario = useCallback(() => {
    const colors = ["green", "amber", "red", "purple"];
    const newNode: Node = {
      id: nextNodeId(),
      type: "scenario",
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 500 },
      data: {
        label: "Новый сценарий",
        description: "Описание сценария",
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const deleteSelected = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id,
      ),
    );
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    // <div style={{ width: "100%", height: "100vh", background: "#020617" }}>
    // <style>{globalStyle}</style>

    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes} // ← кастомные типы нод
      fitView // ← автоматически влезть в экран при старте
      fitViewOptions={{ padding: 0.2 }}
      defaultEdgeOptions={{
        style: { stroke: "#6366f155", strokeWidth: 1.5 },
      }}
    >
      {/* Сетка на фоне */}
      <Background
        variant={BackgroundVariant.Dots}
        gap={24}
        size={1}
        color="#1e293b"
      />

      {/* Кнопки зума */}
      {/* <Controls /> */}

      {/* Миникарта */}
      <MiniMap
        nodeColor={(node) => {
          if (node.type === "question") return "#6366f1";
          if (node.type === "answer") return "#22d3ee";
          return "#4ade80";
        }}
        maskColor="#02061799"
      />

      {/* ── Панель управления (Panel — это хелпер из xyflow) ── */}
      <Panel position="top-left" className="m-0">
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minWidth: 180,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Добавить ноду
          </div>

          {[
            { label: "❓ Вопрос", onClick: addQuestion, color: "#6366f1" },
            { label: "✅ Ответ", onClick: addAnswer, color: "#22d3ee" },
            { label: "📦 Сценарий", onClick: addScenario, color: "#4ade80" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              style={{
                background: "transparent",
                border: `1px solid ${btn.color}44`,
                borderRadius: 7,
                padding: "7px 12px",
                color: btn.color,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  btn.color + "22";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              {btn.label}
            </button>
          ))}

          {selectedNode && (
            <>
              <div
                style={{
                  height: 1,
                  background: "#1e293b",
                  margin: "2px 0",
                }}
              />
              <button
                onClick={deleteSelected}
                style={{
                  background: "transparent",
                  border: "1px solid #ef444444",
                  borderRadius: 7,
                  padding: "7px 12px",
                  color: "#ef4444",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background =
                    "#ef444422";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                🗑 Удалить выбранную
              </button>
            </>
          )}
        </div>
      </Panel>

      {/* ── Инфо о выбранной ноде ── */}
      {selectedNode && (
        <Panel position="top-right">
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 10,
              padding: "12px 14px",
              minWidth: 220,
              maxWidth: 280,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#475569",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Выбрана нода
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { k: "id", v: selectedNode.id },
                { k: "type", v: selectedNode.type },
                { k: "label", v: (selectedNode.data as any).label },
                { k: "x", v: Math.round(selectedNode.position.x) },
                { k: "y", v: Math.round(selectedNode.position.y) },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  style={{ display: "flex", gap: 8, alignItems: "baseline" }}
                >
                  <span
                    style={{ fontSize: 10, color: "#475569", minWidth: 40 }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      fontFamily: "monospace",
                    }}
                  >
                    {String(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      )}
    </ReactFlow>
    // </div>
  );
}
