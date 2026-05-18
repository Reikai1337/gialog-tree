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
import type { AnyNodeData, RFAnyNode } from "@entities/dialog-tree";
import { useMemo, useState, type ReactNode } from "react";
import { EDIT_NODE_FORM } from "../EditNodeForm";

export const EditNodeButton = () => {
  const selectedNodeId = useEditorStore((s) => s.selectedNodeId);
  const getSelectedNode = useEditorStore((s) => s.getSelectedNode);
  const updateNodeData = useEditorStore((s) => s.updateNodeData);
  const [nodeData, setNodeData] = useState<RFAnyNode["data"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const EditForm = useMemo<ReactNode>(() => {
    if (!selectedNodeId || !nodeData) return;
    if (!EDIT_NODE_FORM[nodeData.type]) return null;

    const onSubmit = (d: AnyNodeData) => {
      updateNodeData(selectedNodeId, d);
      setIsOpen(false);
    };

    if (nodeData.type === "outcome") {
      const Form = EDIT_NODE_FORM[nodeData.type];
      return <Form onSubmit={onSubmit} defaults={nodeData} />;
    }
    if (nodeData.type === "speech") {
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
    if (!selectedNode || !EDIT_NODE_FORM[selectedNode.type]) return;

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
          size="icon-sm"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{nodeData?.type}</DialogTitle>
        </DialogHeader>
        {EditForm}
      </DialogContent>
    </Dialog>
  );
};
