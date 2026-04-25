"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { f, P, useAnim } from "./utils";

const DILUTION_FACTOR = 0.52;
const EXIT_VALUATIONS = [250, 300, 350, 400, 450, 500];

const ENTRIES = [
  { valuation: 2_857_143, label: "$2,857,143", highlight: true },
  { valuation: 5_000_000, label: "$5,000,000", highlight: false },
  { valuation: 10_000_000, label: "$10,000,000", highlight: false },
  { valuation: 15_000_000, label: "$15,000,000", highlight: false },
  { valuation: 20_000_000, label: "$20,000,000", highlight: false },
  { valuation: 25_000_000, label: "$25,000,000", highlight: false },
  { valuation: 30_000_000, label: "$30,000,000", highlight: false },
];

function calcReturn(entryVal: number, exitM: number): number {
  return Math.round((DILUTION_FACTOR * exitM * 1_000_000) / entryVal);
}

const ALL_RETURNS = ENTRIES.flatMap((e) => EXIT_VALUATIONS.map((ex) => calcReturn(e.valuation, ex)));
const MAX_RETURN = Math.max(...ALL_RETURNS);
const MIN_RETURN = Math.min(...ALL_RETURNS);

function heatT(value: number): number {
  return (value - MIN_RETURN) / (MAX_RETURN - MIN_RETURN);
}

function heatColor(value: number): string {
  const t = heatT(value);
  if (t > 0.7) return "rgba(255, 236, 64, 0.7)";
  if (t > 0.45) return "rgba(255, 236, 64, 0.5)";
  if (t > 0.25) return "rgba(255, 236, 64, 0.25)";
  return "rgba(255, 255, 255, 0.15)";
}

function heatFontSize(value: number): string {
  const t = heatT(value);
  const minVw = 1;
  const maxVw = 2;
  const vw = minVw + t * (maxVw - minVw);
  const minPx = 12;
  const maxPx = 28;
  return `clamp(${Math.round(minPx + t * (maxPx - minPx))}px, ${vw.toFixed(1)}vw, ${maxPx}px)`;
}

export function SlideFundStrategy({ active }: P) {
  const on = useAnim(active);
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="flex items-start justify-between mb-1">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Fund{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Strategy</mark>
          </h2>
        </div>
      </div>

      <div className="mb-6" style={f(on, 80)}>
        <p className="font-sans font-medium text-white text-base">
          In top VC funds, ~10% of investments generate{" "}
          <span className="text-[#FFEC40]">60x cash on cash return.</span>
          {" "}With LatAm exit prices, our tickets can get us there.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: `minmax(100px, auto) repeat(${EXIT_VALUATIONS.length}, 1fr)`, gridTemplateRows: `auto repeat(${ENTRIES.length}, 1fr)` }}>
        <div className="relative overflow-hidden border-b border-white/10 min-h-[56px]" style={f(on, 120)}>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom left, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 50%)",
          }} />
          <span className="absolute bottom-2 left-2 font-mono font-medium text-white/40 text-[11px] uppercase leading-none">
            Entry Val.
          </span>
          <span className="absolute top-2 right-2 font-mono font-medium text-white/40 text-[11px] uppercase leading-none">
            Exit Price
          </span>
        </div>
        {EXIT_VALUATIONS.map((v, ci) => (
          <div
            key={v}
            className={cn(
              "flex items-center justify-center p-2 border-b border-white/10 transition-colors min-h-[56px]",
              hover?.col === ci && "bg-white/5",
            )}
            style={f(on, 150 + ci * 30)}
          >
            <span className="font-mono uppercase font-medium text-white text-base">${v}M</span>
          </div>
        ))}

        {ENTRIES.map((entry, ri) => (
          <div key={entry.valuation} style={{ display: "contents" }}>
            <div
              className={cn(
                "flex flex-col w-full h-full justify-center px-3 transition-colors",
                entry.highlight ? "bg-[#FFEC40]" : "",
                !entry.highlight && hover?.row === ri && "bg-white/5",
              )}
              style={f(on, 200 + ri * 40)}
            >
              <span className={cn("font-mono uppercase font-medium text-base whitespace-nowrap", entry.highlight ? "text-black" : "text-white/40")}>
                {entry.label}
              </span>
              {entry.highlight && (
                <span className="font-mono font-medium text-black/60 text-[10px] uppercase tracking-wider">Platanus ticket</span>
              )}
            </div>
            {EXIT_VALUATIONS.map((exitM, ci) => {
              const ret = calcReturn(entry.valuation, exitM);
              const isAbove60 = ret >= 60;
              const isCrosshair = hover !== null && (hover.row === ri || hover.col === ci);
              const isExact = hover?.row === ri && hover?.col === ci;

              return (
                <div
                  key={`${entry.valuation}-${exitM}`}
                  className={cn(
                    "flex items-center justify-center relative cursor-crosshair transition-all",
                    entry.highlight ? "bg-[#FFEC40]" : "",
                  )}
                  style={{
                    ...f(on, 220 + ri * 40 + ci * 20),
                    backgroundColor: entry.highlight ? undefined : heatColor(ret),
                    outline: isExact ? "1px solid rgba(255,236,64,0.6)" : "none",
                    outlineOffset: "-1px",
                  }}
                  onMouseEnter={() => setHover({ row: ri, col: ci })}
                  onMouseLeave={() => setHover(null)}
                >
                  <span
                    className={cn(
                      "font-mono uppercase font-medium relative z-10 transition-transform",
                      entry.highlight ? "text-black" : isAbove60 ? "text-[#FFEC40]" : "text-white",
                      isExact && !entry.highlight && "scale-125",
                    )}
                    style={{ fontSize: entry.highlight ? "clamp(18px, 2vw, 28px)" : heatFontSize(ret) }}
                  >
                    {ret}x
                  </span>
                  {!entry.highlight && isCrosshair && !isExact && (
                    <div className="absolute inset-0 bg-white/5" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between" style={f(on, 500)}>
        <p className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
          Post-dilution return multiples
        </p>
        <p className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider">
          At $200K for 7%, only Platanus reach +60X returns.
        </p>
      </div>
    </div>
  );
}
