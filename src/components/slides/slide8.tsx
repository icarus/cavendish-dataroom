"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { P, useAnim } from "./utils";

const HACK_IMAGES = Array.from({ length: 31 }, (_, i) => `/events/platanus-hack/platanus-hack-${i + 1}.jpeg`);

const EVENTS = [
  { title: "Platanus Hack", desc: "A 36-hour hackathon where 120 software engineers participate, first in its kind in LatAm.", images: HACK_IMAGES },
  { title: "Platanus Forum", desc: "An annual community gathering to discuss new technologies and strengthen connections.", images: HACK_IMAGES },
  { title: "Breakfasts, Lunches & Dinners", desc: "Weekly founder gatherings with top founders sharing unfiltered, off-the-record experiences.", images: HACK_IMAGES },
  { title: "Demo Dev", desc: "10 CTOs showcase how they use code to build businesses. Attendance of over 600+ developers.", images: HACK_IMAGES },
  { title: "In-Person Fundraising", desc: "Bi-annual event in CDMX with top VC decision-makers, from firms like Monashees, Kaszek & Softbank.", images: HACK_IMAGES },
  { title: "AI Summit with OpenAI", desc: "Co-organizers of the first OpenAI Summit in Mexico City, promoting technology in the region.", images: HACK_IMAGES },
];

function EventCard({ title, desc, images, index, on, activated, dimmed, onHover, onLeave }: {
  title: string;
  desc: string;
  images: string[];
  index: number;
  on: boolean;
  activated: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const startOffset = index * 5;
  const [imgIndex, setImgIndex] = useState(startOffset % images.length);
  const [prevIndex, setPrevIndex] = useState(startOffset % images.length);

  useEffect(() => {
    if (!activated) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % images.length;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [activated, images.length]);

  const delay = 100 + index * 80;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer",
        activated ? "z-10 shadow-2xl shadow-black/50" : "grayscale",
      )}
      style={{
        opacity: on ? (dimmed ? 0.5 : 1) : 0,
        transform: on ? "translateY(0)" : "translateY(14px)",
        filter: activated ? "grayscale(0)" : "grayscale(1)",
        transition: on
          ? `opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.2s ease-out`
          : `opacity 0.2s ease-out ${delay}ms, transform 0.2s ease-out ${delay}ms, filter 0.2s ease-out`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Image
        src={images[prevIndex]}
        alt=""
        fill
        className="object-cover"
      />
      <Image
        src={images[imgIndex]}
        alt={title}
        fill
        className="object-cover transition-opacity duration-200"
      />
      <div className={cn(
        "absolute inset-0 transition-colors duration-200",
        activated ? "bg-black/40" : "bg-black/70",
      )} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <h3
        className="relative z-10 font-mono font-medium text-white text-center px-4 leading-tight uppercase tracking-wider"
        style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
      >
        {title}
      </h3>
      <p className="relative z-10 font-sans font-medium text-white text-center text-base leading-snug px-6 mt-0.5 max-w-[90%]">
        {desc}
      </p>
    </div>
  );
}

export function Slide8({ active }: P) {
  const on = useAnim(active);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activatedIndex, setActivatedIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((i: number) => {
    setHoveredIndex(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActivatedIndex(i), 400);
  }, []);
  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    setActivatedIndex(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[3%]">
      <div className="mb-4" style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
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
            activated={activatedIndex === i}
            dimmed={activatedIndex !== null && activatedIndex !== i}
            onHover={() => handleHover(i)}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
}
