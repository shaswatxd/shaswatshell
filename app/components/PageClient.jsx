"use client";

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import BackgroundGrid from './BackgroundGrid';
import Navigation from './Navigation';
import Hero from './Hero';
import StatsStrip from './StatsStrip';
import WhatIBuild from './WhatIBuild';
import Projects from './Projects';
import Marquee from './Marquee';
import TechStack from './TechStack';
import Terminal from './Terminal';
import Accordions from './Accordions';
import Contact from './Contact';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import TabAnimator from './TabAnimator';

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Section divider — thin hairline, matches the bordered-grid minimal aesthetic
const SectionDivider = React.memo(function SectionDivider() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-16 my-4">
      <div className="h-px w-full bg-[#e8e8e8] dark:bg-white/15" />
    </div>
  );
});

const PageClient = React.memo(function PageClient() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global Keyboard shortcut listener (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    const handleCustomOpen = () => setPaletteOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    // Accessibility check
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMQ = () => {};
    mq.addEventListener("change", handleMQ, { passive: true });

    let lenis;
    let updateLenis;
    let handleAnchorClick;

    if (!mq.matches) {
      // Initialize Lenis smooth scroll with responsive 60/120Hz gliding
      lenis = new Lenis({
        duration: 0.75,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.0,
        syncTouch: false,
      });

      // Synchronize Lenis scroll positions with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Tell GSAP ticker to drive Lenis scroll loop cleanly (Single RAF driver)
      updateLenis = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);

      // Route in-page anchor links (#projects, #contact, etc.) through Lenis so
      // clicking a link doesn't kick off a second, competing native smooth-scroll.
      handleAnchorClick = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const id = anchor.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -90, duration: 1.1 });
      };
      document.addEventListener('click', handleAnchorClick);

      // Expose for components outside this effect's scope (e.g. Footer's "back to top")
      window.__lenis = lenis;
    }

    return () => {
      mq.removeEventListener("change", handleMQ);
      if (handleAnchorClick) document.removeEventListener('click', handleAnchorClick);
      if (lenis) {
        lenis.destroy();
        if (updateLenis) gsap.ticker.remove(updateLenis);
        if (window.__lenis === lenis) window.__lenis = null;
      }
    };
  }, []);

  // Handle staggered entry animations via ScrollTrigger
  useEffect(() => {
    // Scroll reveal sections
    const sections = gsap.utils.toArray('.animate-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Content wrapper */}
      <div id="main-content" className="relative w-full max-w-[100vw] overflow-x-clip bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <BackgroundGrid />
        <Navigation onOpenSearch={() => setPaletteOpen(true)} />
        <Hero />
        <StatsStrip />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <WhatIBuild />
        <SectionDivider />
        <Marquee />
        <TechStack />
        <SectionDivider />
        <Terminal />
        <SectionDivider />
        <Accordions />
        <SectionDivider />
        <Contact />
        <Footer />
      </div>

      {/* Spotlight Command Search Palette */}
      <CommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)} 
      />

      {/* Dynamic Browser Tab & Favicon Animator */}
      <TabAnimator />
    </>
  );
});

export default PageClient;
