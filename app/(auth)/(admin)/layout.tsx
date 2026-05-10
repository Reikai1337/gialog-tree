import { getAuthenticatedAppForUser } from "@shared/api/firebase/serverApp";
// import { AuthProvider } from "@features/auth";
import { ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authIdToken = (await cookies()).get("__session")?.value;
  if (!authIdToken) return redirect(ROUTES.LOGIN.href);

  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) redirect(ROUTES.LOGIN.href);

  // const idTokenResult = await currentUser.getIdTokenResult();
  // const isAdmin = idTokenResult.claims?.admin || false;

  // if (!isAdmin) redirect(ROUTES.LOGIN.href);

  return <>{children}</>;
}
