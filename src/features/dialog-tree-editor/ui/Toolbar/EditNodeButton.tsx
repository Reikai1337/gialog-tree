import { Button } from "@shared/ui/button";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { Edit2 as Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import type { AnyNode } from "@entities/dialog-tree";
import { useMemo, useState, type ReactNode } from "react";
import { EDIT_NODE_FORM } from "../EditNodeForm";
import type { AnyRFNode } from "@features/dialog-tree-editor/model";

export const EditNodeButton = () => {
  const selectedNodeId = useEditorStore((s) => s.selectedNodeId);
  const getSelectedNode = useEditorStore((s) => s.getSelectedNode);
  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const [nodeData, setNodeData] = useState<AnyRFNode["data"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const EditForm = useMemo<ReactNode>(() => {
    if (!selectedNodeId || !nodeData) return;
    if (!EDIT_NODE_FORM[nodeData.type]) return null;

    const onSubmit = (d: AnyNode) => {
      updateNodeData(selectedNodeId, d);
      setIsOpen(false);
    };

    if (nodeData.type === "answer") {
      const Form = EDIT_NODE_FORM[nodeData.type];
      return <Form onSubmit={onSubmit} defaults={nodeData} />;
    }
    if (nodeData.type === "question") {
      const Form = EDIT_NODE_FORM[nodeData.type];
      return <Form onSubmit={onSubmit} defaults={nodeData} />;
    }
    if (nodeData.type === "scenario") {
      const Form = EDIT_NODE_FORM[nodeData.type];
      return <Form onSubmit={onSubmit} defaults={nodeData} />;
    }
    return null;
  }, [nodeData, selectedNodeId, updateNodeData]);

  const onOpenChange = (open: boolean) => {
    if (open) return;
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (!selectedNodeId) return;
    const selectedNode = getSelectedNode();
    if (!selectedNode) return;

    setNodeData(selectedNode.data);
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpen}
          disabled={!selectedNodeId}
          variant="secondary"
          size="icon-xs"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{"trigger.text"}</DialogTitle>
        </DialogHeader>
        {EditForm}
      </DialogContent>
    </Dialog>
  );
};
