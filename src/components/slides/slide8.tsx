"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { f, P, useAnim } from "./utils";

const HACK_IMAGES = Array.from({ length: 31 }, (_, i) => `/events/platanus-hack/platanus-hack-${i + 1}.jpeg`);

const EVENTS = [
  { title: "Platanus Hack", images: HACK_IMAGES.slice(0, 6) },
  { title: "Platanus Forum", images: HACK_IMAGES.slice(6, 12) },
  { title: "Breakfasts, Lunches & Dinners", images: HACK_IMAGES.slice(12, 18) },
  { title: "Demo Dev", images: HACK_IMAGES.slice(18, 23) },
  { title: "In-Person Fundraising", images: HACK_IMAGES.slice(23, 27) },
  { title: "AI Summit with OpenAI", images: HACK_IMAGES.slice(27, 31) },
];

function EventCard({ title, images, index, on, hovered, onHover, onLeave }: {
  title: string;
  images: string[];
  index: number;
  on: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!hovered) { setImgIndex(0); return; }
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-500",
        hovered ? "scale-105 z-10 shadow-2xl shadow-black/50" : "grayscale",
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
        className="relative z-10 font-sans font-medium text-white text-center px-4 leading-tight"
        style={{ fontSize: "clamp(16px, 2vw, 28px)" }}
      >
        {title}
      </h3>
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
            images={event.images}
            index={i}
            on={on}
            hovered={hoveredIndex === i}
            onHover={() => handleHover(i)}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
}
