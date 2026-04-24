"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Portafolio from "../content/portafolio.mdx";
import Proceso from "../content/proceso.mdx";
import Kalio from "../content/kalio.mdx";
import Estructura from "../content/estructura.mdx";

const SECTIONS: Record<string, { badge: string; title: string; component: React.ComponentType }> = {
  portafolio: { badge: "05", title: "Construcción del portafolio", component: Portafolio },
  proceso: { badge: "06", title: "Proceso de selección", component: Proceso },
  kalio: { badge: "07", title: "Kalio", component: Kalio },
  estructura: { badge: "08", title: "Estructura legal del fondo", component: Estructura },
};

export default function SectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const section = SECTIONS[slug];

  if (!section) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-sans font-medium text-black/40 text-sm">Sección no encontrada.</p>
      </div>
    );
  }

  const Content = section.component;

  return (
    <div className="min-h-screen bg-white relative">
      <Link
        href="/rabbit-hole"
        className="fixed top-8 left-8 flex items-center gap-2 font-mono font-medium text-black/40 text-sm uppercase tracking-wider hover:text-black transition-colors z-10"
      >
        <ArrowLeft size={14} />
        Volver
      </Link>

      <main className="max-w-3xl mx-auto px-6 lg:px-12 pb-32">
        <motion.div
          className="pt-16 mb-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Content />
        </motion.div>
      </main>
    </div>
  );
}
