"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/SoundManager';

const TECH_CATEGORIES = [
  { id: "ALL", label: "All Tech" },
  { id: "FRONTEND", label: "Frontend & UI" },
  { id: "DESKTOP", label: "Desktop & Systems" },
  { id: "3D", label: "WebGL & 3D" },
  { id: "TOOLS", label: "Tools & Backend" }
];

const TECH_STACK = [
  { name: "React 19", icon: "⚛️", cat: "FRONTEND" },
  { name: "Next.js 16", icon: "▲", cat: "FRONTEND" },
  { name: "Electron", icon: "⚡", cat: "DESKTOP" },
  { name: "Node.js", icon: "🟢", cat: "DESKTOP" },
  { name: "Three.js", icon: "🔺", cat: "3D" },
  { name: "React Three Fiber", icon: "🌌", cat: "3D" },
  { name: "Socket.IO", icon: "🔌", cat: "TOOLS" },
  { name: "WebRTC / PeerJS", icon: "📡", cat: "FRONTEND" },
  { name: "Vite", icon: "🔥", cat: "FRONTEND" },
  { name: "FFmpeg WASM", icon: "🎬", cat: "DESKTOP" },
  { name: "Python", icon: "🐍", cat: "TOOLS" },
  { name: "TypeScript", icon: "🟦", cat: "FRONTEND" },
  { name: "Tailwind v4", icon: "🌊", cat: "FRONTEND" },
  { name: "GSAP & Motion", icon: "✨", cat: "FRONTEND" },
  { name: "WASM SQLite", icon: "💾", cat: "DESKTOP" },
  { name: "Git & Vercel", icon: "🔀", cat: "TOOLS" },
];

const TechBadge = React.memo(function TechBadge({ tech, idx }) {
  return (
    <motion.div
      onMouseEnter={() => soundManager.playHover()}
      className="card flex flex-col items-center gap-3 p-6 text-center border-r border-b border-[#e8e8e8] dark:border-white/15 hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{tech.icon}</span>
      <span className="text-xs font-medium text-[#0a0a0a] dark:text-[#f2f2f2]">{tech.name}</span>
    </motion.div>
  );
});
TechBadge.displayName = 'TechBadge';

const TechStack = React.memo(function TechStack() {
  const [activeCat, setActiveCat] = useState("ALL");

  const filteredTech = TECH_STACK.filter(
    (item) => activeCat === "ALL" || item.cat === activeCat
  );

  return (
    <>
      <div id="stack" className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-6 animate-section">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan mb-4 inline-block">The Toolkit</span>
        <h2 className="font-semibold text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] dark:text-[#f2f2f2] mb-6">Powered by a modern stack, obsessed with performance.</h2>
        <p className="text-[#555] dark:text-[#aaa] leading-relaxed max-w-md mb-8">Every project in this console is built, deployed, and monitored using the same battle-tested toolkit — chosen for speed, DX, and zero compromise on polish.</p>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 mb-8">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCat(cat.id);
              }}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-200 whitespace-nowrap ${
                activeCat === cat.id
                  ? 'border-cyan bg-cyan/10 text-cyan font-bold shadow-[0_0_12px_rgba(0,194,209,0.2)]'
                  : 'border-[#e8e8e8] dark:border-white/15 text-[#666] dark:text-[#999] hover:border-[#0a0a0a] dark:hover:border-white/40 hover:text-[#0a0a0a] dark:hover:text-[#f2f2f2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#e8e8e8] dark:border-white/15 mb-4">
        {filteredTech.map((tech, idx) => (
          <TechBadge key={tech.name} tech={tech} idx={idx} />
        ))}
      </div>
    </>
  );
});

export default TechStack;
