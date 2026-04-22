"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TEAM } from "@/lib/deck-data";
import { f, P, useAnim } from "./utils";

const GPS = [
  {
    ...TEAM[0],
    bullets: ["Founded her first company in 2014.", "Worked with over 500 companies through Start-Up Chile.", "Recognized as a top woman investor by LatCA for the last 3 years.", "Notable investments: Fintoc, Toku, and Shinkansen."],
  },
  {
    ...TEAM[1],
    bullets: ["Engineer from Universidad Catolica de Chile.", "Master's in Cryptography.", "Led a team of 25+ software engineers at Platanus' software factory."],
  },
  {
    ...TEAM[2],
    bullets: ["Unconventional lawyer from Universidad Catolica de Chile.", "Structured the VC arm for CHS Carey & Allende in Chile.", "He trail runs, his ATH is 110km.", "Notable investments: Toku, Examedi and Grupalia."],
  },
];

export function Slide10({ active }: P) {
  const on = useAnim(active);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%]">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          The{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">Team</mark>
        </h2>
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        {GPS.map((gp, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && hovered !== i;

          return (
            <div
              key={gp.name}
              className="relative overflow-hidden cursor-pointer group"
              style={{
                flex: isHovered ? 2 : 1,
                opacity: on ? (isDimmed ? 0.4 : 1) : 0,
                transform: on ? "translateY(0)" : "translateY(14px)",
                transition: "flex 0.3s ease, opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
                transitionDelay: on ? `${120 + i * 100}ms` : "0ms",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={gp.image}
                alt={gp.name}
                fill
                className={cn(
                  "object-cover transition-all duration-150",
                  isHovered ? "scale-105 grayscale-0" : "grayscale",
                )}
              />
              <div className={cn(
                "absolute inset-0 transition-colors duration-150",
                isHovered ? "bg-black/50" : "bg-black/70",
              )} />

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="font-sans font-medium text-white text-xl">{gp.name}</div>
                <div className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider mt-1">{gp.role}</div>

                <ul
                  className="mt-3 space-y-1.5 overflow-hidden"
                  style={{
                    maxHeight: isHovered ? "300px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  {gp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="font-sans font-medium text-white text-base leading-relaxed flex items-center gap-1"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 0.3s ease ${j * 60}ms, transform 0.3s ease ${j * 60}ms`,
                      }}
                    >
                      <span className="size-1 bg-[#FFEC40] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
