"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Diagnostico from "./content/diagnostico.mdx";
import Comunidad from "./content/comunidad.mdx";
import Computin from "./content/computin.mdx";
import Estrategia from "./content/estrategia.mdx";
import Portafolio from "./content/portafolio.mdx";
import Proceso from "./content/proceso.mdx";
import Kalio from "./content/kalio.mdx";
import Estructura from "./content/estructura.mdx";
import Terminos from "./content/terminos.mdx";
import { SectionReveal } from "./_components/section-reveal";
import { ExpandableSection } from "./_components/expandable-section";
import { SectionEquipo } from "./_components/SectionEquipo";
import { SectionTrackRecord } from "./_components/SectionTrackRecord";
import { SectionCasosDeEstudio } from "./_components/SectionCasosDeEstudio";

const NAV_ITEMS = [
  { id: "diagnostico", label: "Diagnóstico inicial" },
  { id: "comunidad", label: "Comunidad" },
  { id: "computin", label: "El cofundador técnico" },
  { id: "estrategia", label: "Estrategia de inversión" },
  { id: "portafolio", label: "Construcc. del portaf." },
  { id: "proceso", label: "Proceso de selección" },
  { id: "kalio", label: "Kalio" },
  { id: "equipo", label: "Equipo" },
  { id: "track-record", label: "Track Record" },
  { id: "casos-de-estudio", label: "Casos de estudio" },
  { id: "estructura", label: "Estructura legal" },
  { id: "terminos", label: "Términos Cavendish LP" },
];

export default function RabbitHolePage() {
  const [activeId, setActiveId] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  useEffect(() => {
    const btn = navRefs.current.get(activeId);
    if (btn) {
      setIndicatorStyle({ top: btn.offsetTop, height: btn.offsetHeight });
    }
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 32;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeId);

  return (
    <div className="min-h-screen bg-white relative">
      <aside className="hidden lg:flex flex-col fixed top-8 left-8 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono font-medium text-black/40 text-sm uppercase tracking-wider hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
        <nav className="relative">
          <AnimatePresence>
            {activeIndex >= 0 && (
              <motion.div
                className="absolute left-0 w-0.5 bg-black/80 rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  top: indicatorStyle.top,
                  height: indicatorStyle.height,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </AnimatePresence>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                if (el) navRefs.current.set(item.id, el);
              }}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "uppercase block w-full text-left font-mono font-medium text-sm leading-snug py-1 px-3 transition-colors cursor-pointer",
                activeId === item.id ? "text-black" : "text-black/30 hover:text-black/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="max-w-3xl mx-auto px-6 lg:px-12 pb-32">
        <motion.div
          className="pt-16 mb-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Badge variant="solid" className="mb-6">
            Platanus Cavendish
          </Badge>
          <h1 className="font-sans font-medium text-black text-4xl mb-4">
            Down the Rabbit Hole
          </h1>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed max-w-xl">
            Todo lo que necesitas saber sobre el fondo: nuestra tesis, estrategia, comunidad, estructura legal y términos.
          </p>
        </motion.div>

        <Link
          href="/"
          className="lg:hidden flex items-center gap-2 font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-6 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>

        <SectionReveal><Diagnostico /></SectionReveal>
        <SectionReveal><Comunidad /></SectionReveal>
        <SectionReveal><Computin /></SectionReveal>
        <SectionReveal><Estrategia /></SectionReveal>
        <SectionReveal>
          <ExpandableSection slug="portafolio"><Portafolio /></ExpandableSection>
        </SectionReveal>
        <SectionReveal>
          <ExpandableSection slug="proceso"><Proceso /></ExpandableSection>
        </SectionReveal>
        <SectionReveal>
          <ExpandableSection slug="kalio"><Kalio /></ExpandableSection>
        </SectionReveal>
        <SectionReveal><SectionEquipo /></SectionReveal>
        <SectionReveal><SectionTrackRecord /></SectionReveal>
        <SectionReveal><SectionCasosDeEstudio /></SectionReveal>
        <SectionReveal>
          <ExpandableSection slug="estructura"><Estructura /></ExpandableSection>
        </SectionReveal>
        <SectionReveal><Terminos /></SectionReveal>
      </main>

    </div>
  );
}
