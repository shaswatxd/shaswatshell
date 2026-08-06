"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic SSR-free import for WebGL Canvas
const Hero3D = dynamic(() => import('./Hero3D'), { 
  ssr: false,
  loading: () => null
});

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

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
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
      {/* Ambient HD 3D Cyber Cosmos Full Background */}
      <Hero3D />

      {/* Typography & CTAs Layer (z-10 relative) */}
      <div className="relative z-10 max-w-3xl">
        {/* Main Heading with Word-Safe Letter-by-Letter Animation & Hover Bounce */}
        <h1 className="font-semibold tracking-tight leading-[1.04] text-4xl sm:text-6xl lg:text-[84px] text-[#0a0a0a] dark:text-[#f2f2f2] select-none">
          <div className="flex flex-wrap py-0.5">
            {"Everything I'm".split(" ").map((word, wIdx) => (
              <span key={`w1-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, cIdx) => (
                  <motion.span
                    key={`c1-${wIdx}-${cIdx}`}
                    className="inline-block text-[#0a0a0a] dark:text-[#f2f2f2] hover:text-cyan transition-colors duration-200"
                    variants={letterVariants}
                    whileHover={{ 
                      y: -8, 
                      transition: { type: "spring", stiffness: 350, damping: 10 } 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap py-0.5">
            {"Building, Shipping,".split(" ").map((word, wIdx) => (
              <span key={`w2-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, cIdx) => (
                  <motion.span
                    key={`c2-${wIdx}-${cIdx}`}
                    className="inline-block text-[#0a0a0a] dark:text-[#f2f2f2] hover:text-cyan transition-colors duration-200"
                    variants={letterVariants}
                    whileHover={{ 
                      y: -8, 
                      transition: { type: "spring", stiffness: 350, damping: 10 } 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap py-0.5">
            {"Breaking.".split(" ").map((word, wIdx) => (
              <span key={`w3-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, cIdx) => (
                  <motion.span
                    key={`c3-${wIdx}-${cIdx}`}
                    className="inline-block text-cyan hover:text-cyan transition-colors duration-200"
                    variants={letterVariants}
                    whileHover={{ 
                      y: -8, 
                      transition: { type: "spring", stiffness: 350, damping: 10 } 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
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
          className="mt-5 sm:mt-10 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
          variants={itemVariants}
        >
          <MagneticButton>
            <a
              href="#projects"
              onClick={triggerRipple}
              className="ripple-container btn-primary inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-white rounded-lg shadow-lg shadow-cyan/10 hover:shadow-cyan/25 transition-all"
            >
              Explore Projects
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
    </motion.header>
  );
});

export default Hero;
