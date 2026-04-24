"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#F5F5F4]/95 backdrop-blur-sm border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-sans font-medium text-[#6B7280] text-base hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
        <p className="font-mono font-medium text-[#6B7280] text-base uppercase tracking-wider">
          Platanus Cavendish
        </p>
        <div className="w-20" />
      </div>

      <div className="flex">
        {/* Sidebar nav — desktop only */}
        <aside className="hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r border-[#E5E7EB] overflow-y-auto py-8 px-5">
          <p className="font-mono font-medium text-[#6B7280] text-base uppercase tracking-wider mb-4 px-3">Contenido</p>
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block font-sans font-medium text-[#6B7280] text-base leading-snug py-2 px-3 rounded hover:text-[#111111] hover:bg-[#F9FAFB] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl mx-auto px-6 lg:px-12 pb-32">
          {/* Hero */}
          <div className="pt-16 pb-12 border-b border-[#E5E7EB] mb-4">
            <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5 rounded mb-6">
              Platanus Cavendish
            </span>
            <h1 className="font-sans font-medium text-[#111111]" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.1 }}>
              Down the Rabbit Hole
            </h1>
            <p className="font-sans font-medium text-[#111111] text-base leading-relaxed mt-4 max-w-xl">
              Todo lo que necesitas saber sobre el fondo: nuestra tesis, estrategia, comunidad, estructura legal y términos.
            </p>
          </div>

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
