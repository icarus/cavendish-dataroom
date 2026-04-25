import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ExpandableSection({
  slug,
  badge,
  title,
  description,
}: {
  slug: string;
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <section id={slug} className="py-12 scroll-mt-8">
      <Badge variant="solid" className="mb-4">{badge}</Badge>
      <h2 className="font-sans font-medium text-black mb-4" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        {title}
      </h2>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <Link
        href={`/rabbit-hole/${slug}`}
        className="flex items-center gap-1 font-mono font-medium text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors"
      >
        Leer completo
        <ArrowRight size={14} />
      </Link>
    </section>
  );
}
