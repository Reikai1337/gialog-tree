import { Button } from "@shared/ui/button";
import { useEditorStore } from "../../providers/EditorStoreProvider";
import { Save } from "lucide-react";
import { toAppEdge, toAppNode } from "@entities/dialog-tree";
import { useState } from "react";
import { Spinner } from "@shared/ui/spinner";

export const SaveButton = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = useEditorStore((s) => s.onSubmit);
  const nodes = useEditorStore((s) => s.nodes);
  const edges = useEditorStore((s) => s.edges);
  const title = useEditorStore((s) => s.title);
  const isPublished = useEditorStore((s) => s.isPublished);

  const handleSave = async () => {
    if (!onSubmit) return;
    setLoading(true);
    await onSubmit({
      title,
      isPublished,
      edges: edges.map(toAppEdge),
      nodes: nodes.map(toAppNode),
    });
    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={handleSave} size="icon-sm">
      {loading ? <Spinner /> : <Save />}
    </Button>
  );
};
