"use client";

import { cn } from "@/lib/utils";
import { f, grow, P, useAnim } from "./utils";

export function Slide3({ active }: P) {
  const on = useAnim(active);

  const funds = [
    {
      name: "SPV", year: "2020",
      rows: [["AMOUNT","USD $206K"],["INVESTMENTS","4 STARTUPS"],["TUPI","4.6X"],["MOIC","4.49X"],["DPI","0.02X"]],
    },
    {
      name: "Genesis Fund", year: "2021",
      rows: [["AMOUNT","USD $650K"],["INVESTMENTS","11 STARTUPS"],["TUPI","6.4X"],["MOIC","7.78X"],["DPI","1.75X"]],
    },
    {
      name: "Fund I", year: "2022",
      rows: [["AMOUNT","USD $15,285,013"],["INVESTMENTS","98 STARTUPS"],["TUPI","*1.18X"],["MOIC","*1.53X"],["DPI","0.06X"]],
    },
  ];

  const stats = [
    { value: "9.1K", label: "STARTUPS REVIEWED", yellow: false },
    { value: "1.234", label: "FIRST INTERVIEWS", yellow: false },
    { value: "400", label: "SECOND INTERVIEWS", yellow: false },
    { value: "116", label: "INVESTMENTS", yellow: true },
  ];

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%]">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-semibold text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Track <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
        </h2>
      </div>

      <div className="flex flex-1 min-h-0 border border-white/10">
        {funds.map((fund, fi) => (
          <div key={fund.name} className="flex-1 border-r border-white/10 last:border-r-0 flex flex-col">
            <div className="flex justify-between px-4 py-3 border-b border-white/10" style={f(on, 80 + fi * 30)}>
              <span className="font-mono text-white text-sm font-semibold tracking-widest uppercase">{fund.name}</span>
              <span className="font-mono text-white/40 text-sm">{fund.year}</span>
            </div>
            {fund.rows.map(([label, value], ri) => (
              <div key={label} className="flex justify-between items-center px-4 py-3 border-b border-white/5 last:border-b-0 flex-1" style={f(on, 160 + ri * 50 + fi * 20)}>
                <span className="font-mono text-white/40 text-sm tracking-widest uppercase">{label}</span>
                <span className="font-mono text-white text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-1">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn("flex-1 flex flex-col justify-center px-5 py-4", stat.yellow ? "bg-[#FFEC40]" : "bg-[#1a1a1a]")}
            style={grow(on, 300 + i * 70)}
          >
            <span className={cn("font-sans font-semibold leading-none", stat.yellow ? "text-black" : "text-white")} style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
              {stat.value}
            </span>
            <span className={cn("font-mono text-sm tracking-widest uppercase mt-1.5", stat.yellow ? "text-black/60" : "text-white/40")}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
