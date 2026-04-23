"use client";

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

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[3%_4%]">
      <div className="flex items-start justify-between mb-2">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Fund{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Strategy</mark>
          </h2>
        </div>
        <p className="font-sans font-medium text-white text-base max-w-md text-right leading-snug" style={f(on, 50)}>
          10% of a successful VC portfolio returns 25x cash on cash.
        </p>
      </div>

      <div className="mb-2" style={f(on, 80)}>
        <p className="font-sans font-medium text-white text-base">
          Only our standard valuation of <span className="text-[#FFEC40]">$200K for 7%</span> reaches a return multiple of 60x.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: `minmax(100px, auto) repeat(${EXIT_VALUATIONS.length}, 1fr)`, gridTemplateRows: `auto repeat(${ENTRIES.length}, 1fr)` }}>
        <div className="flex items-center justify-center border-b border-white/10" style={f(on, 120)}>
          <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
            Entry Val. / Exit Price
          </span>
        </div>
        {EXIT_VALUATIONS.map((v, i) => (
          <div key={v} className="flex items-center justify-center p-2 border-b border-white/10" style={f(on, 150 + i * 30)}>
            <span className="font-mono font-medium text-white text-base">${v}M</span>
          </div>
        ))}

        {ENTRIES.map((entry, ri) => (
          <div key={entry.valuation} style={{ display: "contents" }}>
            <div
              key={`label-${entry.valuation}`}
              className={cn(
                "flex w-full h-full items-center px-3",
                entry.highlight ? "bg-[#FFEC40]" : "",
              )}
              style={f(on, 200 + ri * 40)}
            >
              <span className={cn("font-mono font-medium text-base whitespace-nowrap", entry.highlight ? "text-black" : "text-white/40")}>
                {entry.label}
              </span>
            </div>
            {EXIT_VALUATIONS.map((exitM, ci) => {
              const ret = calcReturn(entry.valuation, exitM);
              const isAbove60 = ret >= 60;

              return (
                <div
                  key={`${entry.valuation}-${exitM}`}
                  className={cn(
                    "flex items-center justify-center relative",
                    entry.highlight ? "bg-[#FFEC40]" : "",
                  )}
                  style={{
                    ...f(on, 220 + ri * 40 + ci * 20),
                    backgroundColor: entry.highlight ? undefined : heatColor(ret),
                  }}
                >
                  <span
                    className={cn(
                      "font-mono font-medium relative z-10",
                      entry.highlight ? "text-black" : isAbove60 ? "text-[#FFEC40]" : "text-white",
                    )}
                    style={{ fontSize: entry.highlight ? "clamp(18px, 2vw, 28px)" : heatFontSize(ret) }}
                  >
                    {ret}x
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between" style={f(on, 500)}>
        <p className="font-sans font-normal text-white/40 text-sm">
          Return multiples depending on entry valuation and exit valuation, considering standard dilution rounds.
        </p>
        <p className="font-sans font-normal text-white/40 text-sm shrink-0 ml-4">
          A good VC strategy is investing as early as possible.
        </p>
      </div>
    </div>
  );
}
