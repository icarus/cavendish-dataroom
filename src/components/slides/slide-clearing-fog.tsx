"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { MENTORS } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { f, P, useAnim, WordReveal } from "./utils";

const FEATURED = MENTORS.slice(0, 8);

function MentorOverlay({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const mentor = MENTORS[index];

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + MENTORS.length) % MENTORS.length);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-stretch cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div className="relative z-10 flex w-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-1/2 relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mentor.name}
              className="absolute inset-0"
              initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-1/2 flex flex-col justify-center px-[5%] relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mentor.name}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(24px, 3vw, 48px)" }}>
                {mentor.name}
              </h3>
              <p className="font-sans font-medium text-[#FFEC40] text-xl">{mentor.company}</p>
              {mentor.tagline && (
                <p className="font-sans font-medium text-white/60 text-base leading-relaxed max-w-md">
                  {mentor.tagline}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 right-8 flex gap-3">
            <button
              onClick={() => go(-1)}
              className="size-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="size-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-8 left-[5%] font-mono text-white/30 text-base tabular-nums">
            {index + 1} / {MENTORS.length}
          </div>
        </div>
      </div>

      <button
        className="absolute top-6 right-6 z-20 font-mono text-white/40 hover:text-white text-xl cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  );
}

export function SlideClearingFog({ active }: P) {
  const on = useAnim(active);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-3" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Clearing{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">the fog</mark>
        </h2>
      </div>

      <div className="mb-4" style={f(on, 100)}>
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
            className="relative cursor-pointer overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
            style={f(on, 400 + i * 80)}
            onClick={() => setSelectedIndex(i)}
          >
            <div className="absolute inset-0">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <p className="font-sans font-medium text-white text-base truncate">{mentor.name}</p>
              <p className="font-sans font-medium text-[#FFEC40] text-base truncate">{mentor.company}</p>
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
