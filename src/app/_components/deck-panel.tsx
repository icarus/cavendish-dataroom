"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Slide2, SlideFounderQuote, SlideRiskAverse, SlideLiberation, SlideClearingFog,
  Slide6, SlideFundStrategy, SlideTrackRecord,
  Slide7, Slide8, Slide10, Slide11, SlideSocialProof, Slide12,
} from "@/components/slides";
import { SpeedAlert } from "@/components/ui/speed-alert";

const REF_W = 1280;
const REF_H = 720;

function useSlideScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      setScale(Math.min(sw / REF_W, sh / REF_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

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
  { Comp: SlideSocialProof, bg: "transparent" },
  { Comp: Slide12 },
];

interface Props {
  current: number;
  deckOpen: boolean;
  onGoTo: (n: number) => void;
  onBack: () => void;
  showAlert: boolean;
  onDismissAlert: () => void;
}

export function DeckPanel({ current, deckOpen, onGoTo, onBack, showAlert, onDismissAlert }: Props) {
  const isYellow = SLIDES[current]?.bg === "#FFEC40";
  const scale = useSlideScale();

  return (
    <div
      className="absolute top-0 left-[50%] w-screen h-screen overflow-hidden"
      style={{ backgroundColor: SLIDES[current]?.bg ?? "rgba(0,0,0,0.4)", transition: "background-color 600ms ease" }}
    >
      {SLIDES.map(({ Comp }, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: REF_W,
            height: REF_H,
            transform: `translate(-50%, -50%) translateX(${(i - current) * REF_W}px) scale(${scale})`,
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

      <div className={`absolute top-6 right-6 text-sm font-mono tabular-nums z-10 transition-colors ${isYellow ? "text-black/30" : "text-white/30"}`}>
        {current + 1} / {SLIDES.length}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 items-center z-10">
        <Button
          variant="default"
          size="icon"
          onClick={() => onGoTo(Math.max(0, current - 1))}
          className={`!bg-transparent !border-0 ${isYellow ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"}`}
          disabled={current === 0}
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-1.5 items-center">
          {SLIDES.map((_, i) => (
            <Button
              key={i}
              variant={i === current ? "default" : "outline"}
              size="icon"
              onClick={() => onGoTo(i)}
              style={{ width: i === current ? 24 : 6, height: 6, minWidth: 0, borderRadius: 9999, padding: 0, transition: "width 300ms" }}
              className={i === current ? (isYellow ? "!bg-black" : "!bg-[#FFEC40]") : (isYellow ? "bg-black/25 border-0" : "bg-white/25 border-0")}
            />
          ))}
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={() => onGoTo(Math.min(SLIDES.length - 1, current + 1))}
          className={`!bg-transparent !border-0 ${isYellow ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"}`}
          disabled={current === SLIDES.length - 1}
        >
          <ChevronRight />
        </Button>
      </div>

      {showAlert && <SpeedAlert onDone={onDismissAlert} />}
    </div>
  );
}
