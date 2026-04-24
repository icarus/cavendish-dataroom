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
  "fund-returner": "bg-[#FFEC40]/10 border-[#FFEC40]",
  "potential-fund-returner": "bg-[#FFEC40]/10 border-[#FFEC40]",
  "rising-star": "bg-[#FFEC40]/5 border-[#FFEC40]/40",
  exited: "bg-white/10 border-white/30",
};

const LEGEND = [
  { badge: "fund-returner", dot: "bg-[#FFEC40]" },
  { badge: "potential-fund-returner", dot: "border bg-[#FFEC40]/30 border-[#FFEC40]" },
  { badge: "rising-star", dot: "bg-[#FFEC40]/30 border border-[#FFEC40]/50" },
];

function parseMoic(moic: string): number {
  const n = parseFloat(moic.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

const VISIBLE_FUNDS = FUNDS.filter((f) => f.name !== "Cavendish");

const ALL_COMPANIES = VISIBLE_FUNDS.flatMap((fund) =>
  fund.companies.map((c) => ({ ...c, fundName: fund.name }))
).sort((a, b) => parseMoic(b.moic) - parseMoic(a.moic));

function cardStyle(badge?: string) {
  if (!badge) return "bg-white/5 border-white/10";
  return BADGE_CARD_STYLES[badge] ?? "bg-white/5 border-white/10";
}

function detailBg() {
  return "bg-[#111] border-white/10";
}

function detailText() {
  return "text-white";
}

function detailMuted() {
  return "text-white/40";
}

function detailBullet() {
  return "bg-[#FFEC40]";
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

function CompanyDetail({ company, onClose, onPrev, onNext }: { company: PortfolioCompany & { fundName: string }; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const badges = allBadges(company.badge);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
      if (e.key === "ArrowLeft") { e.stopImmediatePropagation(); onPrev(); }
      if (e.key === "ArrowRight") { e.stopImmediatePropagation(); onNext(); }
    };
    document.addEventListener("keydown", handler, { capture: true });
    return () => document.removeEventListener("keydown", handler, { capture: true });
  }, [onClose, onPrev, onNext]);

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
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-[3%] top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center border border-white/20 bg-black/60 text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-[3%] top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center border border-white/20 bg-black/60 text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <motion.div
        className={cn("relative z-10 flex gap-8 max-w-3xl w-full h-[340px] p-8 border overflow-y-auto", detailBg())}
        layoutId={`company-${company.name}`}
        transition={{ layout: { duration: 0.12, ease: "easeOut" } }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative min-w-24 size-24 overflow-hidden shrink-0 aspect-square">
            <Image src={company.image} alt={company.name} fill className="object-contain" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn("font-sans font-medium", detailText())} style={{ fontSize: "clamp(20px, 2vw, 32px)" }}>
              {company.name}
            </h3>
            <span className="font-mono font-medium text-[#FFEC40] text-xs uppercase tracking-wider bg-[#FFEC40]/10 px-1.5 py-0.5">
              {company.moic}
            </span>
            <span className="font-mono font-medium text-white/60 text-xs uppercase tracking-wider bg-white/10 px-1.5 py-0.5">
              {company.fundName}
            </span>
            {badges.map((b) => (
              <span
                key={b}
                className={cn(
                  "font-mono font-medium text-xs uppercase tracking-wider px-1.5 py-0.5",
                  b === "exited" ? "bg-white text-black" : "bg-[#FFEC40]/20 text-[#FFEC40]",
                )}
              >
                {BADGE_LABELS[b]}
              </span>
            ))}
          </div>
          {company.tagline && (
            <p className={cn("font-sans font-normal text-base leading-relaxed", detailText())}>
              {company.tagline}
            </p>
          )}
          {company.bullets && company.bullets.length > 0 && (
            <ul className="space-y-1.5">
              {company.bullets.map((b, i) => (
                <li key={i} className={cn("font-sans font-normal text-base leading-relaxed flex items-center gap-2", detailText())}>
                  <span className={cn("size-1 shrink-0", detailBullet())} />
                  <span className="text-white/70">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {company.investorsAfter && company.investorsAfter.length > 0 && (
            <div className="mt-auto pt-2">
              <span className={cn("font-mono font-medium text-base uppercase tracking-wider", detailMuted())}>
                Investors after Platanus:
              </span>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {company.investorsAfter.map((inv) => {
                  const investor = typeof inv === "string" ? { name: inv } : inv;
                  const content = investor.logo ? (
                    <img
                      src={investor.logo}
                      alt={investor.name}
                      title={investor.name}
                      className="h-6 w-6 shrink-0 aspect-square object-contain bg-white rounded-sm"
                    />
                  ) : (
                    <span className={cn("font-sans font-medium text-base", detailText())}>
                      {investor.name}
                    </span>
                  );
                  return investor.url ? (
                    <a key={investor.name} href={investor.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <span key={investor.name}>{content}</span>
                  );
                })}
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
            ...VISIBLE_FUNDS.map((fund) => ({ key: fund.name, label: fund.name, year: fund.year, moic: fund.moicMultiple })),
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

      <div className="flex-1 min-h-0 grid gap-2 content-start overflow-hidden" style={{ gridTemplateColumns: `repeat(${Math.min(Math.ceil(ALL_COMPANIES.length / 3), 7)}, 1fr)`, gridTemplateRows: "repeat(3, 1fr)" }}>
        {filtered.map((company, i) => (
          <motion.div
            key={company.name}
            layoutId={`company-${company.name}`}
            transition={{ layout: { duration: 0.12, ease: "easeOut" } }}
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
            <span className="font-sans font-medium text-white text-lg text-center leading-none truncate w-full">
              {company.name}
            </span>
            <span
              className="absolute top-1.5 right-1.5 font-mono font-medium text-[#FFEC40] leading-none bg-[#FFEC40]/10 px-1.5 py-0.5"
              style={{ fontSize: "clamp(8px, 0.7vw, 11px)" }}
            >
              {company.moic}
            </span>
            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-wrap gap-1">
              <span
                style={{ fontSize: "clamp(8px, 0.7vw, 11px)" }}
                className="font-mono font-medium uppercase tracking-wider bg-white/10 text-white/60 px-1.5 py-0.5"
              >
                {company.fundName}
              </span>
              {allBadges(company.badge).map((b) => (
                <span
                  key={b}
                  style={{ fontSize: "clamp(8px, 0.7vw, 11px)" }}
                  className={cn(
                    "font-mono font-medium uppercase tracking-wider px-1.5 py-0.5",
                    b === "exited" ? "bg-white text-black" : "bg-[#FFEC40]/20 text-[#FFEC40]",
                  )}
                >
                  {BADGE_LABELS[b]}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <CompanyDetail
            company={selected}
            onClose={() => setSelected(null)}
            onPrev={() => {
              const idx = filtered.findIndex((c) => c.name === selected.name);
              setSelected(filtered[(idx - 1 + filtered.length) % filtered.length]);
            }}
            onNext={() => {
              const idx = filtered.findIndex((c) => c.name === selected.name);
              setSelected(filtered[(idx + 1) % filtered.length]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
