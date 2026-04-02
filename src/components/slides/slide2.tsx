"use client";

import { f, P, useAnim } from "./utils";

export function Slide2({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex justify-center items-center p-[6%]">
      <h1 className="font-sans font-medium text-white leading-[1.3]" style={{ fontSize: "clamp(30px, 4.5vw, 68px)" }}>
        <span style={f(on, 0)} className="block translate-x-[15%]">Forging Latin American</span>
        <span style={f(on, 80)} className="block -translate-x-[15%]">technical founders</span>
        <mark className="translate-x-[15%] bg-[#FFEC40] text-black px-2 py-0.5 inline-block not-italic" style={f(on, 160)}>
          into standout startups.
        </mark>
      </h1>
    </div>
  );
}
