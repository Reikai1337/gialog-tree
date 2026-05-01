import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  useReactFlow,
  type EdgeTypes,
  getBezierPath,
} from "@xyflow/react";
import { X } from "lucide-react";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const deleteEdge = () =>
    setEdges((edges) => edges.filter((e) => e.id !== id));

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: selected ? "#6366f1" : "#6366f155",
          strokeWidth: selected ? 2 : 1.5,
        }}
      />

      {selected && (
        <EdgeLabelRenderer>
          <button
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
            onClick={deleteEdge}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-colors nodrag nopan"
          >
            <X size={10} className="text-white" />
          </button>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const edgeTypes: EdgeTypes = {
  default: CustomEdge,
};
