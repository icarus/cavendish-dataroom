"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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

function AnimatedCounter({ value, suffix = "", on, delay = 0 }: { value: number; suffix?: string; on: boolean; delay?: number }) {
  const [count, setCount] = useState(0);

  useState(() => {
    if (!on) { setCount(0); return; }
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(timeout);
  });

  return <span>{count}{suffix}</span>;
}

const STATS = [
  { value: 2, suffix: "", label: "Cities" },
  { value: 12, suffix: "", label: "Beds" },
  { value: 50, suffix: "+", label: "Events hosted" },
];

const PHOTOS = [
  { src: "/banana-house/image.jpg", label: "Workspace" },
  { src: "/banana-house/image-1.jpg", label: "Fireside chats" },
  { src: "/banana-house/image 17.jpg", label: "Community dinners" },
  { src: "/banana-house/image 18.jpg", label: "Stay & build" },
];

export function Slide7({ active }: P) {
  const on = useAnim(active);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="flex min-h-0 relative z-10" style={{ flex: "0 0 45%" }}>
        <div className="w-[46%] flex flex-col justify-center p-[5%_4%_5%_6%]">
          <h2 className="font-sans font-medium text-white mb-4" style={{ fontSize: "clamp(22px, 3vw, 44px)", ...f(on, 0) }}>
            The <mark className="bg-[#FFEC40] text-black px-2 not-italic">Banana</mark> House
          </h2>
          <p className="font-sans font-medium text-white/40 text-base leading-relaxed mb-3" style={f(on, 100)}>
            Banana Houses are both offices and residences, fostering real in-person connections beyond Slack. Founders gather here for hackathons, launches, fireside chats, and social events.
          </p>
          <p className="font-sans font-medium text-white/40 text-base leading-relaxed mb-6" style={f(on, 180)}>
            Each house has beds, promoting early regional expansion, reducing travel costs, and enabling quick access to local networks.
          </p>

          <div className="flex gap-6" style={f(on, 280)}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono font-medium text-[#FFEC40] tracking-wider" style={{ fontSize: "clamp(20px, 2.2vw, 34px)" }}>
                  {on ? <AnimatedCounter value={stat.value} suffix={stat.suffix} on={on} delay={400 + i * 150} /> : "0"}
                </span>
                <span className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 relative" style={f(on, 100)}>
          <Image
            src="/latin-america.png"
            alt="Latin America map"
            width={1920}
            height={1080}
            className="scale-150 opacity-70 -mt-72 -ml-24 object-contain"
          />

          <div className="absolute flex items-center" style={{ top: "0%", left: "9%" }}>
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

          <div className="absolute flex items-center" style={{ bottom: "10%", right: "8%" }}>
            <div className="font-mono text-white text-base font-medium tracking-wider uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
              SANTIAGO
            </div>
            <div className="w-24 -mr-6 h-px bg-white" />
            <PulsingDot color="white" delay={0.4} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 -mx-28 min-h-0 relative z-10" style={f(on, 100)}>
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 relative h-full w-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredPhoto(i)}
            onMouseLeave={() => setHoveredPhoto(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.label}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                hoveredPhoto === i ? "scale-105 grayscale-0" : "grayscale",
              )}
            />
            <div className={cn(
              "absolute inset-0 transition-colors duration-300",
              hoveredPhoto === i ? "bg-black/20" : hoveredPhoto !== null ? "bg-black/50" : "bg-transparent",
            )} />
            <div className={cn(
              "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
              hoveredPhoto === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}>
              <span className="font-mono font-medium text-white text-base uppercase tracking-wider drop-shadow-lg">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
