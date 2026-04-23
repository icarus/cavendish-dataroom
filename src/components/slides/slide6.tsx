"use client";

import { Code2, Zap, Globe, RefreshCw, Lightbulb, TrendingUp } from "lucide-react";
import { f, P, useAnim } from "./utils";

export function Slide6({ active }: P) {
  const on = useAnim(active);

  const items = [
    { Icon: Code2, title: "TECHNICAL FOUNDER THESIS", desc: "A technical founder from day one means the company moves faster and avoids high expense." },
    { Icon: Zap, title: "ELITE DEVELOPER COMMUNITY", desc: "12 years building an elite developer community uniquely positions us to fund top tech startups." },
    { Icon: Globe, title: "COMMUNITY-DRIVEN MODEL", desc: "Founders meet & build at Banana Houses. Trust drives deal flow, community is our moat." },
    { Icon: RefreshCw, title: "CONSISTENT PRESENCE", desc: "Early capital keeps us top-of-mind. In 2022, we were LATAM's most active investor." },
    { Icon: Lightbulb, title: "EARLY, SMART INVESTING", desc: "Our value-add lets us invest at better terms than typical pre-seed funds." },
    { Icon: TrendingUp, title: "CLEAR EXIT PATH", desc: "Strong VC ecosystem up to Series B. We exit via secondaries and M&As." },
  ];

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="grid grid-cols-3 gap-px flex-1">
        {items.slice(0, 3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="justify-start items-center text-center p-6 pt-4 flex flex-col gap-2.5" style={f(on, 80 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-base font-medium uppercase">{title}</div>
            <p className="font-sans font-normal text-white/40 text-lg leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center py-5" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
          How <mark className="bg-[#FFEC40] text-black px-2 not-italic">we win</mark>
        </h2>
      </div>

      <div className="items-end grid grid-cols-3 gap-px flex-1">
        {items.slice(3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="justify-start items-center text-center p-6 pt-4 flex flex-col gap-2.5" style={f(on, 300 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-base font-medium uppercase">{title}</div>
            <p className="font-sans font-normal text-white/40 text-lg leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
