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

  const handleWheel = useCallback((e: WheelEvent) => {
    // If scrolling back up into the hero, re-lock and immediately process this scroll-up
    if (!locked.current && window.scrollY === 0 && e.deltaY < 0) {
      locked.current = true;
      // Reset to 0 — images snap together, then user scrolls down to re-separate
      virtualScroll.current = 0;
      setProgress(0);
      e.preventDefault();
      return;
    }

    if (!locked.current) {
      // Keep driving parallax from continued scrolling after unlock
      virtualScroll.current = Math.max(0, Math.min(ANIMATION_RANGE, virtualScroll.current + e.deltaY * 0.5));
      setProgress(virtualScroll.current / ANIMATION_RANGE);
      return;
    }

    e.preventDefault();
    virtualScroll.current = Math.max(0, Math.min(ANIMATION_RANGE, virtualScroll.current + e.deltaY));
    setProgress(virtualScroll.current / ANIMATION_RANGE);

    if (virtualScroll.current >= UNLOCK_AT) {
      locked.current = false;
    }
  }, []);

  // Force scroll to top on mount to prevent browser restore
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

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
      <div className="relative h-[80vh] w-[80vh] sm:h-[1200px] sm:w-[1200px]">
        {/* DC1 — mug/left half, moves left + down */}
        <Image
          src="/dc1.png"
          alt=""
          width={1200}
          height={1200}
          className="absolute inset-0 opacity-20 sm:opacity-30"
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
          className="absolute inset-0 opacity-20 sm:opacity-30"
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
