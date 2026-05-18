"use client";

import type { Scenario } from "@entities/dialog-tree";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { DropdownMenuItem } from "@shared/ui/dropdown-menu";
import { Button } from "@shared/ui/button";
import { useState } from "react";
import { deleteScenario } from "@shared/firebase/scenarios";

type Props = {
  scenario: Scenario;
  onDeleted: (id: string) => void;
};

export const DeleteButton = ({ scenario, onDeleted }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteScenario(scenario.id);
    setOpen(false);

    if (res.ok) onDeleted(scenario.id);

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          variant="destructive"
        >
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="mt-2">
            Scenario{" "}
            <span className="font-medium text-foreground">
              {`"${scenario.title}" `}
            </span>
            will be permanently deleted. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
