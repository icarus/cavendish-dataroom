"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FUNDS } from "@/lib/deck-data";
import type { PortfolioCompany, Fund } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { f, P, useAnim } from "./utils";

const BADGE_LABELS: Record<string, string> = {
  "fund-returner": "Fund Returner",
  "potential-fund-returner": "Potential Fund Returner",
  "rising-star": "Rising Star",
  exited: "Exited",
};

const ALL_COMPANIES = FUNDS.flatMap((fund) =>
  fund.companies.map((c) => ({ ...c, fundName: fund.name }))
);

function CompanyDetail({ company, onClose }: { company: PortfolioCompany & { fundName: string }; onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-[5%] cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <motion.div
        className={cn(
          "relative z-10 flex gap-8 max-w-3xl w-full p-8 border",
          company.badge ? "bg-[#FFEC40] border-black/10" : "bg-[#111] border-white/10",
        )}
        layoutId={`company-${company.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative size-24 overflow-hidden border border-white/10">
            <Image src={company.image} alt={company.name} fill className="object-cover" />
          </div>
          <div className={cn("font-mono text-2xl font-medium", company.badge ? "text-black" : "text-[#FFEC40]")}>
            {company.moic}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h3 className={cn("font-sans font-medium text-2xl", company.badge ? "text-black" : "text-white")}>
              {company.name}
            </h3>
            {company.badge && (
              <span className={cn("font-mono text-base uppercase tracking-widest", company.badge ? "text-black/60" : "text-white/60")}>
                {BADGE_LABELS[company.badge]}
              </span>
            )}
          </div>
          <span className="font-mono text-base text-white/40 uppercase tracking-wider">{company.fundName}</span>
          {company.tagline && (
            <p className={cn("font-sans font-medium text-base leading-relaxed", company.badge ? "text-black" : "text-white")}>
              {company.tagline}
            </p>
          )}
          {company.bullets && company.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {company.bullets.map((b, i) => (
                <li key={i} className={cn("font-sans font-medium text-base leading-snug flex items-start gap-2", company.badge ? "text-black" : "text-white")}>
                  <span className={cn("mt-2 size-1.5 shrink-0", company.badge ? "bg-black" : "bg-[#FFEC40]")} />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {company.investorsAfter && company.investorsAfter.length > 0 && (
            <div className="mt-auto pt-2">
              <span className={cn("font-mono text-base uppercase tracking-wider", company.badge ? "text-black/50" : "text-white/40")}>
                Investors after Platanus:
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {company.investorsAfter.map((inv) => (
                  <span key={inv} className={cn("font-sans font-medium text-base", company.badge ? "text-black" : "text-white")}>
                    {inv}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SlideTrackRecord({ active }: P) {
  const on = useAnim(active);
  const [selected, setSelected] = useState<(PortfolioCompany & { fundName: string }) | null>(null);
  const [activeFund, setActiveFund] = useState<string>("all");

  const filtered = activeFund === "all" ? ALL_COMPANIES : ALL_COMPANIES.filter((c) => c.fundName === activeFund);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="flex items-end justify-between mb-4">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Track{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
          </h2>
        </div>
        <div className="flex gap-2" style={f(on, 100)}>
          {["all", ...FUNDS.map((f) => f.name)].map((name) => (
            <button
              key={name}
              onClick={() => setActiveFund(name)}
              className={cn(
                "font-mono text-base uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer",
                activeFund === name
                  ? "bg-[#FFEC40] text-black border-[#FFEC40]"
                  : "bg-transparent text-white/50 border-white/20 hover:border-white/40",
              )}
            >
              {name === "all" ? "All" : name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-6 gap-2 content-start auto-rows-min">
        {filtered.map((company, i) => (
          <motion.div
            key={company.name}
            layoutId={`company-${company.name}`}
            className={cn(
              "relative cursor-pointer overflow-hidden border flex flex-col items-center justify-center gap-1 p-3",
              company.badge ? "bg-[#FFEC40] border-black/10" : "bg-white/5 border-white/10",
              "hover:scale-105 transition-transform",
            )}
            style={f(on, 150 + i * 40)}
            onClick={() => setSelected(company)}
          >
            <div className="relative size-10 overflow-hidden shrink-0">
              <Image src={company.image} alt={company.name} fill className="object-cover" />
            </div>
            <span className={cn("font-sans font-medium text-base text-center leading-tight", company.badge ? "text-black" : "text-white")}>
              {company.name}
            </span>
            <span className={cn(
              "absolute top-1 right-1 font-mono text-base font-medium px-1.5",
              company.badge ? "text-black" : "text-[#FFEC40]",
            )}>
              {company.moic}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 mt-3" style={f(on, 200)}>
        {FUNDS.map((fund) => (
          <div key={fund.name} className="flex items-baseline gap-2">
            <span className="font-sans font-medium text-white text-base">{fund.name}</span>
            <span className="font-mono text-white/40 text-base">{fund.year}</span>
            <span className="font-mono text-white/40 text-base">MOIC {fund.moicMultiple}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <CompanyDetail company={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
