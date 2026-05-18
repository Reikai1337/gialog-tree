"use client";

import { ADMIN_ROUTES } from "@shared/routes";
import { DialogTreeEditorWithDemo } from "@widgets/DialogTreeEditorWithDemo";
import { useRouter } from "next/navigation";
import { revalidateScenarios } from "./actions";
import { createScenario } from "@shared/firebase/scenarios";

export const Editor = () => {
  const router = useRouter();

  return (
    <DialogTreeEditorWithDemo
      onSubmit={async (data) => {
        const res = await createScenario(data);
        if (res.ok) {
          revalidateScenarios();
          router.replace(ADMIN_ROUTES.SCENARIOS.href);
        } else console.log("Create Scenario error:", res.error);
      }}
    />
  );
};
