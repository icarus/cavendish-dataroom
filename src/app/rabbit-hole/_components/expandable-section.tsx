"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ExpandableSection({
  id,
  badge,
  title,
  preview,
  children,
}: {
  id: string;
  badge: string;
  title: string;
  preview: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section id={id} className="py-16 border-b border-black/10">
      <Badge variant="solid" className="mb-4">{badge}</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        {title}
      </h2>
      {!open && preview}
      {open && children}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 font-mono font-medium text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors cursor-pointer",
          !open && "mt-6"
        )}
      >
        {open ? "Cerrar" : "Leer completo"}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
    </section>
  );
}
