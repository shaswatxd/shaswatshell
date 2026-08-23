"use client";

import React, { memo } from 'react';

const BackgroundGrid = memo(function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ─── Ambient Glow Meshes (Pure GPU CSS Blurs) ─── */}
      {/* Top Left Cyan Aurora */}
      <div 
        className="absolute -top-[15%] left-[5%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-br from-cyan/12 via-cyan/5 to-transparent blur-[100px] sm:blur-[140px] transform-gpu dark:from-cyan/15 dark:via-cyan/5"
      />

      {/* Top Right Violet Aurora */}
      <div 
        className="absolute -top-[10%] -right-[5%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-bl from-violet/10 via-violet/4 to-transparent blur-[110px] sm:blur-[150px] transform-gpu dark:from-violet/15 dark:via-violet/5"
      />

      {/* Mid Page Ambient Depth Mesh */}
      <div 
        className="absolute top-[45%] left-[20%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/6 via-cyan/4 to-transparent blur-[120px] sm:blur-[160px] transform-gpu dark:from-emerald-500/8 dark:via-cyan/4"
      />

      {/* ─── Cyber Blueprint Grid Pattern with Soft Vignette Mask ─── */}
      <div 
        className="absolute inset-0 bg-cyber-grid opacity-[0.45] dark:opacity-[0.35]"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 25%, transparent 85%)'
        }}
      />

      {/* Subtle Noise / Grain Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.04]" />
    </div>
  );
});

export default BackgroundGrid;
