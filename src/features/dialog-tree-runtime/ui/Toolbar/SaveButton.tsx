import { Button } from "@shared/ui/button";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { Save } from "lucide-react";

export const SaveButton = () => {
  const onSubmit = useEditorStore((s) => s.onSubmitCallback);
  const nodes = useEditorStore((s) => s.nodes);
  const edges = useEditorStore((s) => s.edges);

  const handleSave = () => {
    if (!onSubmit) return;
    onSubmit({ nodes, edges });
  };

  return (
    <Button onClick={handleSave} size="icon-xs">
      <Save />
    </Button>
  );
};
