import React, { useEffect, useState } from "react";
import { useUsersTableStore } from "../providers";
import { Input } from "@shared/ui/input";
import { useDebounce } from "@shared/lib/hooks";

export const SearchInput = () => {
  const setSearch = useUsersTableStore((s) => s.setSearch);
  const [value, setValue] = useState("");

  const debouncedSearch = useDebounce(value);

  useEffect(() => {
    // setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search by email..."
    />
  );
};
