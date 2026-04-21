import { AuthProvider } from "@app/providers/auth";
import { getAuthenticatedAppForUser } from "@shared/api/firebase/serverApp";
import { ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PrivateRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  if (!currentUser) redirect(ROUTES.HOME.href);

  return <AuthProvider>{children}</AuthProvider>;
}
