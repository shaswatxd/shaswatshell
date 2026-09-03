"use client";

import React, { useState, useEffect, useRef, memo } from 'react';
import { soundManager } from '../utils/SoundManager';

const MODES = [
  {
    id: 'novadl',
    label: 'NovaDL Worker Engine',
    short: 'NOVADL',
    icon: '📥',
    color: '#8b6bff',
    accent: 'violet',
    speedLabel: '142.8 MB/s',
    subtext: '16 Worker-Threads • SQLite WASM Chunk Splitting',
    stats: [
      { label: 'WORKERS', value: '16 THREADS' },
      { label: 'THROUGHPUT', value: '142.8 MB/s' },
      { label: 'CHUNKS', value: '32/32 SYNCED' },
      { label: 'STATE', value: 'WASM PERSISTED' },
    ]
  },
  {
    id: 'udbr',
    label: '120 FPS GPU Mirror',
    short: 'UDBR SUITE',
    icon: '⚡',
    color: '#00c2d1',
    accent: 'cyan',
    speedLabel: '120.0 FPS',
    subtext: 'Scrcpy Hardware Acceleration • ~12ms Ultra-Low Latency',
    stats: [
      { label: 'REFRESH', value: '120 HZ LOCKED' },
      { label: 'LATENCY', value: '12.4 MS' },
      { label: 'PIPELINE', value: 'GPU HARDWARE' },
      { label: 'TELEMETRY', value: 'ZERO CLOUD' },
    ]
  },
  {
    id: 'weplays',
    label: 'Audio DSP Engine',
    short: 'WE PLAYS',
    icon: '🎵',
    color: '#3ef07c',
    accent: 'emerald',
    speedLabel: '320 KBPS',
    subtext: 'Lossless Audio Demuxer • Dynamic Equalizer Spectrum',
    stats: [
      { label: 'BITRATE', value: '320 KBPS FLAC' },
      { label: 'CHANNELS', value: 'STEREO 48KHZ' },
      { label: 'DYNAMIC FX', value: 'REAL-TIME' },
      { label: 'CACHE', value: 'LOCAL SQLITE' },
    ]
  }
];

const HeroEngineVisualizer = memo(function HeroEngineVisualizer() {
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [boostActive, setBoostActive] = useState(false);
  const [fps, setFps] = useState(60);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Measure Real Client FPS
  useEffect(() => {
    let count = 0;
    let lastTime = performance.now();
    let frameId;

    const tick = (now) => {
      count++;
      if (now - lastTime >= 500) {
        setFps(Math.min(144, Math.max(30, Math.round((count * 1000) / (now - lastTime)))));
        count = 0;
        lastTime = now;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // 60-120 FPS Live Hardware Visualizer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.offsetWidth === 0) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * 1.5);
    let height = (canvas.height = canvas.offsetHeight * 1.5);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 1.5;
      height = canvas.height = canvas.offsetHeight * 1.5;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes & data wave lines
    const packets = [];
    const threadCount = 14;

    for (let i = 0; i < 28; i++) {
      packets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: (Math.random() * 2.5 + 1.2) * (boostActive ? 2.2 : 1),
        thread: Math.floor(Math.random() * threadCount),
        size: Math.random() * 2.5 + 1.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      if (activeMode.id === 'novadl') {
        // NovaDL: Multi-threaded pipeline conduits & travelling byte blocks
        const rowHeight = height / (threadCount + 1);

        for (let i = 0; i < threadCount; i++) {
          const y = (i + 1) * rowHeight;

          // Rail line
          ctx.beginPath();
          ctx.moveTo(20, y);
          ctx.lineTo(width - 20, y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Active thread progress bar
          const threadProgress = ((Math.sin(frame * 0.04 + i) + 1) / 2) * (width - 60);
          ctx.beginPath();
          ctx.moveTo(20, y);
          ctx.lineTo(20 + threadProgress, y);
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(139, 107, 255, 0.45)' : 'rgba(0, 194, 209, 0.45)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        // Animated byte packets streaming through threads
        packets.forEach((p) => {
          p.x += p.speed * (boostActive ? 2.4 : 1.2);
          if (p.x > width - 20) p.x = 20;

          const y = (p.thread + 1) * rowHeight;

          ctx.beginPath();
          ctx.arc(p.x, y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.thread % 2 === 0 ? '#8b6bff' : '#00c2d1';
          ctx.shadowBlur = boostActive ? 8 : 4;
          ctx.shadowColor = p.thread % 2 === 0 ? '#8b6bff' : '#00c2d1';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (activeMode.id === 'udbr') {
        // UDBR: 120 FPS GPU Screen Mirroring Wave & Sync Grids
        const centerY = height / 2;

        // Radar/Frame pulse circle
        const pulseR = (frame * (boostActive ? 3.5 : 2.0)) % (width * 0.45);
        ctx.beginPath();
        ctx.arc(width / 2, centerY, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 194, 209, ${Math.max(0, 1 - pulseR / (width * 0.45)) * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // High-frequency GPU frame scanlines
        ctx.beginPath();
        for (let x = 0; x < width; x += 12) {
          const wave = Math.sin(x * 0.02 + frame * (boostActive ? 0.15 : 0.08)) * 36;
          const wave2 = Math.cos(x * 0.015 - frame * 0.05) * 20;
          const y = centerY + wave + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#00c2d1';
        ctx.lineWidth = 2.4;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00c2d1';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Target center reticle
        ctx.beginPath();
        ctx.arc(width / 2, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#00c2d1';
        ctx.fill();
      } else {
        // WePlays: Dynamic Audio Equalizer DSP Spectrum
        const barCount = 32;
        const barWidth = (width - 40) / barCount;

        for (let i = 0; i < barCount; i++) {
          const freq = Math.sin(i * 0.35 + frame * (boostActive ? 0.14 : 0.07));
          const freq2 = Math.cos(i * 0.18 + frame * 0.05);
          const barHeight = Math.max(12, Math.abs(freq + freq2) * (height * 0.38));

          const x = 20 + i * barWidth;
          const y = height - barHeight - 16;

          const grad = ctx.createLinearGradient(0, height, 0, y);
          grad.addColorStop(0, 'rgba(62, 240, 124, 0.2)');
          grad.addColorStop(1, '#3ef07c');

          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth - 4, barHeight);

          // Equalizer peak cap
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y - 4, barWidth - 4, 2);
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMode, boostActive]);

  const handleBoost = () => {
    soundManager?.playClick?.();
    setBoostActive(true);
    setTimeout(() => setBoostActive(false), 2200);
  };

  const handleModeChange = (mode) => {
    soundManager?.playClick?.();
    setActiveMode(mode);
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#0a0a0a]/15 dark:border-white/15 bg-white/95 dark:bg-[#0c0c11] backdrop-blur-md overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-xl transition-all duration-300">
      {/* Top Header & Telemetry Status */}
      <div className="flex flex-col gap-3 pb-3 border-b border-[#0a0a0a]/10 dark:border-white/10 select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: activeMode.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: activeMode.color }}
              />
            </span>
            <span className="font-mono text-xs font-bold tracking-wider text-[#0a0a0a] dark:text-[#f2f2f2]">
              SYSTEM_KERNEL // {activeMode.short}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              {fps} FPS
            </span>
            <span className="text-cyan font-bold">
              {boostActive ? '⚡ 2.5x BOOST' : 'LIVE'}
            </span>
          </div>
        </div>

        {/* Interactive Mode Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg border border-black/5 dark:border-white/5">
          {MODES.map((m) => {
            const isActive = activeMode.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeChange(m)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#1a1a24] text-[#0a0a0a] dark:text-white shadow-sm border border-black/10 dark:border-white/15'
                    : 'text-[#666] dark:text-[#888] hover:text-[#0a0a0a] dark:hover:text-white'
                }`}
              >
                <span>{m.icon}</span>
                <span className="truncate">{m.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Visualizer Area */}
      <div className="relative w-full h-[180px] sm:h-[210px] my-2 overflow-hidden rounded-xl bg-black/[0.02] dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Floating Speed Overlay */}
        <div className="absolute top-3 right-3 pointer-events-none flex flex-col items-end">
          <span
            className="font-mono text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color: activeMode.color }}
          >
            {boostActive ? (activeMode.id === 'novadl' ? '348.4 MB/s' : activeMode.speedLabel) : activeMode.speedLabel}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#777]">
            Active Throughput
          </span>
        </div>

        {/* Center Mode Description Tag */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="font-mono text-[10px] text-[#888] dark:text-[#aaa] bg-black/30 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
            {activeMode.subtext}
          </span>
        </div>
      </div>

      {/* Bottom Live Telemetry Metrics & Boost Action */}
      <div className="pt-2 border-t border-[#0a0a0a]/10 dark:border-white/10 font-mono text-[10px]">
        {/* 4 Real-time Spec Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {activeMode.stats.map((stat, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5"
            >
              <div className="text-[9px] text-[#777] uppercase tracking-wider">{stat.label}</div>
              <div className="font-semibold text-[#0a0a0a] dark:text-[#f2f2f2] truncate">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Boost Trigger Button */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-[#777] hidden sm:inline">
            Click to stress-test throughput acceleration
          </span>

          <button
            onClick={handleBoost}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              boostActive
                ? 'bg-cyan text-black shadow-[0_0_16px_rgba(0,194,209,0.4)]'
                : 'bg-[#0a0a0a] text-white dark:bg-white dark:text-black hover:opacity-90'
            }`}
          >
            <span>{boostActive ? '⚡ ACCELERATING...' : '🚀 BOOST ENGINE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default HeroEngineVisualizer;
