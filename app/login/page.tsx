import { LoginPage } from "@pages/login";
import { ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page() {
  // const authIdToken = (await cookies()).get("__session")?.value;

  // if (authIdToken) return redirect(ROUTES.DASHBOARD.href);

  return <LoginPage />;
}
