"use client";

import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/SoundManager';

import { PROJECTS, GLOW_COLORS } from '../data/projects';


// Details Modal Component
const ProjectModal = memo(function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);
  const color = GLOW_COLORS[project.glow] || GLOW_COLORS.cyan;

  const copyToClipboard = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(project.details.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy path: ", err);
    }
  };

  useEffect(() => {
    // Disable scroll behind modal
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop overlay */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a]/50 backdrop-filter backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        className="relative w-full max-w-[620px] border border-[#0a0a0a] dark:border-white/20 bg-white dark:bg-[#111] overflow-hidden z-10"
        initial={{ scale: 0.93, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 25 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0a0a0a] dark:border-white/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-mono text-[10px] text-[#666] dark:text-[#999]">{project.name.toLowerCase()}-specs.json</span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center border border-[#e8e8e8] dark:border-white/15 hover:border-[#0a0a0a] dark:hover:border-white/40 text-[#666] dark:text-[#999] hover:text-[#0a0a0a] dark:hover:text-[#f2f2f2] transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center gap-3.5 mb-5">
            <div
              className="w-12 h-12 border border-[#0a0a0a] dark:border-white/25 flex items-center justify-center text-2xl"
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-semibold text-xl text-[#0a0a0a] dark:text-[#f2f2f2]">{project.name}</h3>
              <span className="font-mono text-[9px] tracking-widest px-2.5 py-0.5 border" style={{ color: color, borderColor: color }}>
                {project.badge}
              </span>
            </div>
          </div>

          <p className="text-[#555] dark:text-[#aaa] text-[13px] leading-relaxed mb-6">
            {project.desc}
          </p>

          {/* Architecture breakdown */}
          <div className="mb-6 p-4 border border-[#e8e8e8] dark:border-white/15">
            <h4 className="font-mono text-[10px] uppercase text-[#0a0a0a] dark:text-[#f2f2f2] mb-2 tracking-wider flex items-center gap-1.5">
              <span style={{ color: color }}>◆</span> System Architecture
            </h4>
            <p className="text-[#555] dark:text-[#aaa] text-[11px] leading-relaxed">
              {project.details.architecture}
            </p>
          </div>

          {/* Key Modules lists */}
          <div className="mb-6">
            <h4 className="font-mono text-[10px] uppercase text-[#0a0a0a] dark:text-[#f2f2f2] mb-2.5 tracking-wider flex items-center gap-1.5">
              <span style={{ color: color }}>◆</span> Modules &amp; Subsystems
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {project.details.modules.map((mod, i) => (
                <div key={i} className="flex items-center gap-2 border border-[#e8e8e8] dark:border-white/15 px-3 py-2">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[9.5px] text-[#555] dark:text-[#aaa]">{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command Terminal box */}
          {project.details.command && (
          <div>
            <h4 className="font-mono text-[10px] uppercase text-[#0a0a0a] dark:text-[#f2f2f2] mb-2 tracking-wider flex items-center gap-1.5">
              <span style={{ color: color }}>◆</span> Local Installation
            </h4>
            <div
              onClick={copyToClipboard}
              className="flex items-center justify-between border border-[#0a0a0a] bg-[#0a0a0a] p-3 font-mono text-[11px] cursor-pointer transition-all duration-300 group"
            >
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                <span className="text-cyan">$</span>
                <span className="text-white">{project.details.command}</span>
              </div>
              <button
                className="ml-3 font-mono text-[8px] tracking-wider uppercase font-bold px-2 py-1 border border-white/20 text-white transition-all duration-200"
                style={{ color: copied ? '#3ef07c' : '#ffffff' }}
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>
          )}
        </div>

        {/* Links Footer */}
        <div className="border-t border-[#0a0a0a] dark:border-white/15">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center py-4 text-center font-mono text-[11px] tracking-widest uppercase font-bold text-white transition-all duration-200"
          >
            <span>Launch Console</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
});

// Card Component with 3D Tilt & Glassmorphism physics
const Card = memo(function Card({ project, idx, onOpenDetails, borderClasses }) {
  const col = GLOW_COLORS[project.glow] || GLOW_COLORS.cyan;
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mousemove handler for 3D card tilt & 21st.dev spotlight
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles (-8deg to +8deg)
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: rotateX, y: rotateY });
      setMousePos({ x, y });
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onOpenDetails(project);
      }}
      className={`card spotlight-card bg-white/95 dark:bg-[#0c0c10]/95 p-8 flex flex-col cursor-pointer group relative overflow-hidden transition-all duration-300 ${project.featured ? 'card-featured' : ''} ${borderClasses}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease-out" : "none"
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: "spring", stiffness: 75, damping: 14, delay: idx * 0.06 }}
    >
      {/* 21st.dev Spotlight Radial Glow */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${col}22, transparent 80%)`,
        }}
      />

      {/* 21st.dev Cursor-Following Border Spotlight (Linear / Aceternity Beam) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, ${col}aa, transparent 70%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Animated Top Border Beam on Hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${col}, transparent)` }}
      />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div 
          className="w-11 h-11 border border-[#0a0a0a]/20 dark:border-white/25 bg-white/50 dark:bg-white/5 rounded-lg flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          {project.icon}
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#666] dark:text-[#999]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col }} />
          {project.featured && <span className="premium-badge-text font-bold">PREMIUM APP</span>}
          {!project.featured && project.badge}
        </span>
      </div>

      <h3 className="relative z-10 font-semibold text-lg mb-2 text-[#0a0a0a] dark:text-[#f2f2f2]">{project.name}</h3>
      <p className="relative z-10 text-sm text-[#555] dark:text-[#aaa] leading-relaxed mb-6 flex-1">{project.desc}</p>

      {project.features && (
        <ul className="relative z-10 flex flex-col gap-1.5 mb-6">
          {project.features.map((feat, fIdx) => (
            <li key={fIdx} className="text-[11px] text-[#666] dark:text-[#999]">
              {feat}
            </li>
          ))}
        </ul>
      )}

      <div className="relative z-10 flex items-center justify-between pt-1 select-none">
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center px-6 py-1.5 rounded-full text-xs font-semibold bg-[#0a0a0a] text-white border border-[#0a0a0a] dark:bg-white dark:text-[#0a0a0a] dark:border-white hover:bg-transparent hover:text-[#0a0a0a] dark:hover:bg-transparent dark:hover:text-white transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          >
            <span>Launch</span>
          </a>
        )}
        <span className="font-mono text-[10px] tracking-widest text-[#999] dark:text-[#777] group-hover:text-[#0a0a0a] dark:group-hover:text-[#f2f2f2] transition-colors duration-300 ml-auto">
          Specs →
        </span>
      </div>
    </motion.div>
  );
});

export default memo(function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "ALL", label: "All Works" },
    { id: "APP", label: "Desktop & Mobile" },
    { id: "WEB", label: "Web Tools & Utilities" },
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory =
      activeFilter === "ALL" ||
      (activeFilter === "APP" && (proj.badge === "APP" || proj.badge === "DESKTOP & APK" || proj.badge === "APP & WEB" || proj.type?.includes("DESKTOP") || proj.badge?.includes("APP") || proj.badge?.includes("APK"))) ||
      (activeFilter === "WEB" && (proj.badge === "SITE" || proj.badge === "WEB/APP" || proj.badge === "APP & WEB" || proj.type?.includes("WEB") || proj.badge?.includes("SITE")));

    const matchesSearch =
      !searchQuery.trim() ||
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const novaDL = PROJECTS.find((p) => p.name === "NovaDL");
  const otherProjects = filteredProjects.filter((p) => p.name !== "NovaDL" || activeFilter !== "ALL" || searchQuery);

  return (
    <>
      <div id="projects" className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-8 animate-section flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan mb-3 inline-block">Crafted Index</span>
          <h2 className="font-semibold text-4xl lg:text-5xl tracking-tight text-[#0a0a0a] dark:text-[#f2f2f2]">Featured Work &amp; Tools</h2>
        </div>

        <div className="font-mono text-xs text-[#888] tracking-widest">
          [{filteredProjects.length} SHIPPED BUILDS]
        </div>
      </div>

      {/* ── Filter Tabs & Search Bar ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {filters.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager?.playClick?.();
                  setActiveFilter(tab.id);
                }}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-colors duration-200 whitespace-nowrap border ${
                  isActive
                    ? 'border-cyan/40 text-cyan font-bold'
                    : 'border-[#e8e8e8] dark:border-white/10 text-[#666] dark:text-[#999] hover:text-[#0a0a0a] dark:hover:text-[#f2f2f2]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-cyan/10 dark:bg-cyan/15 rounded-md border border-cyan/50 shadow-[0_0_16px_rgba(0,194,209,0.2)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Filter by name, tech, or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-9 font-mono text-xs border border-[#e8e8e8] dark:border-white/15 bg-white dark:bg-[#111114] text-[#0a0a0a] dark:text-white rounded-md focus:border-cyan focus:outline-none transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#888]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* ── Asymmetric Bento Grid Showcase ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 mb-12">
        {/* NovaDL Flagship Bento Hero (Shown on All Works when not actively searching) */}
        {activeFilter === "ALL" && !searchQuery && novaDL && (
          <div className="mb-6 p-6 sm:p-8 rounded-2xl border border-violet/30 dark:border-violet/20 bg-gradient-to-br from-white via-white to-violet/[0.04] dark:from-[#111114] dark:via-[#111114] dark:to-violet/[0.06] shadow-sm relative overflow-hidden group">
            {/* Top accent glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet to-transparent opacity-80" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{novaDL.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-2xl text-[#0a0a0a] dark:text-[#f2f2f2]">{novaDL.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet/15 text-violet border border-violet/30">
                        FLAGSHIP APP
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#777]">Windows Desktop &amp; Android APK</span>
                  </div>
                </div>

                <p className="text-sm text-[#555] dark:text-[#aaa] leading-relaxed mb-6">
                  {novaDL.desc}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {novaDL.features.slice(0, 4).map((f, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 text-[#444] dark:text-[#ccc]">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={novaDL.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-violet hover:bg-violet/90 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet/20 flex items-center gap-2"
                  >
                    <span>Launch NovaDL</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>

                  <button
                    onClick={() => setActiveProject(novaDL)}
                    className="px-4 py-2.5 rounded-lg border border-[#0a0a0a]/15 dark:border-white/15 hover:border-violet text-xs font-mono text-[#666] dark:text-[#aaa] hover:text-[#0a0a0a] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    View System Specs →
                  </button>
                </div>
              </div>

              {/* Right Interactive Mock Engine Visualizer */}
              <div className="lg:col-span-5 p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/40 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10 text-[11px] text-[#777]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>WASM_WORKER_ENGINE</span>
                  </span>
                  <span>16 THREADS ACTIVE</span>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div>
                    <div className="flex justify-between text-[#666] dark:text-[#aaa] mb-1">
                      <span>Chunk Splitting (64MB blocks)</span>
                      <span className="text-violet font-semibold">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-violet rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#666] dark:text-[#aaa] mb-1">
                      <span>HLS Stream Demux &amp; Assembler</span>
                      <span className="text-cyan font-semibold">Ready</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-cyan rounded-full"></div>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-[#777] dark:text-[#888] flex items-center justify-between">
                    <span>SQLite WASM Persistence</span>
                    <span className="text-emerald-500 font-bold">SYNCHRONIZED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {(activeFilter === "ALL" && !searchQuery ? otherProjects : filteredProjects).map((project, idx) => (
              <Card
                key={project.name}
                project={project}
                idx={idx}
                onOpenDetails={setActiveProject}
                borderClasses="rounded-xl border border-[#e8e8e8] dark:border-white/10 shadow-sm"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => {
              soundManager?.playClick?.();
              setActiveProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});
