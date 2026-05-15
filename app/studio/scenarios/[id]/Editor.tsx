"use client";

import { type Scenario, updateScenario } from "@shared/firebase/scenarios";
import { ADMIN_ROUTES } from "@shared/routes";
import { DialogTreeEditorWithDemo } from "@widgets/DialogTreeEditorWithDemo";
import { useRouter } from "next/navigation";
import { revalidateScenario } from "./actions";

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
