"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { f, P, useAnim } from "./utils";

const PHOTOS = [
  { src: "/banana-house/image.jpg", label: "WORKSPACE" },
  { src: "/banana-house/image-1.jpg", label: "COMMUNITY" },
  { src: "/banana-house/image 17.jpg", label: "EVENTS" },
  { src: "/banana-house/image 18.jpg", label: "LIVING" },
];

const LOCATIONS = [
  { city: "SANTIAGO", status: "active" as const },
  { city: "MEXICO CITY", status: "soon" as const },
];

const SPRING = { type: "spring" as const, stiffness: 400, damping: 35 };

function PulsingDot({ color = "white", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
      <circle cx="16" cy="16" r="14" fill="none" stroke={color} strokeWidth="1">
        <animate attributeName="r" values="6;16" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="16" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

export function Slide7({ active }: P) {
  const on = useAnim(active);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex overflow-hidden">
      {PHOTOS.map((photo, i) => {
        const isHovered = hovered === i;
        const isDimmed = hovered !== null && hovered !== i;

        return (
          <motion.div
            key={photo.src}
            className="relative overflow-hidden cursor-pointer"
            animate={{
              flex: isHovered ? 2.5 : 1,
              opacity: on ? (isDimmed ? 0.4 : 1) : 0,
              y: on ? 0 : 14,
            }}
            transition={{
              flex: SPRING,
              opacity: { duration: 0.2 },
              y: { duration: 0.3, delay: on ? 0.08 + i * 0.06 : 0 },
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.label}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-300",
                isHovered ? "scale-105 grayscale-0" : "grayscale",
                isDimmed && "blur-[2px]",
              )}
            />
            <div className={cn(
              "absolute inset-0 transition-colors duration-200",
              isHovered ? "bg-black/30" : "bg-black/60",
            )} />

            <motion.div
              className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-10"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={SPRING}
            >
              <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
                {photo.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      <div
        className="absolute top-0 left-0 right-0 p-[5%_6%] z-20 pointer-events-none"
        style={f(on, 0)}
      >
        <h2 className="font-sans font-medium text-white mb-3" style={{ fontSize: "clamp(22px, 3vw, 44px)" }}>
          The <mark className="bg-[#FFEC40] text-black px-2 not-italic">Banana</mark> House
        </h2>
        <p className="font-sans font-normal text-white/40 text-base leading-relaxed max-w-lg" style={f(on, 100)}>
          Offices and residences where founders build together. Hackathons, launches, fireside chats, and social events under one roof.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20 pointer-events-none" style={f(on, 200)}>
        {LOCATIONS.map((loc, i) => (
          <div key={loc.city} className="flex items-center gap-2" style={f(on, 250 + i * 80)}>
            <PulsingDot color={loc.status === "active" ? "#FFEC40" : "white"} delay={i * 0.5} />
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium text-white text-base uppercase tracking-wider backdrop-blur-sm bg-black/40 px-2 py-0.5">
                {loc.city}
              </span>
              {loc.status === "soon" && (
                <span className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider backdrop-blur-sm bg-[#FFEC40]/10 border border-[#FFEC40]/40 px-2 py-0.5">
                  SOON
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
