"use client";

import { f, P, useAnim } from "./utils";

export function Slide12({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex flex-col items-center justify-center">
      <div className="font-mono text-white text-center" style={{ fontSize: "clamp(22px, 4vw, 62px)", ...f(on, 0) }}>
        paula<span className="text-[#FFEC40]">@</span>platan.us
      </div>
      <div className="absolute bottom-10 flex items-center gap-2" style={f(on, 200)}>
        <img src="/logo.svg" alt="Platanus" className="h-7 w-auto" />
      </div>
    </div>
  );
}
