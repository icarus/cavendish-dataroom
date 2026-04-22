"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/deck-data";
import { P, useAnim } from "./utils";

const ITEMS = TESTIMONIALS.filter((t) => t.text);

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const ORBITS = ITEMS.map((t, i) => {
  const ring = i % 3;
  const ringIndex = Math.floor(i / 3);
  const ringCount = Math.ceil(ITEMS.length / 3);
  const baseAngle = (ringIndex / ringCount) * Math.PI * 2 + ring * 0.7;
  const radiusX = [38, 26, 14][ring];
  const radiusY = [22, 15, 8][ring];
  const speed = [0.15, 0.1, 0.07][ring];
  const tilt = 0.6;
  return { ...t, baseAngle, radiusX, radiusY, speed, tilt, ring };
});

export function SlideSocialProof({ active }: P) {
  const on = useAnim(active);
  const [hovered, setHovered] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

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

  const hoveredItem = hovered !== null ? ORBITS[hovered] : null;

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
        const isDimmed = hovered !== null && !isHovered;

        return (
          <div
            key={item.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: isHovered ? 50 : pos.zIndex,
              opacity: on ? (isDimmed ? 0.15 : pos.opacity) : 0,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : pos.scale})`,
              filter: `blur(${isHovered ? 0 : pos.blur}px)`,
              transition: "opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.2s ease-out",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
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

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl w-full px-8 pointer-events-none z-30"
        style={{
          opacity: hoveredItem ? 1 : 0,
          transform: hoveredItem ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      >
        {hoveredItem && (
          <div className="text-center flex flex-col items-center gap-4">
            <p className="font-sans font-medium text-white text-base leading-relaxed">
              &ldquo;{hoveredItem.text}&rdquo;
            </p>
            <div>
              <span className="font-sans font-medium text-white text-base">{hoveredItem.name}</span>
              {hoveredItem.company && (
                <span className="font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider ml-3">
                  {hoveredItem.company}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
