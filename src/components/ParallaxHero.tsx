"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const ANIMATION_RANGE = 300; // full parallax animation range
const UNLOCK_AT = 150;       // release scroll at 50% of animation

export default function ParallaxHero() {
  const [progress, setProgress] = useState(0);
  const virtualScroll = useRef(0);
  const locked = useRef(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const applyDelta = useCallback((deltaY: number, canPreventDefault: (() => void) | null) => {
    // If scrolling back up into the hero, re-lock
    if (!locked.current && window.scrollY === 0 && deltaY < 0) {
      locked.current = true;
      virtualScroll.current = 0;
      setProgress(0);
      canPreventDefault?.();
      return;
    }

    if (!locked.current) {
      virtualScroll.current = Math.max(0, Math.min(ANIMATION_RANGE, virtualScroll.current + deltaY * 0.5));
      setProgress(virtualScroll.current / ANIMATION_RANGE);
      return;
    }

    canPreventDefault?.();
    virtualScroll.current = Math.max(0, Math.min(ANIMATION_RANGE, virtualScroll.current + deltaY));
    setProgress(virtualScroll.current / ANIMATION_RANGE);

    if (virtualScroll.current >= UNLOCK_AT) {
      locked.current = false;
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    applyDelta(e.deltaY, () => e.preventDefault());
  }, [applyDelta]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const deltaY = touchStartY.current - e.touches[0].clientY;
    touchStartY.current = e.touches[0].clientY;
    applyDelta(deltaY, () => e.preventDefault());
  }, [applyDelta]);

  // Force scroll to top on mount to prevent browser restore
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: false };
    document.addEventListener("wheel", handleWheel, opts);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, opts);
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // 70/30 split: primary axis gets 70%, secondary gets 30%
  const maxOffset = ANIMATION_RANGE * 0.3;
  const base = progress * maxOffset;
  const primary = base * 0.7;
  const secondary = base * 0.3;

  return (
    <div
      ref={heroRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-[100vw] w-[100vw] translate-y-20 sm:h-[1200px] sm:w-[1200px] sm:translate-y-0">
        {/* DC1 — mug/left half, moves left + down */}
        <Image
          src="/dc1.png"
          alt=""
          width={1200}
          height={1200}
          className="absolute inset-0 h-full w-full opacity-20 sm:opacity-30"
          style={{
            transform: `translate(${-primary}px, ${secondary}px)`,
            transition: "transform 150ms ease-out",
          }}
          priority
        />
        {/* DC2 — spill/right half, moves right + up */}
        <Image
          src="/dc2.png"
          alt=""
          width={1200}
          height={1200}
          className="absolute inset-0 h-full w-full opacity-20 sm:opacity-30"
          style={{
            transform: `translate(${primary}px, ${-secondary}px)`,
            transition: "transform 150ms ease-out",
          }}
          priority
        />
      </div>
    </div>
  );
}
