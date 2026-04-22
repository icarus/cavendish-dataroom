"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { f, P, useAnim } from "./utils";

const HACK_IMAGES = Array.from({ length: 31 }, (_, i) => `/events/platanus-hack/platanus-hack-${i + 1}.jpeg`);

const EVENTS = [
  { title: "Platanus Hack", desc: "A 36-hour hackathon where 120 software engineers participate, first in its kind in LatAm.", images: HACK_IMAGES },
  { title: "Platanus Forum", desc: "An annual community gathering to discuss new technologies and strengthen connections.", images: HACK_IMAGES },
  { title: "Breakfasts, Lunches & Dinners", desc: "Weekly founder gatherings with top founders sharing unfiltered, off-the-record experiences.", images: HACK_IMAGES },
  { title: "Demo Dev", desc: "10 CTOs showcase how they use code to build businesses. Attendance of over 600+ developers.", images: HACK_IMAGES },
  { title: "In-Person Fundraising", desc: "Bi-annual event in CDMX with top VC decision-makers, from firms like Monashees, Kaszek & Softbank.", images: HACK_IMAGES },
  { title: "AI Summit with OpenAI", desc: "Co-organizers of the first OpenAI Summit in Mexico City, promoting technology in the region.", images: HACK_IMAGES },
];

function EventCard({ title, desc, images, index, on, hovered, dimmed, onHover, onLeave }: {
  title: string;
  desc: string;
  images: string[];
  index: number;
  on: boolean;
  hovered: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const startOffset = index * 5;
  const [imgIndex, setImgIndex] = useState(startOffset % images.length);

  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-500",
        hovered ? "scale-105 z-10 shadow-2xl shadow-black/50" : "grayscale",
        dimmed && "opacity-40",
      )}
      style={f(on, 100 + index * 80)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={title}
          fill
          className={cn(
            "object-cover transition-opacity duration-700",
            i === imgIndex ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className={cn(
        "absolute inset-0 transition-colors duration-500",
        hovered ? "bg-black/40" : "bg-black/60",
      )} />
      <h3
        className="relative z-10 font-mono font-medium text-white text-center px-4 leading-tight uppercase tracking-wider"
        style={{ fontSize: "clamp(14px, 1.6vw, 24px)" }}
      >
        {title}
      </h3>
      <p className="relative z-10 font-sans font-medium text-white text-center text-xs leading-snug px-6 mt-2 max-w-[90%]">
        {desc}
      </p>
    </div>
  );
}

export function Slide8({ active }: P) {
  const on = useAnim(active);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = useCallback((i: number) => setHoveredIndex(i), []);
  const handleLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[3%]">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Our{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">events</mark>
        </h2>
      </div>
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-3 min-h-0">
        {EVENTS.map((event, i) => (
          <EventCard
            key={event.title}
            title={event.title}
            desc={event.desc}
            images={event.images}
            index={i}
            on={on}
            hovered={hoveredIndex === i}
            dimmed={hoveredIndex !== null && hoveredIndex !== i}
            onHover={() => handleHover(i)}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
}
