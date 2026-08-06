"use client";

import React, { useEffect, useRef } from 'react';

export default function BackgroundGrid() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      const { clientX, clientY } = e;
      spotlightRef.current.style.left = `${clientX}px`;
      spotlightRef.current.style.top = `${clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Dynamic Animated Aurora Mesh Gradient Blobs */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,194,209,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,194,209,0.10)_0%,transparent_70%)] -top-[15%] -left-[10%] animate-aurora-blob1" />
      <div className="absolute w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,107,255,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(139,107,255,0.08)_0%,transparent_70%)] top-[35%] -right-[15%] animate-aurora-blob2" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,61,154,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,61,154,0.05)_0%,transparent_70%)] bottom-[10%] left-[20%] animate-aurora-blob3" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" 
      />

      {/* Radial Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[radial-gradient(#0a0a0a_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#808080_1.5px,transparent_1.5px)] bg-[size:30px_30px]" 
      />

      {/* Mouse Spotlight Follower */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,194,209,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,194,209,0.06)_0%,transparent_70%)] transition-opacity duration-500 pointer-events-none"
        style={{ left: '-1000px', top: '-1000px' }}
      />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:4px_4px]" />
    </div>
  );
}
