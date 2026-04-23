"use client";

import Image from "next/image";
import { f, P, useAnim } from "./utils";

function PulsingDot({ color = "white", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
      <circle cx="28" cy="28" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="10;28" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="28" cy="28" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="10;28" dur="2s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="28" cy="28" r="8" fill={color} opacity="0.9" />
    </svg>
  );
}

export function Slide7({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex flex-col">
      <div className="flex min-h-0" style={{ flex: "0 0 45%" }}>
        <div className="w-[46%] flex flex-col justify-center p-[5%_4%_5%_6%]">
          <h2 className="font-sans font-medium text-white mb-4" style={{ fontSize: "clamp(22px, 3vw, 44px)", ...f(on, 0) }}>
            The <mark className="bg-[#FFEC40] text-black px-2 not-italic">Banana</mark> House
          </h2>
          <p className="font-sans font-normal text-white/40 text-base leading-relaxed mb-3" style={f(on, 100)}>
            Banana Houses are both offices and residences, fostering real in-person connections beyond Slack. Founders gather here for hackathons, launches, fireside chats, and social events.
          </p>
          <p className="font-sans font-normal text-white/40 text-base leading-relaxed" style={f(on, 180)}>
            Each house has beds, promoting early regional expansion, reducing travel costs, and enabling quick access to local networks.
          </p>
        </div>
        <div className="flex-1 relative" style={f(on, 100)}>
          <Image
            src="/latin-america.png"
            alt="Latin America map"
            width={1920}
            height={1080}
            className="scale-150 opacity-70 -mt-60 -ml-24 object-contain"
          />

          <div className="absolute flex items-center" style={{ top: "12%", left: "10%" }}>
            <div className="pt-8 flex flex-col justify-center items-center gap-1.5">
              <div className="font-mono text-white text-base font-medium tracking-wider uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
                MEXICO CITY
              </div>
              <div className="font-mono bg-[#FFEC40]/5 text-[#FFEC40] text-base font-medium tracking-wider uppercase border border-[#FFEC40] px-2 py-0.5 w-fit">
                COMING SOON
              </div>
            </div>
            <div className="w-24 -mr-6 h-px bg-white" />
            <PulsingDot color="white" delay={0} />
          </div>

          <div className="absolute flex items-center" style={{ bottom: "25%", right: "7%" }}>
            <div className="font-mono text-white text-base font-medium tracking-wider uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
              SANTIAGO
            </div>
            <div className="w-24 -mr-6 h-px bg-white" />
            <PulsingDot color="white" delay={0.4} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-4 -mx-28 min-h-0" style={f(on, 100)}>
        {["/banana-house/image.jpg", "/banana-house/image-1.jpg", "/banana-house/image 17.jpg", "/banana-house/image 18.jpg"].map((src, i) => (
          <div key={i} className="flex-1 min-w-0 relative h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Banana House" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
