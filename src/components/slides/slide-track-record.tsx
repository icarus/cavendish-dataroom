"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FUNDS } from "@/lib/deck-data";
import type { PortfolioCompany } from "@/lib/deck-data";
import { f, P, useAnim } from "./utils";

const BADGE_LABELS: Record<string, string> = {
  "fund-returner": "Fund Returner",
  "potential-fund-returner": "Potential Fund Returner",
  "rising-star": "Rising Star",
  exited: "Exited",
};

function CompanyCard({ company, on, delay }: { company: PortfolioCompany; on: boolean; delay: number }) {
  return (
    <div
      className={cn(
        "shrink-0 w-56 border border-white/10 p-4 flex flex-col gap-3",
        company.badge ? "bg-[#FFEC40]" : "bg-white/5",
      )}
      style={f(on, delay)}
    >
      {company.badge && (
        <span className="font-mono text-black text-[10px] uppercase tracking-widest">
          {BADGE_LABELS[company.badge]}
        </span>
      )}
      <div className="flex items-center gap-2">
        <div className="relative size-8 overflow-hidden border border-white/10 shrink-0">
          <Image src={company.image} alt={company.name} fill className="object-cover" />
        </div>
        <span className={cn("font-sans font-medium text-sm", company.badge ? "text-black" : "text-white")}>
          {company.name}
        </span>
      </div>
      {company.tagline && (
        <p className={cn("font-sans text-xs leading-snug", company.badge ? "text-black" : "text-white")}>
          {company.tagline}
        </p>
      )}
      {company.bullets && company.bullets.length > 0 && (
        <ul className="space-y-0.5">
          {company.bullets.map((b, i) => (
            <li key={i} className={cn("font-sans text-[10px] leading-snug flex items-start gap-1", company.badge ? "text-black" : "text-white")}>
              <span className={cn("mt-1 size-1 shrink-0", company.badge ? "bg-black" : "bg-[#FFEC40]")} />
              {b}
            </li>
          ))}
        </ul>
      )}
      <div className={cn("font-mono text-xs font-medium uppercase mt-auto", company.badge ? "text-black" : "text-white")}>
        MOIC {company.moic}
      </div>
    </div>
  );
}

function FundRow({ fund, fundIndex, on }: { fund: typeof FUNDS[number]; fundIndex: number; on: boolean }) {
  const [scrollPos, setScrollPos] = useState(0);
  const baseDelay = 200 + fundIndex * 150;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-baseline gap-3 mb-2" style={f(on, baseDelay)}>
        <span className="font-sans font-medium text-white text-sm">{fund.name}</span>
        <span className="font-mono text-white text-xs">{fund.year}</span>
        <span className="font-mono text-white text-[10px] tracking-wider">{fund.amount}</span>
        <span className="font-mono text-white text-[10px]">MOIC {fund.moicMultiple}</span>
      </div>
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
        onScroll={(e) => setScrollPos((e.target as HTMLElement).scrollLeft)}
      >
        {fund.companies.map((company, ci) => (
          <CompanyCard key={company.name} company={company} on={on} delay={baseDelay + 50 + ci * 60} />
        ))}
      </div>
    </div>
  );
}

export function SlideTrackRecord({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-3" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Track{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
        </h2>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0">
        {FUNDS.map((fund, i) => (
          <FundRow key={fund.name} fund={fund} fundIndex={i} on={on} />
        ))}
      </div>
    </div>
  );
}
