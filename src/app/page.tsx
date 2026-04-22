"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { LandingPanel } from "./_components/landing-panel";
import { DeckPanel } from "./_components/deck-panel";
import { RabbitPanel } from "./_components/rabbit-panel";
import { useSpeedAlert } from "@/components/ui/speed-alert";

const TOTAL_SLIDES = 14;

export default function LandingPage() {
  const [deckOpen, setDeckOpen] = useState(false);
  const [rabbitOpen, setRabbitOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const lastScrollRef = useRef(0);
  const { showAlert, recordNavigation, dismissAlert } = useSpeedAlert();

  const openDeck = useCallback(() => { setCurrent(0); setDeckOpen(true); }, []);
  const closeDeck = useCallback(() => setDeckOpen(false), []);
  const openRabbit = useCallback(() => setRabbitOpen(true), []);
  const closeRabbit = useCallback(() => setRabbitOpen(false), []);
  const goTo = useCallback((n: number) => {
    recordNavigation();
    setCurrent(Math.max(0, Math.min(n, TOTAL_SLIDES - 1)));
  }, [recordNavigation]);

  useEffect(() => {
    const THRESHOLD = 20;
    const COOLDOWN = 400;

    const handle = (dx: number, dy: number) => {
      if (showAlert) return;
      const now = Date.now();
      if (now - lastScrollRef.current < COOLDOWN) return;

      const dominant = Math.abs(dx) >= Math.abs(dy) ? dx : dy;

      if (rabbitOpen) {
        if (dominant < -THRESHOLD) { closeRabbit(); lastScrollRef.current = now; }
        return;
      }

      if (deckOpen) {
        if (dominant > THRESHOLD) { goTo(current + 1); lastScrollRef.current = now; }
        else if (dominant < -THRESHOLD) {
          if (current === 0) closeDeck(); else goTo(current - 1);
          lastScrollRef.current = now;
        }
        return;
      }

      if (Math.abs(dx) >= Math.abs(dy) && dx > THRESHOLD) { openDeck(); lastScrollRef.current = now; }
      else if (Math.abs(dy) > Math.abs(dx) && dy > THRESHOLD) { openRabbit(); lastScrollRef.current = now; }
    };

    const onWheel = (e: WheelEvent) => handle(e.deltaX, e.deltaY);

    let startX = 0, startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].screenX;
      const dy = startY - e.changedTouches[0].screenY;
      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) handle(dx, dy);
    };

    document.addEventListener("wheel", onWheel, { passive: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [deckOpen, rabbitOpen, current, showAlert, openDeck, closeDeck, openRabbit, closeRabbit, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showAlert) return;
      if (rabbitOpen) { if (e.key === "Escape") closeRabbit(); return; }
      if (!deckOpen) {
        if (e.key === "Enter" || e.key === "ArrowRight") openDeck();
        else if (e.key === "ArrowDown") openRabbit();
        return;
      }
      switch (e.key) {
        case "ArrowRight": case "ArrowDown": case " ":
          e.preventDefault(); goTo(current + 1); break;
        case "ArrowLeft": case "ArrowUp":
          e.preventDefault();
          if (current === 0) closeDeck(); else goTo(current - 1);
          break;
        case "Home": e.preventDefault(); goTo(0); break;
        case "End": e.preventDefault(); goTo(TOTAL_SLIDES - 1); break;
        case "Escape": closeDeck(); break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [deckOpen, rabbitOpen, current, showAlert, openDeck, closeDeck, closeRabbit, goTo]);

  const transform = deckOpen
    ? "translateX(-50%)"
    : rabbitOpen
      ? "translateY(-50%)"
      : "translateX(0)";

  return (
    <div className="h-screen overflow-hidden">
      <div
        className="relative w-[200vw] h-[200vh] transition-transform duration-600 ease-in-out"
        style={{ transform }}
      >
        <LandingPanel onDeck={openDeck} onRabbit={openRabbit} />
        <DeckPanel current={current} deckOpen={deckOpen} onGoTo={goTo} onBack={closeDeck} showAlert={showAlert} onDismissAlert={dismissAlert} />
        <RabbitPanel active={rabbitOpen} onBack={closeRabbit} />
      </div>
    </div>
  );
}
