"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { TEAM } from "@/lib/deck-data";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { f, P, useAnim } from "./utils";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 35 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 300, damping: 30 };

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
            <motion.div
              key={gp.name}
              className="relative overflow-hidden cursor-pointer backdrop-blur-sm"
              animate={{
                flex: isHovered ? 2 : 1,
                opacity: on ? (isDimmed ? 0.4 : 1) : 0,
                y: on ? 0 : 14,
              }}
              transition={{
                flex: SPRING,
                opacity: { duration: 0.2 },
                y: { duration: 0.4, delay: on ? 0.12 + i * 0.1 : 0 },
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={gp.image}
                alt={gp.name}
                fill
                className={cn(
                  "object-cover transition-all duration-200",
                  isHovered ? "scale-105 grayscale-0" : "grayscale",
                )}
              />
              <div className={cn(
                "absolute inset-0 transition-colors duration-200",
                isHovered ? "bg-black/30" : "bg-black/60",
              )} />

              <ProgressiveBlur position="bottom" height="50%" />

              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <motion.div
                  className="font-sans font-medium text-white text-base"
                  animate={{ x: isHovered ? 12 : 0 }}
                  transition={SPRING}
                >
                  {gp.name}
                </motion.div>
                <motion.div
                  className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider mt-1"
                  animate={{ x: isHovered ? 12 : 0 }}
                  transition={{ ...SPRING, delay: 0.02 }}
                >
                  {gp.role}
                </motion.div>

                <motion.ul
                  className="mt-3 space-y-1 overflow-hidden"
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ height: SPRING_SOFT, opacity: { duration: 0.15 } }}
                >
                  <AnimatePresence>
                    {isHovered && gp.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        className="font-sans font-medium text-white text-base leading-relaxed flex items-center gap-2"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 12 }}
                        exit={{ opacity: 0, x: 0 }}
                        transition={{ type: "tween", duration: 0.2, ease: "easeOut", delay: j * 0.03 }}
                      >
                        <span className="size-1 bg-[#FFEC40] shrink-0" />
                        {b}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
