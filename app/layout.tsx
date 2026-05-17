import type { Metadata } from "next";
import { ThemeProvider } from "@app/providers/theme";
import { TooltipProvider } from "@shared/ui/tooltip";
import { LandingLayout } from "@app/layouts/Landing";
import { UserStoreProvider } from "@entities/user/providers";
import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { UserSessionProvider } from "@features/auth";
import { geistSans, geistMono } from "@app/styles/fonts";
import "@app/styles/globals.css";
import "@xyflow/react/dist/style.css";
import type { User } from "@entities/user";
import { getUser } from "@shared/new-fb/services/users";
import { getFirestore } from "firebase/firestore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Speech assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authIdToken = await getSessionToken();
  const { currentUser, firebaseServerApp } =
    await getAuthenticatedAppForUser(authIdToken);

  let user: User | null = null;

  if (currentUser) {
    user = {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email as string,
      photoURL: currentUser.photoURL,
    };
    // const res = await getUser(currentUser.uid, getFirestore(firebaseServerApp));

    // if (res.ok) {
    //   console.log("res", res.data.createdAt.toDate());
    // }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserStoreProvider initState={{ isLoading: false, user }}>
          <UserSessionProvider>
            <ThemeProvider>
              <TooltipProvider>
                <LandingLayout>{children}</LandingLayout>
              </TooltipProvider>
            </ThemeProvider>
          </UserSessionProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
