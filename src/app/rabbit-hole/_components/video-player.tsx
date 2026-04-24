"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-14 bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 hover:text-white transition-opacity ${playing && started ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="translate-x-0.5" />}
        </Button>
      </div>
      {caption && (
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
