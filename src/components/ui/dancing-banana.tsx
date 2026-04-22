"use client";

import { useState, useEffect } from "react";

const FRAMES = Array.from(
  { length: 8 },
  (_, i) => `/dancing-bananas/frame_${i}_delay-0.1s.gif`
);

export function DancingBanana({ size = 120 }: { size?: number }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAMES.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={FRAMES[frame]}
      alt="Dancing banana"
      width={size}
      height={size}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
