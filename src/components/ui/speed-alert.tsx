"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DancingBanana } from "./dancing-banana";

const DISCO_COLORS = [
  "rgb(255, 236, 64)",
  "rgb(255, 100, 100)",
  "rgb(100, 200, 255)",
  "rgb(200, 100, 255)",
  "rgb(100, 255, 150)",
  "rgb(255, 180, 60)",
];

export function SpeedAlert({ onDone }: { onDone: () => void }) {
  const [countdown, setCountdown] = useState(5);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % DISCO_COLORS.length);
    }, 200);
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onDone]);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${DISCO_COLORS[colorIndex]}22, ${DISCO_COLORS[(colorIndex + 3) % DISCO_COLORS.length]}11, black 90%)`,
        transition: "background 0.2s ease",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `conic-gradient(from ${colorIndex * 60}deg, ${DISCO_COLORS.join(", ")})`,
          filter: "blur(80px)",
          transition: "background 0.2s ease",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <DancingBanana size={80} />
          <DancingBanana size={80} />
          <DancingBanana size={80} />
        </div>

        <div className="font-mono font-medium text-white text-2xl uppercase tracking-wider text-center">
          You got rate limited.
        </div>

        <div
          className="font-mono font-medium leading-none"
          style={{
            fontSize: "clamp(48px, 8vw, 120px)",
            color: DISCO_COLORS[colorIndex],
            transition: "color 0.2s ease",
          }}
        >
          {countdown}
        </div>

        <div className="font-sans font-medium text-white/40 text-base">
          Slow down and enjoy the deck.
        </div>
      </div>
    </div>
  );
}

const SPEED_THRESHOLD_MS = 800;
const SPEED_STREAK = 4;

export function useSpeedAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const hasShownRef = useRef(false);

  const recordNavigation = useCallback(() => {
    if (showAlert || hasShownRef.current) return;
    const now = Date.now();
    setTimestamps((prev) => {
      const recent = [...prev, now].filter((t) => now - t < 5000);
      const fastCount = recent.filter((t, i) => {
        if (i === 0) return false;
        return t - recent[i - 1] < SPEED_THRESHOLD_MS;
      }).length;
      if (fastCount >= SPEED_STREAK) {
        setShowAlert(true);
        hasShownRef.current = true;
        return [];
      }
      return recent;
    });
  }, [showAlert]);

  const dismissAlert = useCallback(() => {
    setShowAlert(false);
    setTimestamps([]);
  }, []);

  return { showAlert, recordNavigation, dismissAlert };
}
