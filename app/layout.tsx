import type { Metadata } from "next";

import { ThemeProvider } from "@app/providers/theme";

import { geistSans, geistMono } from "@app/styles/fonts";
import "@app/styles/globals.css";
import { TooltipProvider } from "@shared/ui/tooltip";

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
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
