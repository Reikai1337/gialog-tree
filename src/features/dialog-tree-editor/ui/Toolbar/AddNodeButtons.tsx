import { Button } from "@shared/ui/button";
import { useReactFlow } from "@xyflow/react";
import { MessageSquare, MessageSquareReply } from "lucide-react";
import { useCallback, useState, type FC, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import type { AnyNode } from "@entities/dialog-tree";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { uuid } from "@shared/lib/utils/uuid";
import { EDIT_NODE_FORM } from "../EditNodeForm";

type AnyNodeType = AnyNode["type"];

type EditNodeDialog = {
  type: AnyNodeType;
  trigger: {
    text: string;
    icon: ReactNode;
  };
  ContentForm: FC<{ onSubmit: (node: AnyNode) => void }>;
};

const EDIT_NODE_DIALOGS: EditNodeDialog[] = [
  {
    type: "speech",
    trigger: {
      text: "Speech",
      icon: <MessageSquare />,
    },
    ContentForm: EDIT_NODE_FORM.speech,
  },
  {
    type: "outcome",
    trigger: {
      text: "Outcome",
      icon: <MessageSquareReply />,
    },
    ContentForm: EDIT_NODE_FORM.outcome,
  },
];

export const AddNodeButtons = () => {
  const [activeDialog, setActiveDialog] = useState<AnyNodeType | null>(null);
  const addNode = useEditorStore((s) => s.addNode);
  const { screenToFlowPosition } = useReactFlow();

  const openEditFormDialog = useCallback((type: AnyNodeType) => {
    setActiveDialog(type);
  }, []);

  const handleEditNodeDialogOpen = useCallback((open: boolean) => {
    if (open) return;
    setActiveDialog(null);
  }, []);

  const handleSubmit = useCallback(
    (formData: AnyNode) => {
      const { width, height } = document
        .querySelector(".react-flow")!
        .getBoundingClientRect();
      const base = {
        id: uuid(),
        position: screenToFlowPosition({
          x: width / 2,
          y: height / 2,
        }),
      } as const;

      switch (formData.type) {
        case "outcome":
          addNode({ ...base, type: formData.type, data: formData });
          break;
        case "speech":
          addNode({ ...base, type: formData.type, data: formData });
          break;
      }

      setActiveDialog(null);
    },
    [addNode, screenToFlowPosition],
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        {EDIT_NODE_DIALOGS.map((dialog, i) => (
          <Button
            size="icon-sm"
            variant="secondary"
            key={i}
            onClick={() => openEditFormDialog(dialog.type)}
          >
            {dialog.trigger.icon}
          </Button>
        ))}
      </div>
      {EDIT_NODE_DIALOGS.map(({ ContentForm, trigger, type }) => (
        <Dialog
          key={type}
          open={activeDialog === type}
          onOpenChange={handleEditNodeDialogOpen}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto md:max-w-md">
            <DialogHeader>
              <DialogTitle>{trigger.text}</DialogTitle>
            </DialogHeader>
            <ContentForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};
