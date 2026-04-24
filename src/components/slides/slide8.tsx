"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { P, useAnim } from "./utils";

const HACK_IMAGES = Array.from({ length: 31 }, (_, i) => `/events/platanus-hack/platanus-hack-${i + 1}.jpeg`);

const EVENTS = [
  { title: "Platanus Hack", desc: "36-hour hackathon, 120 engineers. First of its kind in LatAm.", images: HACK_IMAGES },
  { title: "Platanus Forum", desc: "Annual gathering to discuss tech and strengthen connections.", images: HACK_IMAGES },
  { title: "Breakfasts, Lunches & Dinners", desc: "Weekly founder gatherings sharing unfiltered experiences.", images: HACK_IMAGES },
  { title: "Demo Dev", desc: "10 CTOs showcase code-built businesses. 600+ developers attend.", images: HACK_IMAGES },
  { title: "In-Person Fundraising", desc: "Bi-annual CDMX event with Monashees, Kaszek & Softbank.", images: HACK_IMAGES },
  { title: "AI Summit with OpenAI", desc: "Co-organized the first OpenAI Summit in Mexico City.", images: HACK_IMAGES },
];

const SPRING = { type: "spring" as const, stiffness: 400, damping: 35 };

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
  const [prevIndex, setPrevIndex] = useState(startOffset % images.length);

  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % images.length;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [hovered, images.length]);

  const delay = 100 + index * 80;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer",
        hovered ? "z-10 shadow-2xl shadow-black/50" : "grayscale",
      )}
      style={{
        opacity: on ? (dimmed ? 0.65 : 1) : 0,
        transform: on ? "translateY(0)" : "translateY(0px)",
        filter: hovered ? "grayscale(0) blur(0px)" : dimmed ? "grayscale(1) blur(0px)" : "grayscale(1) blur(0px)",
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
        hovered ? "bg-black/40" : "bg-black/70",
      )} />
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="flex flex-col items-center">
          <motion.h3
            className="text-balance font-mono font-medium text-white text-center leading-tight uppercase tracking-wider drop-shadow-lg"
            style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
            animate={{ y: hovered ? 0 : 24 }}
            transition={SPRING}
          >
            {title}
          </motion.h3>
          <motion.p
            className="font-sans font-normal text-white/80 text-lg text-center text-balance leading-snug drop-shadow-lg"
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 8,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export function Slide8({ active }: P) {
  const on = useAnim(active);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((i: number) => {
    setHoveredIndex(i);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);
  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%] overflow-hidden">
      <div className="mb-8 text-center" style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Building the{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">tech scene</mark>
          {" "}of LatAm
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
