"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionDiagnostico } from "./_components/SectionDiagnostico";
import { SectionComunidad } from "./_components/SectionComunidad";
import { SectionComputin } from "./_components/SectionComputin";
import { SectionEstrategia } from "./_components/SectionEstrategia";
import { SectionPortafolio } from "./_components/SectionPortafolio";
import { SectionProceso } from "./_components/SectionProceso";
import { SectionKalio } from "./_components/SectionKalio";
import { SectionEstructura } from "./_components/SectionEstructura";
import { SectionTerminos } from "./_components/SectionTerminos";

const NAV_ITEMS = [
  { id: "diagnostico", label: "Diagnóstico inicial" },
  { id: "comunidad", label: "Comunidad" },
  { id: "computin", label: "El cofundador técnico" },
  { id: "estrategia", label: "Estrategia de inversión" },
  { id: "portafolio", label: "Construcción del portafolio" },
  { id: "proceso", label: "Proceso de selección" },
  { id: "kalio", label: "Kalio" },
  { id: "estructura", label: "Estructura legal del fondo" },
  { id: "terminos", label: "Términos Cavendish LP" },
];

export default function RabbitHolePage() {
  const [activeId, setActiveId] = useState("");
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeId);
  const activeButton = activeId ? navRefs.current.get(activeId) : null;
  const indicatorTop = activeButton ? activeButton.offsetTop : 0;
  const indicatorHeight = activeButton ? activeButton.offsetHeight : 0;

  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex">
        <aside className="hidden lg:block sticky top-0 self-start h-screen w-60 shrink-0 border-r border-black/10 overflow-y-auto py-8 px-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-6 px-3 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            Volver
          </Link>
          <p className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-4 px-3">Contenido</p>
          <nav className="relative space-y-0.5">
            {activeIndex >= 0 && (
              <motion.div
                className="absolute left-0 w-0.5 bg-[#FFEC40]"
                initial={false}
                animate={{
                  top: indicatorTop,
                  height: indicatorHeight,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) navRefs.current.set(item.id, el);
                }}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left font-sans font-medium text-sm leading-snug py-2 px-3 transition-colors cursor-pointer ${
                  activeId === item.id
                    ? "text-black"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 max-w-3xl mx-auto px-6 lg:px-12 pb-32">
          <div className="pt-16 pb-12 border-b border-black/10 mb-4">
            <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-sm px-2 py-0.5 mb-6 hover:bg-[#FFEC40]/90 border-transparent">
              Platanus Cavendish
            </Badge>
            <h1 className="font-sans font-medium text-black text-2xl mb-4">
              Down the Rabbit Hole
            </h1>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed max-w-xl">
              Todo lo que necesitas saber sobre el fondo: nuestra tesis, estrategia, comunidad, estructura legal y términos.
            </p>
          </div>

          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-6 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            Volver
          </Link>

          <SectionDiagnostico />
          <SectionComunidad />
          <SectionComputin />
          <SectionEstrategia />
          <SectionPortafolio />
          <SectionProceso />
          <SectionKalio />
          <SectionEstructura />
          <SectionTerminos />
        </main>
      </div>
    </div>
  );
}
