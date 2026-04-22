"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FUNDS } from "@/lib/deck-data";
import type { PortfolioCompany } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { f, P, useAnim } from "./utils";

const BADGE_LABELS: Record<string, string> = {
  "fund-returner": "Fund Returner",
  "potential-fund-returner": "Potential Fund Returner",
  "rising-star": "Rising Star",
  exited: "Exited",
};

const BADGE_CARD_STYLES: Record<string, string> = {
  "fund-returner": "bg-[#FFEC40] border-[#FFEC40]",
  "potential-fund-returner": "bg-[#FFEC40]/10 border-[#FFEC40]",
  "rising-star": "bg-[#FFEC40]/5 border-[#FFEC40]/40",
  exited: "bg-white/10 border-white/30",
};

const BADGE_TEXT_STYLES: Record<string, string> = {
  "fund-returner": "text-black",
  "potential-fund-returner": "text-[#FFEC40]",
  "rising-star": "text-[#FFEC40]/80",
  exited: "text-white/60",
};

const BADGE_MOIC_STYLES: Record<string, string> = {
  "fund-returner": "text-black",
  "potential-fund-returner": "text-[#FFEC40]",
  "rising-star": "text-[#FFEC40]/70",
  exited: "text-white/50",
};

const LEGEND = [
  { badge: "fund-returner", card: "bg-[#FFEC40]", dot: "bg-[#FFEC40]" },
  { badge: "potential-fund-returner", card: "bg-[#FFEC40]/10 border border-[#FFEC40]", dot: "border border-[#FFEC40] bg-transparent" },
  { badge: "rising-star", card: "bg-[#FFEC40]/5 border border-[#FFEC40]/40", dot: "bg-[#FFEC40]/30" },
  { badge: "exited", card: "bg-white/10 border border-white/30", dot: "bg-white/30" },
];

const ALL_COMPANIES = FUNDS.flatMap((fund) =>
  fund.companies.map((c) => ({ ...c, fundName: fund.name }))
).sort((a, b) => a.name.localeCompare(b.name));

function cardStyle(badge?: string) {
  if (!badge) return "bg-white/5 border-white/10";
  return BADGE_CARD_STYLES[badge] ?? "bg-white/5 border-white/10";
}

function textStyle(badge?: string) {
  if (!badge) return "text-white";
  return BADGE_TEXT_STYLES[badge] ?? "text-white";
}

function moicStyle(badge?: string) {
  if (!badge) return "text-[#FFEC40]";
  return BADGE_MOIC_STYLES[badge] ?? "text-[#FFEC40]";
}

function detailBg(badge?: string) {
  if (badge === "fund-returner") return "bg-[#FFEC40] border-black/10";
  return "bg-[#111] border-white/10";
}

function detailText(badge?: string) {
  return badge === "fund-returner" ? "text-black" : "text-white";
}

function detailMuted(badge?: string) {
  return badge === "fund-returner" ? "text-black/60" : "text-white/40";
}

function detailBullet(badge?: string) {
  return badge === "fund-returner" ? "bg-black" : "bg-[#FFEC40]";
}

function CompanyDetail({ company, onClose }: { company: PortfolioCompany & { fundName: string }; onClose: () => void }) {
  const isFR = company.badge === "fund-returner";

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-[5%] cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className={cn("relative z-10 flex gap-8 max-w-3xl w-full p-8 border", detailBg(company.badge))}
        layoutId={`company-${company.name}`}
        transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative size-24 overflow-hidden border border-white/10">
            <Image src={company.image} alt={company.name} fill className="object-cover" />
          </div>
          <div className={cn("font-mono text-2xl font-medium", isFR ? "text-black" : "text-[#FFEC40]")}>
            {company.moic}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h3 className={cn("font-sans font-medium text-2xl", detailText(company.badge))}>
              {company.name}
            </h3>
            {company.badge && (
              <span className={cn("font-mono text-base uppercase tracking-widest", detailMuted(company.badge))}>
                {BADGE_LABELS[company.badge]}
              </span>
            )}
          </div>
          <span className={cn("font-mono text-base uppercase tracking-wider", detailMuted(company.badge))}>{company.fundName}</span>
          {company.tagline && (
            <p className={cn("font-sans font-medium text-base leading-relaxed", detailText(company.badge))}>
              {company.tagline}
            </p>
          )}
          {company.bullets && company.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {company.bullets.map((b, i) => (
                <li key={i} className={cn("font-sans font-medium text-base leading-snug flex items-start gap-2", detailText(company.badge))}>
                  <span className={cn("mt-2 size-1.5 shrink-0", detailBullet(company.badge))} />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {company.investorsAfter && company.investorsAfter.length > 0 && (
            <div className="mt-auto pt-2">
              <span className={cn("font-mono text-base uppercase tracking-wider", detailMuted(company.badge))}>
                Investors after Platanus:
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {company.investorsAfter.map((inv) => (
                  <span key={inv} className={cn("font-sans font-medium text-base", detailText(company.badge))}>
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

  const filtered = activeFund === "all"
    ? ALL_COMPANIES
    : ALL_COMPANIES.filter((c) => c.fundName === activeFund);

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
          {[
            { key: "all", label: "All", detail: "" },
            ...FUNDS.map((fund) => ({ key: fund.name, label: fund.name, detail: `${fund.year} · ${fund.moicMultiple} MOIC` })),
          ].map(({ key, label, detail }) => (
            <button
              key={key}
              onClick={() => setActiveFund(key)}
              className={cn(
                "font-mono text-base uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer flex items-center gap-2",
                activeFund === key
                  ? "bg-[#FFEC40] text-black border-[#FFEC40]"
                  : "bg-transparent text-white/50 border-white/20 hover:border-white/40",
              )}
            >
              {label}
              {detail && (
                <span className={cn("font-mono", activeFund === key ? "text-black/50" : "text-white/30")}>
                  ({detail})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-6 gap-2 content-start auto-rows-min overflow-hidden">
        {filtered.map((company, i) => (
          <motion.div
            key={company.name}
            layoutId={`company-${company.name}`}
            transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
            className={cn(
              "relative aspect-square cursor-pointer overflow-hidden border flex flex-col items-center justify-center gap-1 p-2",
              cardStyle(company.badge),
              "hover:brightness-125 transition-all",
            )}
            style={f(on, 150 + i * 40)}
            onClick={() => setSelected(company)}
          >
            <div className="relative size-8 overflow-hidden shrink-0">
              <Image src={company.image} alt={company.name} fill className="object-cover" />
            </div>
            <span className={cn("font-sans font-medium text-base text-center leading-none truncate w-full", textStyle(company.badge))}>
              {company.name}
            </span>
            <span className={cn(
              "absolute top-0.5 right-1 font-mono font-medium leading-none",
              moicStyle(company.badge),
            )} style={{ fontSize: "clamp(10px, 1vw, 14px)" }}>
              {company.moic}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4 mt-2" style={f(on, 200)}>
        {LEGEND.map(({ badge, dot }) => (
          <div key={badge} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 shrink-0", dot)} />
            <span className="font-mono text-white/40 uppercase tracking-wider" style={{ fontSize: "clamp(9px, 0.8vw, 12px)" }}>
              {BADGE_LABELS[badge]}
            </span>
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
