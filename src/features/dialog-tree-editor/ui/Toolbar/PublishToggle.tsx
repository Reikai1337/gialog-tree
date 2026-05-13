import { Badge } from "@shared/ui/badge";
import { useEditorStore } from "../../providers/EditorStoreProvider";

export const PublishToggle = () => {
  const isPublished = useEditorStore((s) => s.isPublished);
  const toggleIsPublished = useEditorStore((s) => s.toggleIsPublished);

  return (
    <Badge
      onClick={toggleIsPublished}
      className="cursor-pointer"
      variant={isPublished ? "green" : "blue"}
    >
      {isPublished ? "Published" : "Draft"}
    </Badge>
  );
};
