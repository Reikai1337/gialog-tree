"use client";

import { ADMIN_ROUTES } from "@shared/routes";
import { DialogTreeEditorWithDemo } from "@widgets/DialogTreeEditorWithDemo";
import { useRouter } from "next/navigation";
import { revalidateScenario } from "./actions";
import { updateScenario } from "@shared/new-fb/services/scenarios";
import type { Scenario } from "@shared/new-fb/types/models";

type Props = {
  scenario: Scenario;
};

export const Editor = ({ scenario }: Props) => {
  const router = useRouter();
  const { edges, isPublished, nodes, title } = scenario;

  return (
    <DialogTreeEditorWithDemo
      initState={{ edges, isPublished, nodes, title }}
      onSubmit={async (data) => {
        await updateScenario(scenario.id, data);
        revalidateScenario(scenario.id);
        router.push(ADMIN_ROUTES.SCENARIOS.href);
      }}
    />
  );
};
