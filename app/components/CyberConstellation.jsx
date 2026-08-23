"use client";

import React, { useEffect, useRef } from 'react';

export default function CyberConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isVisible = true;

    // High-DPI scaling
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Node configuration
    const isMobile = width < 768;
    const nodeCount = isMobile ? 28 : 55;

    const colors = ['#00c2d1', '#8b6bff', '#ff3d9a', '#00f0ff'];

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
      vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
      radius: Math.random() * 2.0 + 1.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.5,
    }));

    // Cursor tracking
    let cursorX = -1000;
    let cursorY = -1000;
    let isCursorActive = false;

    const handleMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      isCursorActive = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        cursorX = e.touches[0].clientX;
        cursorY = e.touches[0].clientY;
        isCursorActive = true;
      }
    };

    const handleMouseLeave = () => {
      isCursorActive = false;
      cursorX = -1000;
      cursorY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Sleep when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxLinkDistance = isMobile ? 100 : 145;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cyber backdrops
      const ambient1 = ctx.createRadialGradient(
        width * 0.45, height * 0.25, 10,
        width * 0.45, height * 0.25, width * 0.65
      );
      ambient1.addColorStop(0, 'rgba(0, 194, 209, 0.08)');
      ambient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambient1;
      ctx.fillRect(0, 0, width, height);

      const ambient2 = ctx.createRadialGradient(
        width * 0.8, height * 0.65, 10,
        width * 0.8, height * 0.65, width * 0.55
      );
      ambient2.addColorStop(0, 'rgba(139, 107, 255, 0.07)');
      ambient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambient2;
      ctx.fillRect(0, 0, width, height);

      // ─── BATCHED LASER LINK RENDERING (Single GPU draw call) ─────────────
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 194, 209, 0.25)';
      ctx.lineWidth = 0.85;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
      }
      ctx.stroke();

      // ─── UPDATE & RENDER NODES ──────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (isCursorActive) {
          const cdx = cursorX - node.x;
          const cdy = cursorY - node.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 170 && cdist > 5) {
            node.x += (cdx / cdist) * 0.3;
            node.y += (cdy / cdist) * 0.3;
          }
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
