import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import localFont from "next/font/local";
import { DynamicHead } from "@/components/dynamic-head";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";
import { cn } from "@/lib/utils";

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const platanusMono = localFont({
  src: "../fonts/PlatanusMono.ttf",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Platanus Cavendish LP — Investor Dataroom",
  description: "Confidential investor materials",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(ubuntuSans.variable, platanusMono.variable, "h-full")}
    >
      <body className="min-h-full bg-black text-foreground antialiased">
        <DynamicHead />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
