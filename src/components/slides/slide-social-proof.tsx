"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/deck-data";
import { f, P, useAnim } from "./utils";

export function SlideSocialProof({ active }: P) {
  const on = useAnim(active);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!active) { setOffset(0); return; }
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [active]);

  const visible = Array.from({ length: 3 }, (_, i) => {
    const idx = (offset + i) % TESTIMONIALS.length;
    return TESTIMONIALS[idx];
  }).filter((t) => t.text);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%]">
      <div className="mb-6" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          What founders{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">say</mark>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {visible.map((testimonial, i) => (
          <div
            key={`${testimonial.name}-${offset}`}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col gap-4 animate-in fade-in duration-500"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative size-10 overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans font-medium text-white text-base">{testimonial.name}</p>
                {testimonial.company && (
                  <p className="font-sans font-medium text-white text-base">{testimonial.company}</p>
                )}
              </div>
            </div>
            <p className="font-sans font-medium text-white text-base leading-relaxed flex-1 line-clamp-6">
              &ldquo;{testimonial.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
