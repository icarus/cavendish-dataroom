"use client";

import { f, P, useAnim } from "./utils";

export function Slide10({ active }: P) {
  const on = useAnim(active);

  const gps = [
    {
      initials: "PE", name: "Paula Enei", role: "Co-Founder, Managing Partner",
      bullets: ["Founded her first company in 2014.","Worked with over 500 companies through Start-Up Chile.","Recognized as a top woman investor by LatCA for the last 3 years.","Notable investments: Fintoc, Toku, and Shinkansen."],
    },
    {
      initials: "RH", name: "Raimundo Herrera", role: "General Partner, CTO",
      bullets: ["Engineer from Universidad Católica de Chile.","Master's in Cryptography.","Led a team of 25+ software engineers at Platanus' software factory."],
    },
    {
      initials: "JS", name: "Joaquin Stephens", role: "Co-Founder, General Partner",
      bullets: ["Unconventional lawyer from Universidad Católica de Chile.","Structured the VC arm for CHS Carey & Allende in Chile.","He trail runs, his ATH is 110km.","Notable investments: Toku, Examedi and Grupalia."],
    },
  ];

  return (
    <div className="slide aspect-video w-full relative p-[5%_6%]">
      <h2 className="font-sans text-white mb-8 leading-snug" style={{ fontSize: "clamp(16px, 2vw, 30px)", ...f(on, 0) }}>
        GPs have all the necessary skills to attract and select the best startups:{" "}
        <mark className="bg-[#FFEC40] text-black px-1 not-italic font-semibold">founders, operators, software, and legal.</mark>
      </h2>
      <div className="flex gap-10">
        {gps.map((gp, i) => (
          <div key={gp.name} className="flex-1" style={f(on, 120 + i * 100)}>
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-mono text-white/50 text-sm font-semibold mb-3">
              {gp.initials}
            </div>
            <div className="font-sans font-semibold text-white text-sm mb-0.5">{gp.name}</div>
            <div className="font-mono text-white/40 text-[9px] tracking-widest uppercase mb-3">{gp.role}</div>
            <ul className="space-y-1.5">
              {gp.bullets.map((b, j) => (
                <li key={j} className="font-sans text-white/45 text-sm leading-relaxed">• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
