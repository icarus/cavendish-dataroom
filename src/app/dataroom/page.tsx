"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  isPasswordVerified,
  getEmailSession,
  clearEmailSession,
  clearPasswordSession,
  isSessionTimedOut,
  resetActivity,
} from "@/lib/auth";
import * as tracking from "@/lib/tracking";

interface DataroomItem {
  name: string;
  description: string;
  href: string;
  pdfHref?: string;
}

const ITEMS: DataroomItem[] = [
  {
    name: "Investor Deck",
    description: "Pitch presentation — 4 slides",
    href: "/presentation",
  },
  {
    name: "Financial Model",
    description: "Revenue projections and unit economics",
    href: "#",
    pdfHref: "#",
  },
];

export default function DataroomPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    async function guard() {
      if (!isPasswordVerified()) {
        router.replace("/");
        return;
      }
      if (isSessionTimedOut()) {
        clearEmailSession();
        clearPasswordSession();
        router.replace("/?timeout=true");
        return;
      }

      const devBypass = !process.env.NEXT_PUBLIC_SUPABASE_URL;
      let email = "";
      let name = "";

      if (!devBypass) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        email = session?.user?.email ?? getEmailSession() ?? "";
        name = session?.user?.user_metadata?.full_name ?? "";
        if (!session && !email) {
          router.replace("/login");
          return;
        }
      }

      setReady(true);
      resetActivity();

      await tracking.startSession(email, name, 0);
      tracking.trackEvent("document_open", null, { document: "dataroom" });

      const interval = setInterval(() => {
        if (isSessionTimedOut()) {
          handleSignOut("timeout");
        }
      }, 60_000);

      return () => clearInterval(interval);
    }

    guard();
  }, [router]);

  async function handleSignOut(reason = "logout") {
    setSigningOut(true);
    await tracking.endSession(reason);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    clearEmailSession();
    clearPasswordSession();
    router.replace("/");
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 space-y-1">
          <Link
            href="/"
            className="font-[family-name:var(--font-oxanium)] text-xl font-semibold tracking-wider text-[#fcd34d] uppercase block mb-4"
          >
            Platanus
          </Link>
          <h1 className="font-[family-name:var(--font-rubik)] text-3xl font-semibold text-slate-50">
            Data Room
          </h1>
          <p className="text-sm text-slate-400">Confidential investor materials</p>
        </header>

        <div className="space-y-3">
          {ITEMS.map((item) => (
            <DataroomItem
              key={item.name}
              item={item}
              onView={() =>
                tracking.trackEvent("document_click", null, {
                  document: item.name,
                })
              }
              onPdf={() =>
                tracking.trackEvent("pdf_download", null, {
                  document: item.name,
                })
              }
            />
          ))}
        </div>

        <footer className="mt-12 flex justify-end">
          <Button
            variant="ghost"
            onClick={() => handleSignOut("logout")}
            disabled={signingOut}
            className="text-slate-400 hover:text-slate-50"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </Button>
        </footer>
      </div>
    </div>
  );
}

function DataroomItem({
  item,
  onView,
  onPdf,
}: {
  item: DataroomItem;
  onView: () => void;
  onPdf: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4">
      <div>
        <p className="font-[family-name:var(--font-rubik)] font-medium text-slate-50">
          {item.name}
        </p>
        <p className="text-sm text-slate-400">{item.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-white/20 bg-transparent text-slate-50 hover:bg-white/10 hover:text-slate-50"
          onClick={onView}
        >
          <Link href={item.href}>
            <Eye />
            View
          </Link>
        </Button>
        {item.pdfHref && (
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled={item.pdfHref === "#"}
            className="border-white/20 bg-transparent text-slate-400 hover:bg-white/10"
            onClick={onPdf}
          >
            <a
              href={item.pdfHref}
              title={item.pdfHref === "#" ? "PDF coming soon" : undefined}
            >
              <Download />
              PDF
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
