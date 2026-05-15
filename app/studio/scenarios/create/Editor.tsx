"use client";

import { createScenario } from "@shared/firebase/scenarios";
import { ADMIN_ROUTES } from "@shared/routes";
import { DialogTreeEditorWithDemo } from "@widgets/DialogTreeEditorWithDemo";
import { useRouter } from "next/navigation";
import { revalidateScenarios } from "./actions";

export const Editor = () => {
  const router = useRouter();

  return (
    <DialogTreeEditorWithDemo
      onSubmit={async (data) => {
        const id = await createScenario(data);
        revalidateScenarios();
        router.replace(ADMIN_ROUTES.SCENARIOS.href);
      }}
    />
  );
};
