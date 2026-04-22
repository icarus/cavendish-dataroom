"use client";

import Image from "next/image";
import { f, P, useAnim } from "./utils";

function Card({ name, tagline, bullets, moic, delay, on, image }: { name: string; tagline: string; bullets: string[]; moic: string; delay: number; on: boolean; image: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-5 flex flex-col gap-6" style={f(on, delay)}>
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-white/10 overflow-hidden shrink-0 w-10 h-10">
          <Image src={image} alt={name} width={40} height={40} className="object-cover w-full h-full" />
        </div>
        <div>
          <div className="font-sans font-medium text-white text-base">{name}</div>
          <div className="font-sans text-white/40 -mt-0.5 text-base">{tagline}</div>
        </div>
      </div>
      <ul className="flex-1 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="font-sans text-white text-base leading-relaxed flex items-center gap-2">
            <div className="size-1 bg-[#FFEC40] shrink-0" />
            {b}
          </li>
        ))}
      </ul>
      <div className="inline-block bg-[#FFEC40] text-black font-mono text-base font-medium px-3 py-1 uppercase w-fit">
        MOIC {moic}
      </div>
    </div>
  );
}

export function Slide5({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="grid grid-cols-2 gap-12 slide aspect-video w-full relative p-[5%]">
      <div style={f(on, 0)}>
        <div className="font-sans font-medium text-white leading-relaxed" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>Early</div>
        <mark className="font-sans font-medium bg-[#FFEC40] text-black px-2 not-italic inline-block leading-none" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>
          Winners
        </mark>
      </div>
      <Card name="Fintoc" tagline="Direct, fast, and cost-effective transactions." bullets={["We were their first institutional ticket in 2021.","We introduced the founders.","Seed: $1M at 42M Led by monashees","Series A: $7M at 29M Led by monashees + Propel"]} moic="12.4x" delay={200} on={on} image="/fintoc.png" />
      <Card name="Toku" tagline="Payments for subscription companies in LatAm." bullets={["We were their first institutional ticket in 2021. (50k investment + 7%)","Seed: $7M at 42M Led by F-PRIME","Series A: $46M at 180M Led by OAK HC/FT + F-PRIME"]} moic="78.81x" delay={300} on={on} image="/toku.png" />
      <Card name="Shinkansen" tagline="Automates B2B transactions in real time." bullets={["Deal sourced through our network.","Oversold pre-seed. Oversold Seed Led by 10ventures","Average growth: 42% MoM"]} moic="8.14x" delay={400} on={on} image="/shinkansen.png" />
    </div>
  );
}
