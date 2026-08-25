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

      // 1. Dark Rounded Background Container
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.roundRect(2, 2, 60, 60, 14);
      ctx.fill();

      // 2. Subtle Border Glow
      ctx.strokeStyle = `rgba(0, 194, 209, ${0.15 + pulse * 0.25})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Define standard S-Curve Path
      const buildSPath = () => {
        ctx.beginPath();
        ctx.moveTo(44, 23);
        ctx.bezierCurveTo(44, 16.5, 38.5, 14, 32, 14);
        ctx.bezierCurveTo(24.5, 14, 19.5, 17.5, 19.5, 23);
        ctx.bezierCurveTo(19.5, 29.5, 26, 30.5, 32, 32);
        ctx.bezierCurveTo(38.5, 33.5, 44.5, 35, 44.5, 41);
        ctx.bezierCurveTo(44.5, 46.5, 39, 50, 32, 50);
        ctx.bezierCurveTo(24.5, 50, 19.5, 45.5, 19.5, 40);
      };

      // 3. Layer A: Dim Base 'S' Track
      ctx.save();
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(0, 194, 209, 0.25)';
      buildSPath();
      ctx.stroke();
      ctx.restore();

      // 4. Layer B: Moving Glowing Laser Energy Beam traveling through the 'S'
      ctx.save();
      ctx.lineWidth = 6.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([32, 48]);
      ctx.lineDashOffset = -step * 18; // Smooth continuous motion along curve
      
      // Dynamic electric cyan/lime color shift
      const hue = 175 + Math.sin(step * 0.5) * 25; // Shifts between cyan & emerald
      ctx.strokeStyle = `hsl(${hue}, 100%, 65%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 55%)`;
      ctx.shadowBlur = 9;

      buildSPath();
      ctx.stroke();
      ctx.restore();

      // 5. Expanding Radar Wave Ring & Status Dot
      const radarRadius = 3.5 + pulse * 4.5;
      const radarOpacity = (1 - pulse) * 0.85;

      ctx.beginPath();
      ctx.arc(50, 13, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(62, 240, 124, ${radarOpacity})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(50, 13, 3.8, 0, Math.PI * 2);
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
