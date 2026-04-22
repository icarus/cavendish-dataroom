"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FUNDS } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { f, P, useAnim } from "./utils";

const BADGE_LABELS: Record<string, string> = {
  "fund-returner": "Fund Returner",
  "potential-fund-returner": "Potential Fund Returner",
  "rising-star": "Rising Star",
  exited: "Exited",
};

const BADGE_DOT: Record<string, string> = {
  "fund-returner": "bg-[#FFEC40]",
  "potential-fund-returner": "border border-[#FFEC40] bg-transparent",
  "rising-star": "bg-[#FFEC40]/30",
  exited: "bg-white/30",
};

const ALL_COMPANIES = FUNDS.flatMap((fund) =>
  fund.companies.map((c) => ({ ...c, fundName: fund.name }))
).sort((a, b) => a.name.localeCompare(b.name));

export function SlideTrackRecord({ active }: P) {
  const on = useAnim(active);
  const [activeFund, setActiveFund] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const filtered = activeFund === "all"
    ? ALL_COMPANIES
    : ALL_COMPANIES.filter((c) => c.fundName === activeFund);

  const company = filtered[currentIndex % filtered.length];

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  const jumpTo = useCallback((i: number) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  }, [currentIndex]);

  const handleFundChange = useCallback((key: string) => {
    setActiveFund(key);
    setCurrentIndex(0);
    setDirection(0);
  }, []);

  const isFR = company?.badge === "fund-returner";

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
            { key: "all", label: "All", detail: "" },
            ...FUNDS.map((fund) => ({ key: fund.name, label: fund.name, detail: `${fund.year} · ${fund.moicMultiple} MOIC` })),
          ].map(({ key, label, detail }) => (
            <button
              key={key}
              onClick={() => handleFundChange(key)}
              className={cn(
                "font-mono font-medium text-base uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer flex items-center gap-2 backdrop-blur-sm",
                activeFund === key
                  ? "bg-[#FFEC40] text-black border-[#FFEC40]"
                  : "bg-transparent text-white/40 border-white/20 hover:border-white/40 hover:bg-white/10",
              )}
            >
              {label}
              {detail && (
                <span className={cn("font-mono font-medium", activeFund === key ? "text-black/40" : "text-white/40")}>
                  ({detail})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex items-center relative" style={f(on, 200)}>
        <button
          onClick={() => go(-1)}
          className="shrink-0 size-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm mr-6"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex-1 h-full relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {company && (
              <motion.div
                key={company.name}
                className={cn(
                  "absolute inset-0 flex gap-8 items-center p-8 border backdrop-blur-sm",
                  isFR ? "bg-[#FFEC40] border-[#FFEC40]" : "bg-white/5 border-white/10",
                )}
                initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="shrink-0 flex flex-col items-center gap-4 w-48">
                  <div className="relative size-32 overflow-hidden">
                    <Image src={company.image} alt={company.name} fill className="object-contain" />
                  </div>
                  <div className={cn(
                    "font-mono font-medium leading-none",
                    isFR ? "text-black" : "text-[#FFEC40]",
                  )} style={{ fontSize: "clamp(24px, 3vw, 48px)" }}>
                    {company.moic}
                  </div>
                  {company.badge && (
                    <div className="flex items-center gap-1.5">
                      <span className={cn("size-2", BADGE_DOT[company.badge] ?? "bg-white/30")} />
                      <span className={cn(
                        "font-mono font-medium text-base uppercase tracking-wider",
                        isFR ? "text-black/40" : "text-white/40",
                      )}>
                        {BADGE_LABELS[company.badge]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3 min-w-0">
                  <h3 className={cn("font-sans font-medium", isFR ? "text-black" : "text-white")} style={{ fontSize: "clamp(22px, 2.5vw, 38px)" }}>
                    {company.name}
                  </h3>
                  <span className={cn("font-mono font-medium text-base uppercase tracking-wider", isFR ? "text-black/40" : "text-white/40")}>
                    {company.fundName}
                  </span>
                  {company.tagline && (
                    <p className={cn("font-sans font-medium text-base leading-relaxed", isFR ? "text-black" : "text-white")}>
                      {company.tagline}
                    </p>
                  )}
                  {company.bullets && company.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {company.bullets.map((b, i) => (
                        <li key={i} className={cn("font-sans font-medium text-base leading-relaxed flex items-start gap-2", isFR ? "text-black" : "text-white")}>
                          <span className={cn("mt-2 size-1.5 shrink-0", isFR ? "bg-black" : "bg-[#FFEC40]")} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {company.investorsAfter && company.investorsAfter.length > 0 && (
                    <div className="mt-auto pt-2">
                      <span className={cn("font-mono font-medium text-base uppercase tracking-wider", isFR ? "text-black/40" : "text-white/40")}>
                        Investors after Platanus:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {company.investorsAfter.map((inv) => (
                          <span key={inv} className={cn("font-sans font-medium text-base", isFR ? "text-black" : "text-white")}>
                            {inv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          className="shrink-0 size-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm ml-6"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-4" style={f(on, 300)}>
        <div className="font-mono font-medium text-white/40 text-base tabular-nums">
          {(currentIndex % filtered.length) + 1} / {filtered.length}
        </div>

        <div className="flex gap-2 items-center">
          {filtered.map((c, i) => (
            <button
              key={c.name}
              onClick={() => jumpTo(i)}
              className={cn(
                "relative overflow-hidden border transition-all cursor-pointer backdrop-blur-sm",
                i === currentIndex % filtered.length
                  ? "size-10 border-[#FFEC40] bg-white/10"
                  : "size-8 border-white/10 bg-white/5 hover:bg-white/10 opacity-50 hover:opacity-100",
              )}
            >
              <Image src={c.image} alt={c.name} fill className="object-contain p-1" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {Object.entries(BADGE_LABELS).map(([badge, label]) => (
            <div key={badge} className="flex items-center gap-1.5">
              <span className={cn("size-2 shrink-0", BADGE_DOT[badge])} />
              <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
