"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowRight } from "lucide-react";

interface Props {
  active: boolean;
  onBack: () => void;
}

const f = (on: boolean, d = 0): React.CSSProperties => ({
  opacity: on ? 1 : 0,
  transform: on ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
});

export function RabbitPanel({ active, onBack }: Props) {
  const [on, setOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setOn(true), 350);
      return () => clearTimeout(t);
    }
    setOn(false);
  }, [active]);

  return (
    <div className="absolute top-[50%] left-0 w-screen h-screen flex items-center justify-center bg-black/60">
      <button
        onClick={onBack}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono font-medium text-white/40 text-base uppercase tracking-wider cursor-pointer bg-transparent border-none hover:text-white transition-colors backdrop-blur-sm"
        style={f(on, 0)}
      >
        <ArrowUp size={16} />
        Back
      </button>

      <div className="flex flex-col items-center">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white mb-2" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Data{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Room</mark>
          </h2>
        </div>

        <p className="font-mono font-medium text-white/40 text-base uppercase tracking-wider mb-10" style={f(on, 80)}>
          Confidential investor materials
        </p>

        <div className="flex flex-col gap-3 w-72">
          <button
            onClick={() => router.push("/rabbit-hole")}
            className="flex items-center justify-between px-5 py-3 border border-[#FFEC40] bg-[#FFEC40] text-black font-mono font-medium text-base uppercase tracking-wider cursor-pointer hover:bg-[#FFEC40]/90 transition-colors backdrop-blur-sm"
            style={f(on, 160)}
          >
            Down the Rabbit Hole
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => router.push("/memo")}
            className="flex items-center justify-center px-5 py-3 border border-white/20 bg-transparent text-white/40 font-mono font-medium text-base uppercase tracking-wider cursor-pointer hover:border-white/40 hover:text-white hover:bg-white/5 transition-colors backdrop-blur-sm"
            style={f(on, 240)}
          >
            Memo
          </button>
        </div>
      </div>
    </div>
  );
}
