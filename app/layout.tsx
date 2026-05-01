import type { Metadata } from "next";
import { ThemeProvider } from "@app/providers/theme";
import { TooltipProvider } from "@shared/ui/tooltip";
import { LandingLayout } from "@app/layouts/Landing";
import { UserStoreProvider } from "@entities/user/providers";

import { geistSans, geistMono } from "@app/styles/fonts";
import "@app/styles/globals.css";
import "@xyflow/react/dist/style.css";

export const metadata: Metadata = {
  title: "App name",
  description: "An AI-powered lead generation platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserStoreProvider
          initState={{ isLoading: true, user: null, hasUser: false }}
        >
          <ThemeProvider>
            <LandingLayout>
              <TooltipProvider>{children}</TooltipProvider>
            </LandingLayout>
          </ThemeProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
