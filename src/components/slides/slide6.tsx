"use client";

import { Code2, Zap, Globe, RefreshCw, Lightbulb, TrendingUp } from "lucide-react";
import { f, P, useAnim } from "./utils";

export function Slide6({ active }: P) {
  const on = useAnim(active);

  const items = [
    { Icon: Code2, title: "TECHNICAL FOUNDER THESIS", desc: "Having a technical founder from day one derails the investment. The company goes faster and avoids high initial expense." },
    { Icon: Zap, title: "ELITE DEVELOPER COMMUNITY", desc: "Before investing, we were a software factory. For 12 years, we've built an elite developer community, uniquely positioning us to fund top tech startups." },
    { Icon: Globe, title: "IN PERSON COMMUNITY-DRIVEN MODEL", desc: "Our tight-knit community is our moat. Founders meet & build at Banana Houses, networking knowledge, capital, and resources. Founder trust drives deal flow." },
    { Icon: RefreshCw, title: "CONSISTENT PRESENCE", desc: "Great founders build when they want. To capture opportunities, you need early capital to stay top-of-mind for founders raising. In 2022, we were LATAM's most active investor." },
    { Icon: Lightbulb, title: "EARLY, SMART INVESTING", desc: "We found a sweetspot. Our value-add allows us to invest at better terms than typical pre-seed funds while attracting top LatAm startups." },
    { Icon: TrendingUp, title: "CLEAR EXIT PATH", desc: "LATAM has a strong VC ecosystem up to Series B. As the first institutional investor, Platanus has a clear exit path through secondary sales and M&As." },
  ];

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%]">
      <div className="grid grid-cols-3 gap-px flex-1">
        {items.slice(0, 3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="justify-center items-center text-center p-6 flex flex-col gap-2.5" style={f(on, 80 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-base font-medium uppercase">{title}</div>
            <p className="font-sans font-medium text-white text-base leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center py-5" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
          How <mark className="bg-[#FFEC40] text-black px-2 not-italic">we win</mark>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-px flex-1">
        {items.slice(3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="justify-center items-center text-center p-6 flex flex-col gap-2.5" style={f(on, 300 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-base font-medium uppercase">{title}</div>
            <p className="font-sans font-medium text-white text-base leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
