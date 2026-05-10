import type { Metadata } from "next";
import { ThemeProvider } from "@app/providers/theme";
import { TooltipProvider } from "@shared/ui/tooltip";
import { LandingLayout } from "@app/layouts/Landing";
import { UserStoreProvider } from "@entities/user/providers";
import { getAuthenticatedAppForUser } from "@shared/api/firebase/serverApp";
import { UserSessionProvider } from "@features/auth";
import { ROUTES } from "@shared/routes";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { geistSans, geistMono } from "@app/styles/fonts";
import "@app/styles/globals.css";
import "@xyflow/react/dist/style.css";
import type { User } from "@entities/user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "App name",
  description: "An AI-powered lead generation platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  const user: User | null = !currentUser
    ? null
    : {
        uid: currentUser.uid,
        displayName: currentUser.displayName || "Unknown",
        email: currentUser.email || "Unknown",
        photoURL: currentUser.photoURL || "Unknown",
      };

  console.log("user", user?.displayName);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserStoreProvider
          initState={{ isLoading: false, user, hasUser: false }}
        >
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
