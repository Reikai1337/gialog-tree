import type { Metadata } from "next";
import { ThemeProvider } from "@app/providers/theme";
import { TooltipProvider } from "@shared/ui/tooltip";
import { LandingLayout } from "@app/layouts/Landing";
import {
  getAuthenticatedAppForUser,
  getSessionToken,
} from "@shared/firebase/serverApp";
import { UserSessionProvider } from "@features/auth";
import { geistSans, geistMono } from "@app/styles/fonts";
import { type User, UserStoreProvider } from "@entities/user";

import "@app/styles/globals.css";
import "@xyflow/react/dist/style.css";

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
  const { currentUser } = await getAuthenticatedAppForUser(authIdToken);

  let user: User | null = null;

  if (currentUser) {
    user = {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email as string,
      photoURL: currentUser.photoURL,
    };
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
