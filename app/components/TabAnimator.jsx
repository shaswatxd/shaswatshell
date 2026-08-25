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

      step += 0.08;
      const pulse = (Math.sin(step) + 1) / 2; // Smooth 0 to 1 wave
      const radarRadius = 4 + pulse * 4;
      const radarOpacity = (1 - pulse) * 0.8;

      ctx.clearRect(0, 0, 64, 64);

      // 1. Dark Rounded Background Container
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.roundRect(2, 2, 60, 60, 14);
      ctx.fill();

      // 2. Subtle Border Glow
      ctx.strokeStyle = `rgba(0, 194, 209, ${0.2 + pulse * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Neon Glowing 'S' Path
      ctx.save();
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = pulse > 0.5 ? '#00f0ff' : '#00c2d1';
      ctx.shadowColor = '#00c2d1';
      ctx.shadowBlur = 6 + pulse * 6;

      ctx.beginPath();
      // Scaling SVG path points: (M22 11.5 ... M10 20.5) scaled 2x to fit 64x64
      ctx.moveTo(44, 23);
      ctx.bezierCurveTo(44, 17, 39, 14, 32, 14);
      ctx.bezierCurveTo(25, 14, 20, 17, 20, 23);
      ctx.bezierCurveTo(20, 29, 26, 30.4, 32, 32);
      ctx.bezierCurveTo(38, 33.6, 44, 35, 44, 41);
      ctx.bezierCurveTo(44, 46, 39, 50, 32, 50);
      ctx.bezierCurveTo(25, 50, 20, 46, 20, 41);
      ctx.stroke();
      ctx.restore();

      // 4. Expanding Radar Wave Ring
      ctx.beginPath();
      ctx.arc(50, 14, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(62, 240, 124, ${radarOpacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Bright Live Status Dot
      ctx.beginPath();
      ctx.arc(50, 14, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#3ef07c';
      ctx.shadowColor = '#3ef07c';
      ctx.shadowBlur = 8;
      ctx.fill();

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
