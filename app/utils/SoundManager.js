// Native Web Audio API Sound Generator (Zero bundle overhead)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = true; // Muted by default for smooth UX
    
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sound_enabled');
        this.muted = saved !== 'true';
      } catch {
        this.muted = true;
      }
    }
  }

  initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('sound_enabled', (!this.muted).toString());
    } catch {}
    if (!this.muted) {
      this.playBeep(600, 0.05, 'sine');
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playBeep(freq = 440, duration = 0.05, type = 'sine', gainVal = 0.03) {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  playClick() {
    this.playBeep(800, 0.04, 'triangle', 0.04);
  }

  playHover() {
    this.playBeep(320, 0.03, 'sine', 0.015);
  }

  playKeypress() {
    const freqs = [400, 450, 480, 520, 560];
    const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
    this.playBeep(randomFreq, 0.03, 'sine', 0.02);
  }

  playSuccess() {
    if (this.muted) return;
    this.playBeep(523.25, 0.08, 'sine', 0.03); // C5
    setTimeout(() => this.playBeep(659.25, 0.08, 'sine', 0.03), 80); // E5
    setTimeout(() => this.playBeep(783.99, 0.12, 'sine', 0.03), 160); // G5
  }

  playMatrix() {
    if (this.muted) return;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.playBeep(300 + i * 120, 0.05, 'sawtooth', 0.02);
      }, i * 60);
    }
  }
}

export const soundManager = new SoundFX();
