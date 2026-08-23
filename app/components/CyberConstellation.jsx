"use client";

import React, { useEffect, useRef } from 'react';

export default function CyberConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Handle high-performance resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Node particle configuration
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile 
      ? Math.min(30, Math.floor(window.innerWidth / 14)) 
      : Math.min(55, Math.floor(window.innerWidth / 28));

    const colors = ['#00c2d1', '#8b6bff', '#ff3d9a', '#00f0ff'];

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
      vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
      radius: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.3,
    }));

    // Mouse / Touch cursor tracking
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

    // Handle tab visibility to sleep render loop when inactive
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxLinkDistance = isMobile ? 100 : 135;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cyber glows in background
      const ambient1 = ctx.createRadialGradient(
        width * 0.45, height * 0.25, 10,
        width * 0.45, height * 0.25, width * 0.65
      );
      ambient1.addColorStop(0, 'rgba(0, 194, 209, 0.065)');
      ambient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambient1;
      ctx.fillRect(0, 0, width, height);

      const ambient2 = ctx.createRadialGradient(
        width * 0.75, height * 0.65, 10,
        width * 0.75, height * 0.65, width * 0.55
      );
      ambient2.addColorStop(0, 'rgba(139, 107, 255, 0.055)');
      ambient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambient2;
      ctx.fillRect(0, 0, width, height);

      // Draw laser links between nearby constellation nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const lineAlpha = (1 - dist / maxLinkDistance) * 0.2;
            ctx.strokeStyle = `rgba(0, 194, 209, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw floating nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Soft magnetic drift towards cursor if nearby
        if (isCursorActive) {
          const cdx = cursorX - node.x;
          const cdy = cursorY - node.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 150 && cdist > 5) {
            node.x += (cdx / cdist) * 0.22;
            node.y += (cdy / cdist) * 0.22;
          }
        }

        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Render glowing circular node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

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
    />
  );
}
