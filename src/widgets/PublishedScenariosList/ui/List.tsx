"use client";

import { useEffect, useState } from "react";
import type { Scenario } from "@entities/dialog-tree";
import { getPublishedScenarios } from "@shared/firebase/scenarios";

export const List = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedScenarios()
      .then(setScenarios)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!scenarios.length) return <div>No scenarios found.</div>;

  return (
    <ul>
      {scenarios.map((s) => (
        <li key={s.id}>{s.title}</li>
      ))}
    </ul>
  );
};
