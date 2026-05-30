import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import { copy } from "@/lib/copy";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const enableVercelAnalytics = process.env.VERCEL === "1";

export const metadata: Metadata = {
  title: "NEXHIBIT — Where students get seen",
  description: copy.brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full">
        <LenisProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </LenisProvider>
        <CustomCursor />
        <Toaster richColors position="top-right" toastOptions={{ className: "nexhibit-toast" }} />
        {enableVercelAnalytics ? <Analytics /> : null}
      </body>
    </html>
  );
}
