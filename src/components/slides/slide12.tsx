"use client";

import { useState } from "react";
import { f, P, useAnim } from "./utils";

export function Slide12({ active }: P) {
  const on = useAnim(active);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("joaquin@platan.us");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="slide aspect-video w-full relative flex flex-col items-center justify-center">
      <div className="relative">
        <button
          onClick={handleCopy}
          className="font-mono text-white uppercase text-center cursor-pointer bg-transparent border-none"
          style={{ fontSize: "51px", ...f(on, 0) }}
        >
          joaquin<span className="text-[#FFEC40]">@</span>platan.us
        </button>
        <div className="w-full flex justify-center absolute -top-8">
          <span
            className="font-mono uppercase text-base text-black bg-[#FFEC40] px-3 py-1 whitespace-nowrap transition-all duration-300"
            style={{
              opacity: copied ? 1 : 0,
              transform: copied ? "translateY(0)" : "translateY(4px)",
            }}
          >
            Email copied
          </span>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2" style={f(on, 200)}>
        <img src="/logo.svg" alt="Platanus" className="h-7 w-auto" />
      </div>
    </div>
  );
}
