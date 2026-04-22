"use client";

import Image from "next/image";
import { MENTORS } from "@/lib/deck-data";
import { f, P, useAnim, WordReveal } from "./utils";

const FEATURED_MENTORS = MENTORS.slice(0, 8);

export function SlideClearingFog({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Clearing{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">the fog</mark>
        </h2>
      </div>

      <div className="mb-6" style={f(on, 100)}>
        <p className="font-sans font-medium text-white" style={{ fontSize: "clamp(12px, 1.4vw, 20px)" }}>
          The startup journey begins with a dense fog.
        </p>
        <p className="font-sans font-medium text-white" style={{ fontSize: "clamp(12px, 1.4vw, 20px)" }}>
          Where to start, what to build, how far you can go?
        </p>
      </div>

      <div className="mb-6" style={f(on, 200)}>
        <WordReveal
          text="WE HELP OUR STARTUPS WITH A 3 MONTH PROGRAM AIMED TO PUSH THEM INTO BUILDING THEIR PRODUCTS."
          on={on}
          baseDelay={300}
          interval={40}
          className="font-mono font-medium text-white uppercase tracking-wider"
        />
      </div>

      <div style={f(on, 500)}>
        <p className="font-mono font-medium text-white uppercase tracking-widest text-sm mb-4">
          Our mentors:
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 flex-1 min-h-0">
        {FEATURED_MENTORS.map((mentor, i) => (
          <div
            key={mentor.name}
            className="flex flex-col items-center text-center gap-2"
            style={f(on, 600 + i * 80)}
          >
            <div className="relative size-16 rounded-full overflow-hidden border border-white/10 shrink-0">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-sans font-medium text-white text-sm truncate">{mentor.name}</p>
              <p className="font-sans font-medium text-white text-xs truncate">{mentor.company}</p>
            </div>
            {mentor.tagline && (
              <p className="font-sans font-medium text-white text-xs leading-snug line-clamp-2">{mentor.tagline}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mt-4">
        {[
          "They have accountability from top tier founders.",
          "Aim higher by being around other ambitious founders in their same stage.",
          "The batch system form stronger bonds. Founders feel part of a community, not a bluerish portfolio.",
        ].map((text, i) => (
          <p
            key={i}
            className="font-sans font-medium text-white text-xs leading-relaxed"
            style={f(on, 1200 + i * 100)}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
