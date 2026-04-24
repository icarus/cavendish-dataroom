"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FUNDS } from "@/lib/deck-data";
import type { PortfolioCompany } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { f, P, useAnim } from "./utils";

function AnimatedValue({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const numMatch = value.match(/[\d,.]+/);
    const prevMatch = display.match(/[\d,.]+/);
    if (!numMatch) { setDisplay(value); return; }

    const target = parseFloat(numMatch[0].replace(/,/g, ""));
    const start = prevMatch ? parseFloat(prevMatch[0].replace(/,/g, "")) : 0;
    const prefix = value.slice(0, value.indexOf(numMatch[0]));
    const suffix = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);
    const hasCommas = numMatch[0].includes(",");
    const decimals = numMatch[0].includes(".") ? numMatch[0].split(".")[1].length : 0;

    const duration = 600;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      const withCommas = hasCommas ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : formatted;
      setDisplay(`${prefix}${withCommas}${suffix}`);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span className="font-mono font-medium text-white text-base">{display}</span>
  );
}

const BADGE_LABELS: Record<string, string> = {
  "fund-returner": "Fund Returner",
  "potential-fund-returner": "Pot. Fund Returner",
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
        className={cn("relative z-10 flex flex-col max-w-md w-full max-h-[80%] p-6 overflow-y-auto")}
        initial={{ opacity: 0, scale: 0.97, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative size-16 overflow-hidden shrink-0 aspect-square mb-5 rounded-md">
          <Image src={company.image} alt={company.name} fill className="object-cover" />
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className={cn("font-sans font-medium", detailText())} style={{ fontSize: "clamp(20px, 2vw, 28px)" }}>
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
          <p className={cn("font-sans font-normal text-base leading-relaxed mb-6", detailText())}>
            {company.tagline}
          </p>
        )}
        {company.bullets && company.bullets.length > 0 && (
          <ul className="space-y-1.5 mb-3">
            {company.bullets.map((b, i) => (
              <li key={i} className="font-sans font-normal text-base leading-relaxed flex items-start gap-2">
                <span className={cn("mt-2.5 size-1 shrink-0", detailBullet())} />
                <span className="text-white/70">{b}</span>
              </li>
            ))}
          </ul>
        )}
        {company.investorsAfter && company.investorsAfter.length > 0 && (
          <div className="mt-auto pt-4">
            <span className={cn("font-mono font-normal text-xs uppercase tracking-wider", detailMuted())}>
              Investors after Platanus:
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-3">
              {company.investorsAfter.map((inv) => {
                const investor = typeof inv === "string" ? { name: inv } : inv;
                const isSquareLogo = investor.logo?.includes("yc.png");
                const content = investor.logo ? (
                  <img
                    src={investor.logo}
                    alt={investor.name}
                    title={investor.name}
                    className={cn("shrink-0 object-contain opacity-100", isSquareLogo ? "h-8" : "h-4 max-w-[100px]")}
                  />
                ) : (
                  <span className="font-mono font-medium text-sm text-white/60 uppercase tracking-wider">
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

  const STARTUP_COUNTS: Record<string, string> = { all: "121", SPV: "4", "Genesis Fund": "11", "Fund I": "101" };

  const activeMetrics = activeFund === "all"
    ? { committedAmount: "$16,141,613", moicMultiple: "1.81x", dpiMultiple: "0.07x", tvpiMultiple: "1.4x" }
    : VISIBLE_FUNDS.find((f) => f.name === activeFund) ?? { committedAmount: "-", moicMultiple: "-", dpiMultiple: "-", tvpiMultiple: "-" };

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400% 0; }
          100% { background-position: 400% 0; }
        }
      `}</style>
      <div className="flex flex-col gap-8 justify-between mb-8">
        <div className="flex items-center gap-3" style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Track{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
          </h2>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            {[
              { key: "all", label: "All", year: "" },
              ...VISIBLE_FUNDS.map((fund) => ({ key: fund.name, label: fund.name, year: fund.year })),
            ].map(({ key, label, year }) => {
              const isGenesis = key === "Genesis Fund";
              return (
                <button
                  key={key}
                  onClick={() => setActiveFund(key)}
                  className={cn(
                    "flex items-center font-mono font-medium text-base uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer backdrop-blur-sm whitespace-nowrap relative overflow-hidden",
                    activeFund === key
                      ? "bg-[#FFEC40] text-black border-[#FFEC40]"
                      : isGenesis
                        ? "bg-transparent text-[#FFEC40] border-[#FFEC40]/60 hover:bg-[#FFEC40]/10"
                        : "bg-transparent text-white/40 border-white/20 hover:border-white/40 hover:bg-white/10",
                  )}
                  style={isGenesis && activeFund !== key ? {
                    backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,236,64,0.06) 30%, rgba(255,236,64,0.18) 50%, rgba(255,236,64,0.06) 70%, transparent 100%)",
                    backgroundSize: "400% 100%",
                    animation: "shimmer 12s ease-in-out infinite",
                  } : undefined}
                >
                  {label}
                  {year && (
                    <span className={cn("font-mono font-medium ml-1", activeFund === key ? "text-black/40" : isGenesis ? "text-[#FFEC40]/50" : "text-white/40")}>
                      {year}
                    </span>
                  )}
                  {isGenesis && (
                    <span className={cn(
                      "ml-2 text-xs px-1 py-0.5 font-mono font-medium uppercase tracking-wider",
                      activeFund !== key ? "bg-[#FFEC40] text-black " : "bg-white text-black"
                    )}>
                      100% Returned
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex gap-8" style={f(on, 60)}>
            {[
              { label: "Startups", value: STARTUP_COUNTS[activeFund] ?? "-" },
              { label: "Committed", value: activeMetrics.committedAmount },
              { label: "MOIC", value: activeMetrics.moicMultiple },
              { label: "DPI", value: activeMetrics.dpiMultiple },
              { label: "TVPI", value: activeMetrics.tvpiMultiple },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">{label}</span>
                <span className="font-mono font-medium text-white" style={{ fontSize: "clamp(16px, 1.5vw, 24px)" }}>
                  <AnimatedValue value={value} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-2" style={f(on, 100)}>
        <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">Selected portfolio</span>
      </div>

      <div className="flex-1 min-h-0 grid gap-2 content-start overflow-hidden" style={{ gridTemplateColumns: `repeat(${Math.min(Math.ceil(ALL_COMPANIES.length / 3), 7)}, 1fr)`, gridTemplateRows: "repeat(3, 1fr)" }}>
        {filtered.map((company, i) => (
          <motion.div
            key={company.name}
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
              className="absolute top-1.5 right-1.5 font-mono font-medium text-[#FFEC40] leading-none uppercase tracking-wider bg-[#FFEC40]/10 px-1.5 py-0.5"
              style={{ fontSize: "clamp(9px, 0.9vw, 12px)" }}
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
