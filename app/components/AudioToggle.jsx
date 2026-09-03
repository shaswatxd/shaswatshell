"use client";

import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/SoundManager';

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('sound_enabled');
      const isEnabled = saved === 'true';
      setEnabled(isEnabled);
      soundManager.muted = !isEnabled;
    } catch {
      setEnabled(false);
    }
  }, []);

  const handleToggle = () => {
    const isNowEnabled = soundManager.toggleMute();
    setEnabled(isNowEnabled);
  };

  if (!mounted) {
    return (
      <div className="w-[84px] h-[34px] rounded-lg border border-[#e8e8e8] dark:border-white/15 opacity-50" />
    );
  }

  return (
    <button
      onClick={handleToggle}
      title={enabled ? "Mute Sound Effects" : "Enable Sound Effects"}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 cursor-pointer select-none ${
        enabled
          ? 'border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_12px_rgba(0,194,209,0.18)]'
          : 'border-[#e8e8e8] dark:border-white/15 text-[#777] dark:text-[#999] hover:border-[#0a0a0a] dark:hover:border-white/30 hover:text-[#0a0a0a] dark:hover:text-white'
      }`}
    >
      <span className="text-sm leading-none">{enabled ? "🔊" : "🔇"}</span>
      <span className="font-semibold text-[11px] tracking-wider">SFX</span>
      
      {/* Dynamic Sound Wave Bars Animation */}
      {enabled ? (
        <div className="flex items-end gap-0.5 h-3 ml-0.5">
          <span className="w-0.5 bg-cyan rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
          <span className="w-0.5 bg-cyan rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2/3" />
          <span className="w-0.5 bg-cyan rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-4/5" />
        </div>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-[#999] dark:bg-[#666]" />
      )}
    </button>
  );
}
