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
import Terminos from "./content/terminos.mdx";
import { SectionReveal } from "./_components/section-reveal";
import { ReadMoreSection, P, H3, StatGrid, Hl } from "./_components/mdx-components";

const NAV_ITEMS = [
  { id: "diagnostico", label: "Diagnóstico inicial" },
  { id: "comunidad", label: "Comunidad" },
  { id: "computin", label: "El cofundador técnico" },
  { id: "estrategia", label: "Estrategia de inversión" },
  { id: "portafolio", label: "Construcc. del portaf." },
  { id: "proceso", label: "Proceso de selección" },
  { id: "kalio", label: "Kalio" },
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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              ref={(el) => {
                if (el) navRefs.current.set(item.id, el);
              }}
              onClick={() => scrollTo(item.id)}
              initial={{ opacity: 0, x: 6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.03, ease: "easeOut" }}
              className={cn(
                "uppercase block w-full text-left font-mono font-medium text-sm leading-snug py-1 px-3 transition-colors cursor-pointer",
                activeId === item.id ? "text-black" : "text-black/30 hover:text-black/60"
              )}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </aside>

      <main className="max-w-3xl mx-auto px-6 lg:px-12 pb-32">
        <motion.div
          className="pt-16 mb-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge variant="solid" className="mb-6">
            Platanus Cavendish
          </Badge>
          <h1 className="font-sans font-medium text-black text-2xl mb-4">
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
          <ReadMoreSection id="portafolio" badge="05" title="Construcción del portafolio" slug="portafolio">
            <div className="space-y-4">
              <P>Al planear una construcción de portafolio tenemos que comprobar como se logra llegar a un retorno de 3x en base a un portafolio exitoso.</P>
              <P>Destinaremos <Hl>$6,400,000</Hl> para inversiones del programa de aceleración en <Hl>32 nuevas startups</Hl>, <Hl>$1,800,000</Hl> para inversiones oportunísticas y <Hl>$3,600,000</Hl> para follow ons.</P>
            </div>
          </ReadMoreSection>
        </SectionReveal>
        <SectionReveal>
          <ReadMoreSection id="proceso" badge="06" title="Proceso de selección" slug="proceso">
            <div className="space-y-4">
              <P>Diseñamos nuestro proceso para seleccionar a los mejores equipos dentro de un gran volumen de postulaciones. Desde el 2020 hemos recibido más de <Hl>9.549 aplicaciones</Hl> y seleccionado <Hl>121 startups</Hl>.</P>
              <StatGrid items={[
                { label: "Postulaciones revisadas", value: "+9.549" },
                { label: "Entrevistas realizadas", value: "+1.600" },
                { label: "Tasa de aceptación", value: "~1%" },
              ]} />
            </div>
          </ReadMoreSection>
        </SectionReveal>
        <SectionReveal>
          <ReadMoreSection id="kalio" badge="07" title="Kalio" slug="kalio">
            <div className="space-y-4">
              <P>Kalio es el <Hl>centro de la operación de Platanus</Hl>. Somos un VC con base tecnológica y nuestro equipo puede ser tan pequeño porque delegamos gran parte de nuestros procesos al software que construimos.</P>
              <P>Kalio gestiona todo: postulaciones, proceso de selección, programa de aceleración, Demo Days y seguimiento de alumni.</P>
            </div>
          </ReadMoreSection>
        </SectionReveal>
        <SectionReveal>
          <ReadMoreSection id="estructura" badge="08" title="Estructura legal del fondo" slug="estructura">
            <div className="space-y-4">
              <P>El fondo se ha estructurado como una <Hl>Limited Partnership Canadiense</Hl>, constituido el 2 de julio de 2025.</P>
              <P>Canadá ofrece menores costos, sin límite de inversionistas y menos reportería que EEUU, manteniendo transparencia tributaria.</P>
            </div>
          </ReadMoreSection>
        </SectionReveal>
        <SectionReveal><Terminos /></SectionReveal>
      </main>

    </div>
  );
}
