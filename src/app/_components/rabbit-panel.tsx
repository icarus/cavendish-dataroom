"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const WORDS = "The most active investor in LatAm. 9,161 startups reviewed. 116 bets made.".split(" ");

interface Props {
  active: boolean;
  onBack: () => void;
}

export function RabbitPanel({ active, onBack }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShow(true), 350);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [active]);

  return (
    <div className="absolute top-[50%] left-0 w-screen h-screen flex items-end p-[6%] pb-[10%]">
      <p className="font-sans font-bold text-white" style={{ fontSize: "clamp(26px, 4.5vw, 70px)", lineHeight: 1.25 }}>
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.25em]"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease ${i * 70}ms, transform 0.6s ease ${i * 70}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </p>

      <div className="absolute top-6 left-6">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft />
          Back
        </Button>
      </div>
    </div>
  );
}
