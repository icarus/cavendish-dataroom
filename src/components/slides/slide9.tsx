"use client";

import { f, P, useAnim } from "./utils";

export function Slide9({ active }: P) {
  const on = useAnim(active);

  const mentors = [
    { name: "Juan Pablo Cuevas", company: "Cornershop", desc: "Built a unicorn that exited to Uber" },
    { name: "Helena Polyblank", company: "Mendel", desc: "Series B female led startup" },
    { name: "Rodolfo Dañino", company: "Crehana", desc: "Only ed-tech unicorn in LatAm" },
    { name: "Agustín Feuerhake", company: "Fintual", desc: "Sequoia backed LatAm Fintech" },
    { name: "Alejandro Matamala", company: "Runway", desc: "$3B Chilean unicorn" },
    { name: "Jaime Arrieta", company: "Buk", desc: "Fastest growing LatAm HR Series B" },
  ];

  const investors = ["Bessemer Venture Partners","monashees+","General Catalyst","Gradient","F/Prime","Propel","Wollef","hi ventures","Clocktower Technology Ventures","Y Combinator","Oak HC/FT"];

  return (
    <div className="slide aspect-video w-full relative p-[4%_6%]">
      <h2 className="font-sans font-medium text-white mb-5" style={{ fontSize: "36px", ...f(on, 0) }}>
        Who&apos;s in <mark className="bg-[#FFEC40] text-black px-2 not-italic">our orbit?</mark>
      </h2>
      <div className="flex gap-8 h-[calc(100%-4.5rem)]">
        <div className="w-[170px] shrink-0 flex flex-col gap-5" style={f(on, 80)}>
          <div>
            <p className="font-mono text-white text-base font-medium uppercase tracking-wider leading-relaxed mb-1.5">WE OFFER ADVICE FROM EXPERIENCED FOUNDERS.</p>
            <p className="font-sans text-white/40 text-base leading-relaxed">Our mentors are founders who invest 1+ hour biweekly in our portfolio.</p>
          </div>
          <div>
            <p className="font-mono text-white text-base font-medium uppercase tracking-wider leading-relaxed mb-1.5">WE ARE GREAT AT EARNING BUSY PEOPLE&apos;S TIME.</p>
            <p className="font-sans text-white/40 text-base leading-relaxed">Matt Mochary coaches legendary founders like Sam Altman and Brian Armstrong — we&apos;re the only LatAm VC to secure his team&apos;s time pro bono.</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 overflow-hidden">
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            {mentors.map((m, i) => (
              <div key={m.name} style={f(on, 150 + i * 50)}>
                <div className="font-sans text-white text-lg font-medium">{m.name}</div>
                <div className="font-sans font-medium text-[#FFEC40] text-base mt-0.5">{m.company}</div>
                <div className="font-sans font-medium text-white/40 text-base mt-0.5 leading-relaxed">{m.desc}</div>
              </div>
            ))}
            <div className="col-span-3 font-sans font-medium text-white/40 text-base" style={f(on, 460)}>+ 15 other experienced founders.</div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex gap-4 items-start" style={f(on, 380)}>
            <span className="shrink-0 font-mono text-white/40 text-base font-medium uppercase tracking-wider whitespace-nowrap leading-[1.8]">WE INVEST<br />WITH THE BEST</span>
            <div className="w-px self-stretch bg-white/5" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {investors.map((inv) => (
                <span key={inv} className="font-sans font-medium text-white/40 text-base whitespace-nowrap">{inv}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
