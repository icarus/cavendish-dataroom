"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Slide2, SlideFounderQuote, SlideRiskAverse, SlideLiberation, SlideClearingFog,
  Slide6, SlideFundStrategy, SlideTrackRecord,
  Slide7, Slide8, Slide9, Slide10, Slide11, SlideSocialProof, Slide12,
} from "@/components/slides";

const SLIDES: { Comp: React.ComponentType<{ active: boolean }>; bg?: string }[] = [
  { Comp: Slide2 },
  { Comp: SlideFounderQuote },
  { Comp: SlideRiskAverse },
  { Comp: SlideLiberation, bg: "#FFEC40" },
  { Comp: SlideClearingFog },
  { Comp: Slide8 },
  { Comp: Slide7 },
  { Comp: SlideFundStrategy },
  { Comp: Slide6 },
  { Comp: SlideTrackRecord },
  { Comp: Slide10 },
  { Comp: Slide11 },
  { Comp: SlideSocialProof },
  { Comp: Slide12 },
];

interface Props {
  current: number;
  deckOpen: boolean;
  onGoTo: (n: number) => void;
  onBack: () => void;
}

export function DeckPanel({ current, deckOpen, onGoTo, onBack }: Props) {
  return (
    <div
      className="absolute top-0 left-[50%] w-screen h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: SLIDES[current]?.bg ?? "rgba(0,0,0,0.4)" }}
    >
      {SLIDES.map(({ Comp }, i) => (
        <div
          key={i}
          className="absolute aspect-video left-1/2 -translate-x-1/2 w-screen top-1/2 -translate-y-1/2"
          style={{
            transform: `translateX(${(i - current) * 100}%)`,
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <Comp active={i === current && deckOpen} />
        </div>
      ))}

      <div className="block md:hidden absolute top-6 left-6 z-10">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft />
          Back
        </Button>
      </div>

      <div className="absolute top-6 right-6 text-sm text-white/30 font-mono tabular-nums z-10">
        {current + 1} / {SLIDES.length}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 items-center z-10">
        {SLIDES.map((_, i) => (
          <Button
            key={i}
            variant={i === current ? "default" : "outline"}
            size="icon"
            onClick={() => onGoTo(i)}
            style={{ width: i === current ? 24 : 6, height: 6, minWidth: 0, borderRadius: 9999, padding: 0, transition: "width 300ms" }}
            className={i === current ? "!bg-[#FFEC40]" : "bg-white/25 border-0"}
          />
        ))}
      </div>
    </div>
  );
}
