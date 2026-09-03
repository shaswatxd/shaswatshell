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
      this.initCtx();
      this.playSuccess();
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playBeep(freq = 440, duration = 0.05, type = 'sine', gainVal = 0.08) {
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
    this.playBeep(720, 0.05, 'triangle', 0.1);
  }

  playHover() {
    this.playBeep(420, 0.04, 'sine', 0.04);
  }

  playKeypress() {
    const freqs = [420, 480, 520, 580, 640];
    const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
    this.playBeep(randomFreq, 0.04, 'sine', 0.08);
  }

  playSuccess() {
    if (this.muted) return;
    this.playBeep(523.25, 0.09, 'sine', 0.1); // C5
    setTimeout(() => this.playBeep(659.25, 0.09, 'sine', 0.1), 90); // E5
    setTimeout(() => this.playBeep(783.99, 0.14, 'sine', 0.1), 180); // G5
  }

  playMatrix() {
    if (this.muted) return;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.playBeep(300 + i * 120, 0.05, 'sawtooth', 0.06);
      }, i * 60);
    }
  }
}

export const soundManager = new SoundFX();
