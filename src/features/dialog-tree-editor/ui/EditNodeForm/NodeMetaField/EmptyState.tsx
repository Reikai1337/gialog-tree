import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/ui/empty";
import { ClipboardPenLineIcon } from "lucide-react";

export const EmptyState = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClipboardPenLineIcon />
        </EmptyMedia>
        <EmptyTitle>Nothing here yet</EmptyTitle>
        <EmptyDescription>
          Data can be added once this step is active.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
