"use client";

import { Button } from "@shared/ui/button";
import { useUsersTableStore } from "../providers";
import { ButtonGroup } from "@shared/ui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Pagination = () => {
  const hasNextPage = useUsersTableStore((s) => s.hasNextPage);
  const hasPrevPage = useUsersTableStore((s) => s.hasPrevPage);
  const fetchNextPage = useUsersTableStore((s) => s.fetchNextPage);
  const fetchPrevPage = useUsersTableStore((s) => s.fetchPrevPage);
  const fetchFirstPage = useUsersTableStore((s) => s.fetchFirstPage);

  return (
    <ButtonGroup>
      <Button variant="outline" onClick={fetchPrevPage} disabled={!hasPrevPage}>
        <ArrowLeft />
      </Button>
      <Button variant="outline" onClick={fetchNextPage} disabled={!hasNextPage}>
        <ArrowRight />
      </Button>
      {/* <Button variant="outline" onClick={fetchFirstPage}>
        f
      </Button> */}
    </ButtonGroup>
  );
};
