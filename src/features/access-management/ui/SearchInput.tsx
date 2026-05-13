"use client";
import { useEffect, useRef, useState } from "react";
import { useUsersTableStore } from "../providers";
import { Input } from "@shared/ui/input";
import { useDebounce } from "@shared/lib/hooks";

export const SearchInput = () => {
  const isFirstRender = useRef(true);
  const setSearch = useUsersTableStore((s) => s.setSearch);
  const [value, setValue] = useState("");

  const debouncedSearch = useDebounce(value);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <Input
      className="md:max-w-md"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search by email..."
    />
  );
};
