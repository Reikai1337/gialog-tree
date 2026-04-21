"use client";

import { Button } from "@shared/ui/button";

export const Test = () => {
  const handleClick = async () => {
    const res = await fetch("/api/test");
    const data = await res.json();

    console.log("dat", data);
  };

  return <Button onClick={handleClick}>Test</Button>;
};
