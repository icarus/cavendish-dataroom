"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MENTORS } from "@/lib/deck-data";
import { AnimatePresence, motion } from "motion/react";
import { f, P, useAnim, WordReveal } from "./utils";

const FEATURED = MENTORS.slice(0, 8);

function MentorDetail({ mentor, onClose }: { mentor: typeof MENTORS[number]; onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 flex gap-8 items-center"
        layoutId={`mentor-${mentor.name}`}
        transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative size-48 overflow-hidden border border-white/10 shrink-0">
          <Image src={mentor.image} alt={mentor.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-sans font-medium text-white text-3xl">{mentor.name}</h3>
          <p className="font-sans font-medium text-[#FFEC40] text-xl">{mentor.company}</p>
          {mentor.tagline && (
            <p className="font-sans font-medium text-white/70 text-base max-w-md leading-relaxed">{mentor.tagline}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SlideClearingFog({ active }: P) {
  const on = useAnim(active);
  const [selected, setSelected] = useState<typeof MENTORS[number] | null>(null);

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
          <motion.div
            key={mentor.name}
            layoutId={`mentor-${mentor.name}`}
            transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
            className="relative aspect-square cursor-pointer overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
            style={f(on, 400 + i * 80)}
            onClick={() => setSelected(mentor)}
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
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2" style={f(on, 1000)}>
        <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
          + {MENTORS.length - 8} other experienced founders in our network
        </span>
      </div>

      <AnimatePresence>
        {selected && (
          <MentorDetail mentor={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
