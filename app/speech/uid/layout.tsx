import { ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { checkUserAccess } from "@shared/api/new-firebase/user-access/queries.server";
import { getAuthenticatedAppForUser } from "@shared/api/new-firebase/serverApp";
import { getFirestore } from "firebase/firestore";

export const dynamic = "force-dynamic";

export default async function AccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authIdToken = (await cookies()).get("__session")?.value;
  if (!authIdToken) return redirect(ROUTES.LOGIN.href);

  const { currentUser, firebaseServerApp } = await getAuthenticatedAppForUser();
  if (!currentUser) redirect(ROUTES.LOGIN.href);

  const hasAccess = await checkUserAccess(
    currentUser.uid,
    getFirestore(firebaseServerApp),
  );
  if (!hasAccess) redirect(ROUTES.SPEECH_NO_ACCESS.href);

  return <>{children}</>;
}
