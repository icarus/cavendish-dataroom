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
        className="overflow-hidden"
        style={{ maxHeight: collapsedHeight }}
      >
        {children}
      </div>
      <Link
        href={`/rabbit-hole/${slug}`}
        className="flex items-center gap-1 font-mono font-medium text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors mt-1"
      >
        Leer completo
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
