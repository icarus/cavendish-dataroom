"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { MENTORS } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { f, P, useAnim, WordReveal } from "./utils";
import { Button } from "../ui/button";

const FEATURED = MENTORS.slice(0, 8);

const QUEUE_POSITIONS = [
  { x: "0%", scale: 1, opacity: 1, zIndex: 30, blur: 0 },
  { x: "60%", scale: 0.75, opacity: 0.6, zIndex: 20, blur: 2 },
  { x: "82%", scale: 0.6, opacity: 0.3, zIndex: 10, blur: 4 },
];

function getMentor(idx: number) {
  return MENTORS[((idx % MENTORS.length) + MENTORS.length) % MENTORS.length];
}

function MentorOverlay({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const mentor = getMentor(index);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
    };
    document.addEventListener("keydown", handler, { capture: true });
    return () => document.removeEventListener("keydown", handler, { capture: true });
  }, [onClose]);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => ((prev + dir) % MENTORS.length + MENTORS.length) % MENTORS.length);
  }, []);

  const queueIndices = [index, index + 1, index + 2];

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-stretch cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <div className="relative z-10 flex w-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-[55%] relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {queueIndices.map((qi, pos) => {
              const m = getMentor(qi);
              const p = QUEUE_POSITIONS[pos];
              return (
                <motion.div
                  key={`${qi}-${pos}`}
                  className="absolute inset-0"
                  initial={{
                    x: direction > 0 ? "100%" : pos === 0 ? "-30%" : `${p.x}`,
                    scale: direction > 0 ? QUEUE_POSITIONS[Math.min(pos + 1, 2)]?.scale ?? 0.5 : p.scale,
                    opacity: 0,
                  }}
                  animate={{
                    x: p.x,
                    scale: p.scale,
                    opacity: p.opacity,
                    zIndex: p.zIndex,
                    filter: `blur(${p.blur}px)`,
                  }}
                  exit={{
                    x: direction > 0 ? "-30%" : "100%",
                    scale: direction > 0 ? 1.05 : 0.5,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ zIndex: p.zIndex, transformOrigin: "center center" }}
                >
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/70" />
                  {pos > 0 && <div className="absolute inset-0 bg-black/30" />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="w-[45%] flex flex-col justify-center px-[5%] relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mentor.name}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-mono font-medium text-[#FFEC40] uppercase tracking-wider" style={{ fontSize: "clamp(18px, 2vw, 28px)" }}>
                #{((index % MENTORS.length) + MENTORS.length) % MENTORS.length + 1}
              </span>
              <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(24px, 3vw, 48px)" }}>
                {mentor.name}
              </h3>
              <p className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider">{mentor.company}</p>
              {mentor.tagline && (
                <p className="font-sans font-medium text-white/40 text-base leading-relaxed max-w-md">
                  {mentor.tagline}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 right-8 flex gap-3">
            <button
              onClick={() => go(-1)}
              className="size-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="size-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-8 left-[5%] font-mono font-medium text-white/40 text-base tabular-nums">
            {((index % MENTORS.length) + MENTORS.length) % MENTORS.length + 1} of {MENTORS.length} mentors
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 size-9 [&_svg]:size-7 right-4 z-40"
        onClick={onClose}
      >
        <X />
      </Button>
    </motion.div>
  );
}

export function SlideClearingFog({ active }: P) {
  const on = useAnim(active);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-1" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Clearing{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">the fog</mark>
        </h2>
      </div>

      <div className="mb-6" style={f(on, 100)}>
        <WordReveal
          text="WE HELP OUR STARTUPS WITH A 3 MONTH PROGRAM AIMED TO PUSH THEM INTO BUILDING THEIR PRODUCTS."
          on={on}
          baseDelay={200}
          interval={30}
          className="font-mono font-medium text-white uppercase tracking-wider text-base"
        />
      </div>

      <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 min-h-0">
        {FEATURED.map((mentor, i) => (
          <div
            key={mentor.name}
            className="relative cursor-pointer overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group backdrop-blur-sm"
            style={f(on, 400 + i * 80)}
            onClick={() => setSelectedIndex(i)}
          >
            <div className="absolute inset-0">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="object-cover opacity-30 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <p className="font-sans font-medium text-white text-lg truncate">{mentor.name}</p>
              <p className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider truncate">{mentor.company}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2" style={f(on, 1000)}>
        <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
          + {MENTORS.length - 8} other experienced founders in our network
        </span>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <MentorOverlay startIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
