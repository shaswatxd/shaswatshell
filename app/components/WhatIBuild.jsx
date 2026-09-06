"use client";

import React, { useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';

const BENTO_ITEMS = [
  {
    id: "desktop",
    title: "High-Performance Desktop Apps",
    badge: "ELECTRON & WASM",
    badgeColor: "#00c2d1",
    desc: "Production-grade native desktop systems with multi-threaded byte-range download engines, real HLS audio/video streaming, crash-safe SQLite state persistence, and native IPC routing.",
    icon: "🖥️",
    colSpan: "lg:col-span-8",
    tags: ["Electron", "Node.js Worker Threads", "SQLite WASM", "FFmpeg", "IPC Bridges"],
    telemetry: {
      label: "Active Engine",
      value: "16 Worker-Threads // SQLite WAL Persisted",
      status: "LIVE"
    }
  },
  {
    id: "webgl",
    title: "Full-Stack Web & 3D Systems",
    badge: "REACT 19 & THREE.JS",
    badgeColor: "#a855f7",
    desc: "Client-server web applications engineered for 60-120 FPS performance, WebGL shaders, R3F interactive scenes, and real-time reactive WebSockets.",
    icon: "🌐",
    colSpan: "lg:col-span-4",
    tags: ["Next.js (App Router)", "React 19", "Three.js / R3F", "Tailwind v4"],
    telemetry: {
      label: "Render Loop",
      value: "Static DPR=1 (60-120 FPS)",
      status: "SYNCED"
    }
  },
  {
    id: "tooling",
    title: "Developer Utilities & CLI Tooling",
    badge: "SCRIPTS & APIS",
    badgeColor: "#22c55e",
    desc: "Automated media parsers, local compilation shells, custom Git hooks, and APK utilities designed to eliminate tedious deployment paths.",
    icon: "⚙️",
    colSpan: "lg:col-span-5",
    tags: ["Node Scripts", "Python", "CLI Shells", "Manifest V3", "Android APK Tools"],
    telemetry: {
      label: "Automation",
      value: "Zero Corporate Fluff // 100% Shipped",
      status: "READY"
    }
  },
  {
    id: "performance",
    title: "Client-Side First & Zero Telemetry Craft",
    badge: "SECURITY & SPEED",
    badgeColor: "#f59e0b",
    desc: "100% in-browser processing without data leaving user machines. Instant WASM PDF generation, offline bill templates, and military-grade storage shredders.",
    icon: "⚡",
    colSpan: "lg:col-span-7",
    tags: ["WASM Compilations", "Client-Side PDF", "Zero Tracking", "Local Vault Storage"],
    telemetry: {
      label: "Data Privacy",
      value: "100% Client-Side Privacy // Zero Analytics Leak",
      status: "SECURED"
    }
  }
];

const BentoCard = memo(function BentoCard({ item, idx }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-[#e8e8e8] dark:border-white/10 bg-white/95 dark:bg-[#0d0d12]/95 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan/5 ${item.colSpan}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.08 }}
    >
      {/* 21st.dev Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${item.badgeColor}18, transparent 80%)`,
        }}
      />

      {/* 21st.dev Cursor-Following Border Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, ${item.badgeColor}88, transparent 70%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10">
        {/* Card Header with Category Pill */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="w-11 h-11 rounded-xl border border-[#0a0a0a]/15 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.04] flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
            {item.icon}
          </div>

          <span 
            className="font-mono text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full border"
            style={{
              borderColor: `${item.badgeColor}40`,
              color: item.badgeColor,
              backgroundColor: `${item.badgeColor}12`
            }}
          >
            {item.badge}
          </span>
        </div>

        <h3 className="font-semibold text-xl sm:text-2xl mb-3 text-[#0a0a0a] dark:text-[#f2f2f2] group-hover:text-cyan transition-colors">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#555] dark:text-[#aaa] leading-relaxed mb-6">
          {item.desc}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
        {/* Telemetry Strip */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#888] dark:text-[#666]">{item.telemetry.label}:</span>
          <span className="text-[#444] dark:text-[#ccc] font-medium truncate ml-2">
            {item.telemetry.value}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="border border-[#e8e8e8] dark:border-white/10 px-2 py-0.5 rounded font-mono text-[10px] text-[#666] dark:text-[#888] bg-black/[0.01] dark:bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default function WhatIBuild() {
  return (
    <>
      {/* Section Header */}
      <div id="builds" className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-8 animate-section flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan mb-3 inline-block">Architecture &amp; Focus</span>
          <h2 className="font-semibold text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] dark:text-[#f2f2f2]">What I Build</h2>
        </div>
        <div className="font-mono text-xs text-[#888] tracking-widest">
          [SYSTEMS // FRONTEND // DESKTOP]
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4">
        {BENTO_ITEMS.map((item, idx) => (
          <BentoCard key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </>
  );
}

