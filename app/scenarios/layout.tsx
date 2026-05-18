import { FALLBACK_ROUTES, PUBLIC_ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import { getUser } from "@shared/firebase/users";

export const dynamic = "force-dynamic";

export default async function AccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authIdToken = await getSessionToken();
  if (!authIdToken) return redirect(PUBLIC_ROUTES.LOGIN.href);

  const { currentUser, firebaseServerApp } =
    await getAuthenticatedAppForUser(authIdToken);
  if (!currentUser) redirect(PUBLIC_ROUTES.LOGIN.href);

  const res = await getUser(currentUser.uid, getFirestore(firebaseServerApp));

  if (!res.ok || !res.data.hasAccess) redirect(FALLBACK_ROUTES.NO_ACCESS.href);

  return <>{children}</>;
}
