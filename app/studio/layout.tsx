import { PUBLIC_ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { isAdmin } from "@shared/firebase/auth";

export const dynamic = "force-dynamic";

export default async function AdminRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authIdToken = await getSessionToken();
  if (!authIdToken) return redirect(PUBLIC_ROUTES.LOGIN.href);

  const { currentUser } = await getAuthenticatedAppForUser(authIdToken);
  if (!currentUser) redirect(PUBLIC_ROUTES.LOGIN.href);

  if (!(await isAdmin(currentUser))) redirect(PUBLIC_ROUTES.LOGIN.href);

  return <>{children}</>;
}
