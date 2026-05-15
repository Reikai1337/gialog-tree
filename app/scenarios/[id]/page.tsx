import { getScenario } from "@shared/firebase/scenarios/queries.server";
import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { PUBLIC_ROUTES, FALLBACK_ROUTES } from "@shared/routes";
import { getFirestore } from "firebase/firestore";
import { redirect } from "next/navigation";
import {
  CurrentSpeechText,
  OutcomesList,
  GoBackButton,
  RestartButton,
  RuntimeStoreProvider,
  EditMetaButton,
  CurrentSpeechHint,
} from "@features/dialog-tree-runtime";
import { Card } from "@shared/ui/card";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const authIdToken = await getSessionToken();
  if (!authIdToken) return redirect(PUBLIC_ROUTES.LOGIN.href);

  const { firebaseServerApp } = await getAuthenticatedAppForUser(authIdToken);

  const scenario = await getScenario(id, getFirestore(firebaseServerApp));
  if (!scenario || !scenario.isPublished)
    redirect(FALLBACK_ROUTES.NOT_FOUND.href);

  return (
    <RuntimeStoreProvider
      initState={{
        edges: scenario.edges,
        nodes: scenario.nodes,
      }}
    >
      <main className="p-2 flex-1 min-h-0 grid grid-rows-[1fr_auto_190px] grid-cols-1 gap-2">
        <CurrentSpeechText />
        <Card className="p-2 flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <GoBackButton />
            <EditMetaButton />
          </div>
          <CurrentSpeechHint />
          <RestartButton />
        </Card>
        <OutcomesList />
      </main>
    </RuntimeStoreProvider>
  );
};

export default Page;
