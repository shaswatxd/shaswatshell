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
  ["NovaDL", "We Plays", "BirthdayMagic", "OmniDownloader", "Bill Generator"].includes(p.name)
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
      className="relative px-6 lg:px-16 pt-6 sm:pt-12 pb-16 sm:pb-24 max-w-[1440px] mx-auto overflow-hidden min-h-[80vh] flex items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full">
        {/* Typography & CTAs Layer */}
        <div className="max-w-3xl">
          {/* Main Heading with Clean, High-Performance Typography */}
          <h1 className="font-semibold tracking-tight leading-[1.04] text-4xl sm:text-6xl lg:text-[84px] text-[#0a0a0a] dark:text-[#f2f2f2] select-none">
            <div className="block py-0.5">
              Everything I&apos;m
            </div>
            <div className="block py-0.5">
              Building, Shipping,
            </div>
            <div className="block py-0.5 text-cyan">
              Breaking.
            </div>
          </h1>

          {/* Subtext description */}
          <motion.p
            className="mt-4 sm:mt-8 max-w-xl text-sm sm:text-base lg:text-lg text-[#555] dark:text-[#aaa] leading-relaxed"
            variants={itemVariants}
          >
            A live index of projects, repos, and experiments — from <span className="text-[#0a0a0a] dark:text-[#f2f2f2] font-medium">desktop apps</span> to <span className="text-[#0a0a0a] dark:text-[#f2f2f2] font-medium">web tools</span>. Updated as things ship, not as a resume.
          </motion.p>

          {/* CTA Buttons with Magnetic wraps and click ripples */}
          <motion.div
            className="mt-5 sm:mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={triggerRipple}
                className="ripple-container btn-primary inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-white rounded-lg shadow-lg shadow-cyan/10 hover:shadow-cyan/25 transition-all"
              >
                Explore All Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                onClick={triggerRipple}
                className="ripple-container btn-outline inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 font-medium text-[11px] sm:text-xs uppercase tracking-wider text-[#0a0a0a] dark:text-white rounded-lg"
              >
                Get In Touch
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ─── Instant Project Quick-Dock (Continuous Infinite Marquee Ribbon) ─── */}
        <motion.div 
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#e8e8e8] dark:border-white/10 w-full"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#0a0a0a] dark:text-[#f2f2f2]">
                Featured Live Ships
              </span>
            </div>

            <span className="font-mono text-[11px] text-[#888] dark:text-[#777]">
              Live Stream ⚡ Hover to pause
            </span>
          </div>

          {/* Endless Smooth Gliding Project Marquee */}
          <div className="relative overflow-hidden w-full group select-none -mx-6 px-6 lg:-mx-16 lg:px-16 py-2">
            {/* Gradient Edge Masks for soft fade */}
            <div className="absolute left-0 inset-y-0 w-10 sm:w-24 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-10 sm:w-24 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max">
              <div className="flex project-marquee will-change-transform gap-4 pr-4">
                {FEATURED_PROJECTS.map((p, idx) => (
                  <a
                    key={`p1-${idx}`}
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/card relative flex-shrink-0 w-[270px] sm:w-[310px] p-4 rounded-xl border bg-white/95 dark:bg-[#111113] ${p.borderClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between select-none min-h-[148px] shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl flex-shrink-0">{p.icon}</span>
                          <span className="font-semibold text-sm text-[#0a0a0a] dark:text-[#f2f2f2] group-hover/card:text-cyan transition-colors truncate">
                            {p.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${p.badgeClass}`}>
                          {p.type || p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#555] dark:text-[#999] leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan font-medium">
                      <span className="group-hover/card:underline">Launch Live</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
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
                    className={`group/card relative flex-shrink-0 w-[270px] sm:w-[310px] p-4 rounded-xl border bg-white/95 dark:bg-[#111113] ${p.borderClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between select-none min-h-[148px] shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl flex-shrink-0">{p.icon}</span>
                          <span className="font-semibold text-sm text-[#0a0a0a] dark:text-[#f2f2f2] group-hover/card:text-cyan transition-colors truncate">
                            {p.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${p.badgeClass}`}>
                          {p.type || p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#555] dark:text-[#999] leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan font-medium">
                      <span className="group-hover/card:underline">Launch Live</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
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





