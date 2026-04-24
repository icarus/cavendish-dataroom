import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ExpandableSection({
  slug,
  children,
  collapsedHeight = 400,
}: {
  slug: string;
  children: React.ReactNode;
  collapsedHeight?: number;
}) {
  return (
    <div className="relative">
      <div
        className="overflow-hidden relative"
        style={{ maxHeight: collapsedHeight }}
      >
        {children}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
      <Link
        href={`/rabbit-hole/${slug}`}
        className="flex items-center gap-1 font-mono font-medium text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors mt-4"
      >
        Leer completo
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
