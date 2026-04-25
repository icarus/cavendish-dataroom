import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";

interface Props {
  onDeck: () => void;
  onRabbit: () => void;
}

export function LandingPanel({ onDeck, onRabbit }: Props) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <Image
        src="/logo.svg"
        width={1920}
        height={1080}
        alt="Platanus logo"
        className="z-10 select-none pointer-events-none animate-in fade-in duration-600 delay-900 fill-mode-both absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 md:h-24"
      />
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <button onClick={onDeck} className="cursor-pointer flex items-center gap-1.5 font-mono font-medium uppercase text-base text-[#FFEC40] hover:opacity-70 transition-opacity">
          Deck
          <ArrowRight size={16} />
        </button>
        <button onClick={onRabbit} className="cursor-pointer flex items-center gap-1.5 font-mono font-medium uppercase text-base text-gray-400 hover:opacity-70 transition-opacity">
          Data Room
          <ArrowDown size={16} />
        </button>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in duration-600 delay-900 fill-mode-both bg-black/75 w-128 h-48 blur-3xl" />
      <div className="absolute bottom-3 right-4 opacity-0 hover:opacity-100 transition-opacity font-mono uppercase font-medium text-white/40 text-base">
        designed by{" "}
        <a href="https://felipemandiola.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Felipe Mandiola</a>
        {" & "}Joaquin Stephens
      </div>
    </div>
  );
}
