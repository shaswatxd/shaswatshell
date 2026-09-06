"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "srijankumardeo777@gmail.com";

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  return (
    <>
      <motion.div
        id="contact"
        className="max-w-[1000px] mx-auto px-6 lg:px-16 py-20 relative"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan mb-4 inline-block">
            Let&apos;s Connect
          </span>
          <h2 className="font-semibold text-4xl lg:text-6xl tracking-tight mb-6 leading-[1.05] text-[#0a0a0a] dark:text-[#f2f2f2]">
            Got a build in mind?<br />Let&apos;s ship it.
          </h2>
          <p className="text-[#555] dark:text-[#aaa] max-w-md mx-auto mb-8 text-sm sm:text-base">
            Have an idea, collaboration, or a technical challenge? Drop me a mail directly.
          </p>

          {/* Interactive Email Action Dock */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${email}`}
              className="px-6 py-3.5 rounded-lg bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] font-semibold text-xs uppercase tracking-wider hover:bg-cyan dark:hover:bg-cyan dark:hover:text-[#0a0a0a] transition-all shadow-md flex items-center gap-2"
            >
              <span>Send Email Directly</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <button
              onClick={handleCopy}
              className="px-5 py-3.5 rounded-lg border border-[#0a0a0a]/20 dark:border-white/20 hover:border-cyan text-xs font-mono text-[#444] dark:text-[#ccc] hover:text-[#0a0a0a] dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{copied ? "✓ Copied Email" : email}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Cyberpunk HUD Action Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-full border border-cyan/40 bg-[#0d0d12]/90 dark:bg-[#0a0a0f]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,194,209,0.3)] flex items-center gap-2.5 text-xs font-mono text-white select-none pointer-events-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
            </span>
            <span className="text-cyan font-bold tracking-wider">[SYSTEM]</span>
            <span className="text-[#ccc]">Email copied:</span>
            <span className="text-emerald-400 font-medium">{email}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
