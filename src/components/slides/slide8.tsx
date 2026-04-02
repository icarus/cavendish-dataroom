"use client";

import { f, P, useAnim } from "./utils";

export function Slide8({ active }: P) {
  const on = useAnim(active);

  const events = [
    { title: "PLATANUS HACK", desc: "A 36-hour hackathon where 120 software engineers participate, first in its kind in LatAm." },
    { title: "PLATANUS FORUM", desc: "An annual community gathering to discuss new technologies and strengthen connections." },
    { title: "BREAKFASTS, LUNCHES & DINNERS", desc: "Weekly founder gatherings with top founders sharing unfiltered, off-the-record experiences." },
    { title: "DEMO DEV", desc: "10 CTOs showcase how they use code to build businesses. Attendance of over 600+ developers." },
    { title: "IN-PERSON FUNDRAISING", desc: "Bi-annual event in CDMX with top VC decision-makers, from firms like Monashees, Kaszek & Softbank." },
    { title: "AI SUMMIT WITH OPENAI", desc: "We are co-organizers of the first OpenAI Summit in Mexico City, aiming to promote technology in the region." },
  ];

  return (
    <div className="slide aspect-video w-full relative flex">
      <div className="flex items-center justify-center w-14 border-r border-white/10 shrink-0">
        <h2 className="font-sans font-semibold text-white rotate-[-90deg] whitespace-nowrap" style={{ fontSize: "clamp(16px, 2vw, 28px)", ...f(on, 0) }}>
          Our <mark className="bg-[#FFEC40] text-black px-1 not-italic">events</mark>
        </h2>
      </div>
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-px bg-white/5">
        {events.map(({ title, desc }, i) => (
          <div key={title} className="bg-[#0d0d0d] flex flex-col justify-end p-5 gap-1.5" style={f(on, 100 + i * 60)}>
            <div className="font-mono text-white text-[9px] font-semibold tracking-widest uppercase">{title}</div>
            <p className="font-sans text-white/40 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
