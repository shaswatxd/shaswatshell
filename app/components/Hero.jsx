"use client";

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

// Reusable Magnetic component using GSAP for smooth physics
function MagneticButton({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Pull toward mouse (magnetic strength 0.35)
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Elastic rebound to original position
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)"
      });
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className="magnetic-container">
      {children}
    </div>
  );
}

// Custom click ripple effect handler
const triggerRipple = (e) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  // Ripple diameter covering the button diagonals
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;

  btn.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 700);
};

const Hero = React.memo(function Hero() {
  // Motion variants
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
      className="relative px-6 lg:px-16 pt-2 sm:pt-6 pb-12 sm:pb-20 max-w-[1440px] mx-auto overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 z-10">
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

        {/* Right Column: Interactive 3D WebGL Canvas */}
        <motion.div 
          className="lg:col-span-5 relative flex items-center justify-center mt-2 lg:mt-0"
          variants={itemVariants}
        >
          <Hero3D />
        </motion.div>
      </div>
    </motion.header>
  );
});

export default Hero;
