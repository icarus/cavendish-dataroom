"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Portafolio from "../content/portafolio.mdx";
import Proceso from "../content/proceso.mdx";
import Kalio from "../content/kalio.mdx";
import Estructura from "../content/estructura.mdx";
import Equipo from "../content/equipo.mdx";
import { TrackRecordContent } from "../_components/SectionTrackRecord";
import { CasosDeEstudioContent } from "../_components/SectionCasosDeEstudio";

const SECTIONS: Record<string, { badge: string; title: string; component: React.ComponentType }> = {
  portafolio: { badge: "05", title: "Construcción del portafolio", component: Portafolio },
  proceso: { badge: "06", title: "Proceso de selección", component: Proceso },
  kalio: { badge: "07", title: "Kalio", component: Kalio },
  equipo: { badge: "08", title: "Equipo", component: Equipo },
  "track-record": { badge: "09", title: "Track Record", component: TrackRecordContent },
  "casos-de-estudio": { badge: "10", title: "Casos de estudio", component: CasosDeEstudioContent },
  estructura: { badge: "11", title: "Estructura legal del fondo", component: Estructura },
};

export default function SectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const section = SECTIONS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(`/rabbit-hole#${slug}`);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slug, router]);

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
        href={`/rabbit-hole#${slug}`}
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
