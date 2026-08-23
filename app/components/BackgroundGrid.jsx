"use client";

import React from 'react';
import CyberConstellation from './CyberConstellation';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Interactive 2D Cyber Constellation Particle Canvas */}
      <CyberConstellation />
      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" 
      />

      {/* Radial Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[radial-gradient(#0a0a0a_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#808080_1.5px,transparent_1.5px)] bg-[size:30px_30px]" 
      />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:4px_4px]" />
    </div>
  );
}
