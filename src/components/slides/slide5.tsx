"use client";

import { f, P, useAnim } from "./utils";

function Card({ name, tagline, bullets, moic, delay, on }: { name: string; tagline: string; bullets: string[]; moic: string; delay: number; on: boolean }) {
  return (
    <div className="border border-white/10 p-5 flex flex-col gap-3" style={f(on, delay)}>
      <div>
        <div className="font-sans font-semibold text-white text-sm">{name}</div>
        <div className="font-sans text-white/40 text-sm mt-0.5">{tagline}</div>
      </div>
      <ul className="flex-1 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="font-sans text-white/50 text-sm leading-relaxed">• {b}</li>
        ))}
      </ul>
      <div className="inline-block bg-[#FFEC40] text-black font-mono text-sm font-semibold px-3 py-1 tracking-widest uppercase w-fit">
        MOIC {moic}
      </div>
    </div>
  );
}

export function Slide5({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative p-[5%]">
      <div className="flex h-full gap-5">
        <div className="flex flex-col gap-4 w-[38%]">
          <div style={f(on, 0)}>
            <div className="font-sans font-semibold text-white leading-none" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>Early</div>
            <mark className="font-sans font-semibold bg-[#FFEC40] text-black px-2 not-italic inline-block leading-none" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>
              Winners
            </mark>
          </div>
          <Card name="Fintoc" tagline="Direct, Fast, and cost-effective transactions." bullets={["We were their first institutional ticket in 2021.","We introduced the founders.","Seed: $1M at 42M Led by monashees","Series A: $7M at 29M Led by monashees + Propel"]} moic="12.4x" delay={200} on={on} />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <Card name="Toku" tagline="Payments for subscription companies in LatAm." bullets={["We were their first institutional ticket in 2021. (50k investment + 7%)","Seed: $7M at 42M Led by F-PRIME","Series A: $46M at 180M Led by OAK HC/FT + F-PRIME"]} moic="78.81x" delay={300} on={on} />
          <Card name="Shinkansen" tagline="Automates B2B transactions in real time." bullets={["Deal sourced through our network.","Oversold pre-seed. Oversold Seed Led by 10ventures","Average growth: 42% MoM"]} moic="8.14x" delay={400} on={on} />
        </div>
      </div>
    </div>
  );
}
