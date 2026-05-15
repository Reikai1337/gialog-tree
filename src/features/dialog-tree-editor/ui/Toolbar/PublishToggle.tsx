import { useEditorStore } from "../../providers/EditorStoreProvider";
import { PublishBadge } from "@entities/dialog-tree";

export const PublishToggle = () => {
  const isPublished = useEditorStore((s) => s.isPublished);
  const toggleIsPublished = useEditorStore((s) => s.toggleIsPublished);

  return (
    <PublishBadge
      isPublished={isPublished}
      onClick={toggleIsPublished}
      className="cursor-pointer"
    />
  );
};
