import { Button } from "@shared/ui/button";
import { useUsersTableStore } from "../providers";

export const Pagination = () => {
  const hasNextPage = useUsersTableStore((s) => s.hasNextPage);
  const hasPrevPage = useUsersTableStore((s) => s.hasPrevPage);
  const fetchNextPage = useUsersTableStore((s) => s.fetchNextPage);
  const fetchPrevPage = useUsersTableStore((s) => s.fetchPrevPage);
  const fetchFirstPage = useUsersTableStore((s) => s.fetchFirstPage);
  const error = useUsersTableStore((s) => s.error);

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={fetchPrevPage} disabled={!hasPrevPage}>
          prev
        </Button>
        <Button onClick={fetchNextPage} disabled={!hasNextPage}>
          next
        </Button>
        <Button onClick={fetchFirstPage}>f</Button>
      </div>
      <p>{error}</p>
    </div>
  );
};
