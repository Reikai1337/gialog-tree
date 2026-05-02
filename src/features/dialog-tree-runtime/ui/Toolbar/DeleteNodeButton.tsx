import { Button } from "@shared/ui/button";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { Trash } from "lucide-react";

export const DeleteNodeButton = () => {
  const deleteNode = useEditorStore((s) => s.deleteNode);
  const selectedNodeId = useEditorStore((s) => s.selectedNodeId);

  const handleDelete = () => {
    if (!selectedNodeId) return;
    deleteNode(selectedNodeId);
  };

  return (
    <Button
      disabled={!selectedNodeId}
      variant="destructive"
      onClick={handleDelete}
      size="icon-xs"
    >
      <Trash />
    </Button>
  );
};
