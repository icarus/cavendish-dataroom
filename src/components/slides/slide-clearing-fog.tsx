"use client";

import { useState } from "react";
import Image from "next/image";
import { MENTORS } from "@/lib/deck-data";
import { f, P, useAnim, WordReveal } from "./utils";

const HALF = Math.ceil(MENTORS.length / 2);
const ROW1 = MENTORS.slice(0, HALF);
const ROW2 = MENTORS.slice(HALF);

function MentorCard({ mentor, index, on, hovered, dimmed, onEnter, onLeave }: {
  mentor: typeof MENTORS[0];
  index: number;
  on: boolean;
  hovered: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="mentor-card relative overflow-hidden backdrop-blur-xl shrink-0 h-full"
      style={{
        aspectRatio: "1/1",
        filter: hovered ? "grayscale(0) blur(0px) brightness(1.1)" : dimmed ? "grayscale(1) blur(4px)" : "grayscale(1) blur(3px)",
        opacity: hovered ? 1 : dimmed ? 0.15 : 0.55,
        transition: "filter 0.3s ease, opacity 0.3s ease",
        ...f(on, 300 + index * 20),
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0">
        <Image
          src={mentor.image}
          alt={mentor.name}
          fill
          className="object-cover transition-opacity"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
        <p className="font-sans font-medium text-white text-lg truncate">{mentor.name}</p>
        <p className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider truncate">{mentor.company}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ mentors, direction, on, hoveredId, onHover, onLeave }: {
  mentors: typeof MENTORS;
  direction: "left" | "right";
  on: boolean;
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const doubled = [...mentors, ...mentors];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="overflow-hidden flex-1 min-h-0">
      <div
        className="marquee-track flex gap-3 h-full"
        style={{
          animation: `${animName} ${mentors.length * 4}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((mentor, i) => (
          <MentorCard
            key={`${mentor.name}-${i}`}
            mentor={mentor}
            index={i % mentors.length}
            on={on}
            hovered={hoveredId === mentor.name}
            dimmed={hoveredId !== null && hoveredId !== mentor.name}
            onEnter={() => onHover(mentor.name)}
            onLeave={onLeave}
          />
        ))}
      </div>
    </div>
  );
}

export function SlideClearingFog({ active }: P) {
  const on = useAnim(active);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-2" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          The right{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">room</mark>
        </h2>
      </div>

      <div className="mb-1" style={f(on, 80)}>
        <WordReveal
          text="A 3 MONTH PROGRAM GIVES OUR STARTUPS AN INCREDIBLE EDGE."
          on={on}
          baseDelay={100}
          interval={30}
          className="font-mono font-medium text-white uppercase tracking-wider text-base"
        />
      </div>

      <div className="mb-8 max-w-3xl" style={f(on, 150)}>
        <p className="font-sans font-normal text-white/40 text-base leading-relaxed">
          Being around other ambitious founders raises their ambitions.
          The accountability & advice from this top-tier founders gives them speed, clarity and conviction.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-3" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
        <MarqueeRow mentors={ROW1} direction="left" on={on} hoveredId={hoveredId} onHover={setHoveredId} onLeave={() => setHoveredId(null)} />
        <MarqueeRow mentors={ROW2} direction="right" on={on} hoveredId={hoveredId} onHover={setHoveredId} onLeave={() => setHoveredId(null)} />
      </div>
    </div>
  );
}
