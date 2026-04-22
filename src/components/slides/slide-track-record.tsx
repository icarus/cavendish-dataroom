"use client";

import { useState, useEffect } from "react";
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

const LEGEND = [
  { badge: "fund-returner", dot: "bg-[#FFEC40]" },
  { badge: "potential-fund-returner", dot: "border border-[#FFEC40] bg-transparent" },
  { badge: "rising-star", dot: "bg-[#FFEC40]/30" },
  { badge: "exited", dot: "bg-white/30" },
];

const ALL_COMPANIES = FUNDS.flatMap((fund) =>
  fund.companies.map((c) => ({ ...c, fundName: fund.name }))
).sort((a, b) => a.name.localeCompare(b.name));

function cardStyle(badge?: string) {
  if (!badge) return "bg-white/5 border-white/10";
  return BADGE_CARD_STYLES[badge] ?? "bg-white/5 border-white/10";
}

function detailBg(badge?: string) {
  if (badge === "fund-returner") return "bg-[#FFEC40] border-black/10";
  return "bg-[#111] border-white/10";
}

function detailText(badge?: string) {
  return badge === "fund-returner" ? "text-black" : "text-white";
}

function detailMuted(badge?: string) {
  return badge === "fund-returner" ? "text-black/40" : "text-white/40";
}

function detailBullet(badge?: string) {
  return badge === "fund-returner" ? "bg-black" : "bg-[#FFEC40]";
}

function primaryBadge(badge?: PortfolioCompany["badge"]): string | undefined {
  if (!badge) return undefined;
  if (Array.isArray(badge)) return badge.includes("fund-returner") ? "fund-returner" : badge[0];
  return badge;
}

function allBadges(badge?: PortfolioCompany["badge"]): string[] {
  if (!badge) return [];
  return Array.isArray(badge) ? badge : [badge];
}

function CompanyDetail({ company, onClose }: { company: PortfolioCompany & { fundName: string }; onClose: () => void }) {
  const primary = primaryBadge(company.badge);
  const badges = allBadges(company.badge);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
    };
    document.addEventListener("keydown", handler, { capture: true });
    return () => document.removeEventListener("keydown", handler, { capture: true });
  }, [onClose]);

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
        className={cn("relative z-10 flex gap-8 max-w-3xl w-full p-8 border", detailBg(primary))}
        layoutId={`company-${company.name}`}
        transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative size-24 overflow-hidden">
            <Image src={company.image} alt={company.name} fill className="object-contain" />
          </div>
          <div className={cn("font-mono font-medium", primary === "fund-returner" ? "text-black" : "text-[#FFEC40]")} style={{ fontSize: "clamp(22px, 2.5vw, 36px)" }}>
            {company.moic}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h3 className={cn("font-sans font-medium", detailText(primary))} style={{ fontSize: "clamp(20px, 2vw, 32px)" }}>
              {company.name}
            </h3>
            {badges.length > 0 && badges.map((b) => (
              <span key={b} className={cn("font-mono font-medium text-base uppercase tracking-wider", detailMuted(primary))}>
                {BADGE_LABELS[b]}
              </span>
            ))}
          </div>
          <span className={cn("font-mono font-medium text-base uppercase tracking-wider", detailMuted(primary))}>{company.fundName}</span>
          {company.tagline && (
            <p className={cn("font-sans font-medium text-base leading-relaxed", detailText(primary))}>
              {company.tagline}
            </p>
          )}
          {company.bullets && company.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {company.bullets.map((b, i) => (
                <li key={i} className={cn("font-sans font-medium text-base leading-relaxed flex items-start gap-2", detailText(primary))}>
                  <span className={cn("mt-2 size-1.5 shrink-0", detailBullet(primary))} />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {company.investorsAfter && company.investorsAfter.length > 0 && (
            <div className="mt-auto pt-2">
              <span className={cn("font-mono font-medium text-base uppercase tracking-wider", detailMuted(primary))}>
                Investors after Platanus:
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {company.investorsAfter.map((inv) => (
                  <span key={inv} className={cn("font-sans font-medium text-base", detailText(primary))}>
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
      <div className="flex items-center justify-between mb-4">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Track{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
          </h2>
        </div>
        <div className="flex gap-2" style={f(on, 100)}>
          {[
            { key: "all", label: "All", year: "", moic: "" },
            ...FUNDS.map((fund) => ({ key: fund.name, label: fund.name, year: fund.year, moic: fund.moicMultiple })),
          ].map(({ key, label, year, moic }) => (
            <button
              key={key}
              onClick={() => setActiveFund(key)}
              className={cn(
                "font-mono font-medium text-base uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer backdrop-blur-sm whitespace-nowrap",
                activeFund === key
                  ? "bg-[#FFEC40] text-black border-[#FFEC40]"
                  : "bg-transparent text-white/40 border-white/20 hover:border-white/40 hover:bg-white/10",
              )}
            >
              {label}
              {year && (
                <span className={cn("font-mono font-medium ml-1", activeFund === key ? "text-black/40" : "text-white/40")}>
                  {year} {moic}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid gap-2 content-start overflow-hidden" style={{ gridTemplateColumns: `repeat(${Math.min(Math.ceil(filtered.length / 3), 7)}, 1fr)`, gridTemplateRows: "repeat(3, 1fr)" }}>
        {filtered.map((company, i) => (
          <motion.div
            key={company.name}
            layoutId={`company-${company.name}`}
            transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
            className={cn(
              "relative cursor-pointer overflow-hidden border flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-sm",
              cardStyle(primaryBadge(company.badge)),
              "hover:bg-white/15 transition-all",
            )}
            style={f(on, 150 + i * 40)}
            onClick={() => setSelected(company)}
          >
            <div className="relative size-8 overflow-hidden shrink-0">
              <Image src={company.image} alt={company.name} fill className="object-cover" />
            </div>
            <span className="font-sans font-medium text-white text-base text-center leading-none truncate w-full">
              {company.name}
            </span>
            <span
              className="absolute top-1 right-1.5 font-mono font-medium text-[#FFEC40] leading-none"
              style={{ fontSize: "clamp(10px, 1vw, 14px)" }}
            >
              {company.moic}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-6 mt-6" style={f(on, 200)}>
        {LEGEND.map(({ badge, dot }) => (
          <div key={badge} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 shrink-0", dot)} />
            <span className="font-mono font-medium text-white text-base uppercase tracking-wider">
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
