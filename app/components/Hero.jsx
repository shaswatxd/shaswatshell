"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Magnetic Wrapper for Interactive Buttons
function MagneticButton({ children }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = `translate3d(0px, 0px, 0)`;
    btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  };

  const handleMouseEnter = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transition = 'none';
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}

// Click Ripple Animation Handler
function triggerRipple(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');

  const existingRipple = btn.getElementsByClassName('ripple')[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  btn.appendChild(circle);

  setTimeout(() => {
    if (circle && circle.parentNode) {
      circle.remove();
    }
  }, 650);
}

import { PROJECTS } from '../data/projects';

const FEATURED_PROJECTS = PROJECTS.filter((p) =>
  ["NovaDL", "We Plays", "UDBR Suite", "Gaming Firewall", "BirthdayMagic", "OmniDownloader", "Bill Generator"].includes(p.name)
);

const Hero = React.memo(function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.header
      id="top"
      className="relative px-6 lg:px-16 pt-6 sm:pt-8 pb-10 sm:pb-12 max-w-[1440px] mx-auto overflow-hidden flex flex-col justify-between min-h-[82vh] sm:min-h-[calc(100vh-80px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full">
        {/* Typography & CTAs Layer */}
        <div className="max-w-3xl">
          {/* Live Developer Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0a0a0a]/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] mb-4 sm:mb-4 text-xs font-mono select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#444] dark:text-[#ccc]">
              India • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for Work</span>
            </span>
          </div>

          {/* Main Heading with Authentic Design Engineer Tone */}
          <h1 className="font-semibold tracking-tight leading-[1.04] text-4xl sm:text-5xl lg:text-[72px] text-[#0a0a0a] dark:text-[#f2f2f2] select-none">
            <div className="block py-0.5">
              Tools, Systems &amp;
            </div>
            <div className="block py-0.5">
              Experiments That
            </div>
            <div className="block py-0.5 text-cyan">
              Actually Ship.
            </div>
          </h1>

          {/* Subtext description with authentic builder voice */}
          <motion.p
            className="mt-3.5 sm:mt-4 max-w-xl text-sm sm:text-base text-[#555] dark:text-[#aaa] leading-relaxed"
            variants={itemVariants}
          >
            I build fast desktop apps, automated download engines, and client-side web tools. No corporate fluff — just clean code, real users, and high-performance craft.
          </motion.p>

          {/* CTA Buttons with Magnetic wraps and click ripples */}
          <motion.div
            className="mt-5 sm:mt-6 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={triggerRipple}
                className="ripple-container btn-primary inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 font-semibold text-xs uppercase tracking-wider text-white rounded-lg shadow-lg shadow-cyan/10 hover:shadow-cyan/25 transition-all"
              >
                Explore All Projects
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                onClick={triggerRipple}
                className="ripple-container btn-outline inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 font-medium text-xs uppercase tracking-wider text-[#0a0a0a] dark:text-white rounded-lg"
              >
                Get In Touch
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ─── Instant Project Quick-Dock (Continuous Infinite Marquee Ribbon) ─── */}
        <motion.div 
          className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#e8e8e8] dark:border-white/10 w-full"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#0a0a0a] dark:text-[#f2f2f2]">
                Featured Live Ships
              </span>
            </div>

            <span className="font-mono text-[11px] text-[#888] dark:text-[#777]">
              Live Stream ⚡
            </span>
          </div>

          {/* Endless Smooth Gliding Project Marquee */}
          <div className="relative overflow-hidden w-full group select-none -mx-6 px-6 lg:-mx-16 lg:px-16 py-1">
            {/* Gradient Edge Masks for soft fade */}
            <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max">
              <div className="flex project-marquee will-change-transform gap-3.5 pr-3.5">
                {FEATURED_PROJECTS.map((p, idx) => (
                  <a
                    key={`p1-${idx}`}
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/card relative flex-shrink-0 w-[260px] sm:w-[285px] p-3.5 sm:p-4 rounded-xl border bg-white/95 dark:bg-[#111113] ${p.borderClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between select-none min-h-[136px] sm:min-h-[142px] shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg sm:text-xl flex-shrink-0">{p.icon}</span>
                          <span className="font-semibold text-xs sm:text-sm text-[#0a0a0a] dark:text-[#f2f2f2] group-hover/card:text-cyan transition-colors truncate">
                            {p.name}
                          </span>
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${p.badgeClass}`}>
                          {p.type || p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#555] dark:text-[#999] leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan font-medium">
                      <span className="group-hover/card:underline">Launch Live</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </a>
                ))}

                {/* Duplicated half for 100% seamless infinite loop */}
                {FEATURED_PROJECTS.map((p, idx) => (
                  <a
                    key={`p2-${idx}`}
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    className={`group/card relative flex-shrink-0 w-[260px] sm:w-[285px] p-3.5 sm:p-4 rounded-xl border bg-white/95 dark:bg-[#111113] ${p.borderClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between select-none min-h-[136px] sm:min-h-[142px] shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg sm:text-xl flex-shrink-0">{p.icon}</span>
                          <span className="font-semibold text-xs sm:text-sm text-[#0a0a0a] dark:text-[#f2f2f2] group-hover/card:text-cyan transition-colors truncate">
                            {p.name}
                          </span>
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${p.badgeClass}`}>
                          {p.type || p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#555] dark:text-[#999] leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan font-medium">
                      <span className="group-hover/card:underline">Launch Live</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>


          </div>
        </motion.div>
      </div>
    </motion.header>
  );
});

export default Hero;





