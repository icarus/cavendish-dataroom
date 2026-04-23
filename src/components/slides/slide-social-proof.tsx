"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/deck-data";
import { P, useAnim, WordReveal } from "./utils";

const ITEMS = TESTIMONIALS.filter((t) => t.text);

const ORBITS = ITEMS.map((t, i) => {
  const ring = i % 3;
  const ringIndex = Math.floor(i / 3);
  const ringCount = Math.ceil(ITEMS.length / 3);
  const baseAngle = (ringIndex / ringCount) * Math.PI * 2 + ring * 0.7;
  const radiusX = [36, 24, 13][ring];
  const radiusY = [30, 20, 10][ring];
  const speed = [0.15, 0.1, 0.07][ring];
  const tilt = 0.85;
  return { ...t, baseAngle, radiusX, radiusY, speed, tilt, ring, idx: i };
});

function QuoteDisplay({ item }: { item: typeof ORBITS[0] }) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReveal(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="text-center flex flex-col items-center gap-6 max-w-5xl px-8">
      <div className="leading-[1.4]" style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}>
        <WordReveal
          text={`\u201C${item.text}\u201D`}
          on={reveal}
          baseDelay={0}
          interval={60}
          className="font-sans font-medium text-white"
        />
      </div>
      <div
        className="flex items-center gap-2"
        style={{
          opacity: reveal ? 1 : 0,
          transform: reveal ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 100ms, transform 0.4s ease 100ms",
        }}
      >
        <span className="font-sans font-medium text-white text-base">{item.name}</span>
        {item.company && (
          <>
            <span className="size-1 bg-[#FFEC40] shrink-0" />
            <span className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider">
              {item.company}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function SlideSocialProof({ active }: P) {
  const on = useAnim(active);
  const [hovered, setHovered] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const lingerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setTime(0);
      startRef.current = 0;
      return;
    }
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTime((ts - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const handleHover = useCallback((i: number) => {
    if (lingerRef.current) clearTimeout(lingerRef.current);
    setHovered(i);
    setDisplayed(i);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
    lingerRef.current = setTimeout(() => setDisplayed(null), 1500);
  }, []);

  const getPos = useCallback((item: typeof ORBITS[0]) => {
    const angle = item.baseAngle + time * item.speed;
    const x = 50 + item.radiusX * Math.sin(angle);
    const yRaw = 50 + item.radiusY * Math.cos(angle) * item.tilt;
    const z = Math.cos(angle);
    const scale = 0.5 + (z + 1) * 0.35;
    const blur = Math.max(0, (1 - z) * 3);
    const opacity = 0.3 + (z + 1) * 0.35;
    const zIndex = Math.round((z + 1) * 15);
    return { x, y: yRaw, z, scale, blur, opacity, zIndex };
  }, [time]);

  const displayedItem = displayed !== null ? ORBITS[displayed] : null;
  const isActive = displayed !== null;

  return (
    <div className="slide aspect-video w-full relative overflow-hidden">
      <div className="absolute top-[4%] left-[5%] z-40" style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          What founders{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">say</mark>
        </h2>
      </div>

      {ORBITS.map((item, i) => {
        const pos = getPos(item);
        const isHovered = hovered === i;
        const isDisplayed = displayed === i;
        const isDimmed = isActive && !isHovered && !isDisplayed;

        return (
          <div
            key={item.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: isHovered || isDisplayed ? 50 : pos.zIndex,
              opacity: on ? (isDimmed ? 0.8 : pos.opacity) : 0,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : isDisplayed ? 1.2 : pos.scale})`,
              filter: `blur(${isHovered || isDisplayed ? 0 : pos.blur}px)`,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out",
            }}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={handleLeave}
          >
            <div className="relative size-14 overflow-hidden border-2 border-white/20 hover:border-[#FFEC40] transition-colors backdrop-blur-sm">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {isActive && displayedItem && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60] bg-black/40 animate-in fade-in duration-300"
        >
          <QuoteDisplay key={displayedItem.idx} item={displayedItem} />
        </div>
      )}
    </div>
  );
}
