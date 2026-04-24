"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExpandableSection({
  children,
  collapsedHeight = 400,
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={cn("transition-all duration-500", open ? "overflow-visible" : "overflow-hidden relative")}
        style={!open ? { maxHeight: collapsedHeight } : undefined}
      >
        {children}
        {!open && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 font-mono font-medium text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors cursor-pointer mt-4"
        >
          Leer completo
          <ChevronDown size={14} />
        </button>
      )}
    </div>
  );
}
