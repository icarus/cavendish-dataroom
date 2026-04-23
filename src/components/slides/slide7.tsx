"use client";

import Image from "next/image";
import { f, P, useAnim } from "./utils";

function PulsingDot({ color = "white", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0">
      <circle cx="14" cy="14" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="6;14" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="14" cy="14" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="6;14" dur="2s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="14" cy="14" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

export function Slide7({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex flex-col">
      <div className="flex flex-1 min-h-0">
        <div className="w-[46%] flex flex-col justify-center p-[5%_4%_5%_6%]">
          <h2 className="font-sans font-medium text-white mb-4" style={{ fontSize: "clamp(22px, 3vw, 44px)", ...f(on, 0) }}>
            The <mark className="bg-[#FFEC40] text-black px-2 not-italic">Banana</mark> House
          </h2>
          <p className="font-sans font-medium text-white text-base leading-relaxed mb-3" style={f(on, 100)}>
            Banana Houses are both offices and residences, fostering real in-person connections beyond Slack. Founders gather here for hackathons, launches, fireside chats, and social events.
          </p>
          <p className="font-sans font-medium text-white text-base leading-relaxed" style={f(on, 180)}>
            Each house has beds, promoting early regional expansion, reducing travel costs, and enabling quick access to local networks.
          </p>
        </div>
        <div className="flex-1 relative" style={f(on, 100)}>
          <Image
            src="/latin-america.png"
            alt="Latin America map"
            width={1920}
            height={1080}
            className="scale-150 opacity-70 -mt-56 -ml-24 object-contain"
          />

          <div className="absolute flex items-center gap-2" style={{ top: "12%", left: "10%" }}>
            <PulsingDot color="white" delay={0} />
            <div className="flex flex-col gap-1">
              <div className="font-mono text-white text-base font-medium tracking-wider uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
                MEXICO CITY
              </div>
              <div className="font-mono text-[#FFEC40] text-base font-medium tracking-wider uppercase border border-[#FFEC40] px-2 py-0.5 w-fit">
                COMING SOON
              </div>
            </div>
          </div>

          <div className="absolute flex items-center gap-2" style={{ bottom: "30%", right: "10%" }}>
            <PulsingDot color="white" delay={0.4} />
            <div className="font-mono text-white text-base font-medium tracking-wider uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
              SANTIAGO
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[34%]" style={f(on, 280)}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 border-r border-white/5 last:border-r-0 bg-white/5 backdrop-blur-sm flex items-center justify-center">
            <span className="font-mono text-white/15 text-base tracking-wider uppercase">Photo {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
