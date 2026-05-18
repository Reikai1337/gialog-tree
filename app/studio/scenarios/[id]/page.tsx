import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { PUBLIC_ROUTES, FALLBACK_ROUTES } from "@shared/routes";
import { getFirestore } from "firebase/firestore";
import { redirect } from "next/navigation";
import { Editor } from "./Editor";
import { getScenario } from "@shared/firebase/scenarios";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const authIdToken = await getSessionToken();
  if (!authIdToken) return redirect(PUBLIC_ROUTES.LOGIN.href);

  const { firebaseServerApp } = await getAuthenticatedAppForUser(authIdToken);

  const res = await getScenario(id, getFirestore(firebaseServerApp));

  if (!res.ok) redirect(FALLBACK_ROUTES.NOT_FOUND.href);

  return (
    <div className="p-1 h-full w-full">
      <Editor scenario={res.data} />
    </div>
  );
};

export default Page;
