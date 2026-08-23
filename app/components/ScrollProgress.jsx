"use client";

import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current && total > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / total));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[1000] bg-transparent pointer-events-none origin-left">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#00c2d1] via-[#8b6bff] to-[#ff3d9a] shadow-[0_0_10px_#00c2d1] origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
