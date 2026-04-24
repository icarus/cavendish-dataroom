"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoPlayer({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="my-4">
      <div className="relative group border border-black/10 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="w-full block"
          onEnded={() => {
            setPlaying(false);
            setStarted(false);
          }}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "bg-white/100 absolute left-4 bottom-4 rounded-full size-14 flex items-center justify-center cursor-pointer transition-opacity",
            playing && started ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          )}
        >
          {playing ? <Pause size={22} className="fill-black stroke-0" /> : <Play size={22} className="fill-black stroke-0" />}
        </button>
      </div>
      {caption && (
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
