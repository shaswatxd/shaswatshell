"use client";

import { useEffect } from 'react';

/**
 * TabAnimator: Ultra-smooth, high-precision Canvas Favicon & Tab Title Animation.
 * - Renders a real-time living neon radar dot and glowing 'S' icon via offscreen canvas.
 * - Smooth sine-wave breathing pulse cycle (never stutters).
 * - Dynamic interactive status when tab is active vs blurred.
 */
export default function TabAnimator() {
  useEffect(() => {
    let animInterval;
    let titleInterval;
    let step = 0;

    // Find or create favicon link element
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Create offscreen 64x64 Retina canvas for ultra-crisp icon rendering
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Smooth Canvas Renderer Function
    const drawFrame = () => {
      if (document.hidden) return; // Save CPU when user is away

      step += 0.12;
      const pulse = (Math.sin(step * 0.7) + 1) / 2; // Smooth breathing pulse

      ctx.clearRect(0, 0, 64, 64);

      // 1. Dark Rounded Background Container (Exact match to site navbar icon)
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.roundRect(2, 2, 60, 60, 14);
      ctx.fill();

      // 2. Subtle Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Clean Normal 'S' Logo (Exact site path)
      ctx.save();
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#00c2d1';
      ctx.shadowColor = '#00c2d1';
      ctx.shadowBlur = 4 + pulse * 5;

      ctx.beginPath();
      ctx.moveTo(44, 23);
      ctx.bezierCurveTo(44, 17, 39, 14, 32, 14);
      ctx.bezierCurveTo(25, 14, 20, 17, 20, 23);
      ctx.bezierCurveTo(20, 29, 26, 30.4, 32, 32);
      ctx.bezierCurveTo(38, 33.6, 44, 35, 44, 41);
      ctx.bezierCurveTo(44, 46, 39, 50, 32, 50);
      ctx.bezierCurveTo(25, 50, 20, 46, 20, 41);
      ctx.stroke();
      ctx.restore();

      // Push canvas data URL directly to favicon
      link.href = canvas.toDataURL('image/png');
    };

    // Run ultra-smooth continuous animation loop (30 FPS for crisp browser tab updates with zero CPU drain)
    animInterval = setInterval(drawFrame, 65);

    // Dynamic Title Cycling
    const activeTitles = [
      "ShaswatShell ⚡ | Dev Console",
      "ShaswatShell 🟢 | Building & Shipping",
      "ShaswatShell 🚀 | NovaDL & Live Tools"
    ];
    const awayTitles = [
      "⚡ Come back & explore! | ShaswatShell",
      "👀 Still checking builds? | ShaswatShell",
      "📦 Real projects shipping | ShaswatShell"
    ];

    let activeIndex = 0;
    let awayIndex = 0;

    // Subtly cycle title status every 4 seconds
    const startActiveTitleCycle = () => {
      clearInterval(titleInterval);
      document.title = activeTitles[0];
      titleInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % activeTitles.length;
        document.title = activeTitles[activeIndex];
      }, 4000);
    };

    startActiveTitleCycle();

    // Tab Visibility Handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(titleInterval);
        document.title = awayTitles[0];
        titleInterval = setInterval(() => {
          awayIndex = (awayIndex + 1) % awayTitles.length;
          document.title = awayTitles[awayIndex];
        }, 2200);
      } else {
        clearInterval(titleInterval);
        document.title = "✨ Welcome Back! | ShaswatShell";
        setTimeout(startActiveTitleCycle, 1200);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(animInterval);
      clearInterval(titleInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
