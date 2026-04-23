"use client";

import { useEffect } from "react";

const PHRASES = [
  "Platanus Cavendish LP",
  "Apply Now 🍌",
];

const TYPING_SPEED = 120;
const DELETE_SPEED = 10;
const PAUSE_AFTER_TYPE = 240;
const PAUSE_AFTER_DELETE = 600;

const FAVICON_FRAMES = Array.from(
  { length: 8 },
  (_, i) => `/dancing-bananas/frame_${i}_delay-0.1s.gif`
);

export function DynamicHead() {
  useEffect(() => {
    let frameIndex = 0;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    const faviconInterval = setInterval(() => {
      link!.href = FAVICON_FRAMES[frameIndex % FAVICON_FRAMES.length];
      frameIndex++;
    }, 150);

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (!deleting) {
        charIndex++;
        document.title = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          timeout = setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        timeout = setTimeout(tick, TYPING_SPEED);
      } else {
        charIndex--;
        document.title = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          timeout = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timeout = setTimeout(tick, DELETE_SPEED);
      }
    };

    timeout = setTimeout(tick, PAUSE_AFTER_DELETE);

    return () => {
      clearInterval(faviconInterval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
