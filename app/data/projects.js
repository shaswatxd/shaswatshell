export const PROJECTS = [
  {
    name: "NovaDL",
    desc: "A modern, high-performance multi-threaded download manager for Windows & Android (APK) built with Electron, React, and WASM. Features worker-thread chunk splitting, real HLS video stream downloading, crash-safe SQLite state persistence, and browser extension integration.",
    icon: "📥",
    glow: "violet",
    badge: "DESKTOP & APK",
    type: "DESKTOP & APK",
    featured: true,
    githubUrl: "https://github.com/shaswatxd/novadl",
    liveUrl: "https://novadl.vercel.app",
    badgeClass: "bg-violet/10 text-violet border-violet/20 dark:bg-violet/15 dark:text-violet",
    borderClass: "border-violet/30 hover:border-violet dark:border-violet/20 dark:hover:border-violet/80",
    features: [
      "⚡ Multi-Threaded Acceleration with Work-Stealing Workers",
      "📱 Cross-Platform Builds (Windows Desktop App & Android APK)",
      "🎥 Real HLS Video Downloader & Quality Stream Selection",
      "💾 Crash-Safe Resumable Engine (WASM SQLite Persistence)",
      "🧩 Browser Extension Integration (Chrome, Edge & Firefox)",
      "📅 Night Mode Scheduler, Speed Limiter & Auto-Shutdown",
      "🔒 Sandboxed IPC Architecture & Zero Telemetry Privacy"
    ],
    details: {
      architecture: "Cross-platform architecture powering Windows Desktop & Android APK editions. Features worker-thread byte-range splitting, WASM SQLite chunk state persistence, FFmpeg stream assembly, and Manifest V3 extension bridge.",
      modules: ["Worker-Thread Download Engine", "Android APK & Desktop Runtime", "HLS Stream Parser & Assembler", "WASM SQLite Persistence Layer", "Manifest V3 Extension Bridge", "Task Scheduler & Speed Limiter"]
    }
  },

  {
    name: "We Plays",
    desc: "Premium glassmorphic desktop music player & offline hub. Search & stream online tracks, download high-bitrate audio (MP3/FLAC up to 320kbps), build custom playlists, extract dynamic album-art themes, and sync across devices seamlessly.",
    icon: "🎵",
    glow: "emerald",
    badge: "APP",
    type: "DESKTOP",
    githubUrl: "https://github.com/shaswatxd/we-plays",
    liveUrl: "https://weplays.vercel.app",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400",
    borderClass: "border-emerald-500/30 hover:border-emerald-500 dark:border-emerald-500/20 dark:hover:border-emerald-400",
    features: [
      "📥 In-App Online Music Search & Audio Downloader",
      "🎶 Custom Playlist Builder, Liked Songs & Smart Queue",
      "💽 Lossless & High-Res Formats (MP3, FLAC, AAC up to 320kbps)",
      "🎨 Dynamic Album Art Color-Extraction Theme Engine",
      "☁️ Cross-Device Cloud Sync for Playlists & Favorites"
    ],
    details: {
      architecture: "Desktop app built with Electron, React, Vite, SQLite, and Howler.js. Features high-speed audio extraction pipeline, cloud sync, and dynamic color extraction.",
      modules: ["Online Stream & Download Engine", "Playlist & Smart Queue Manager", "Dynamic Album Art Theming", "Howler.js Audio Engine", "Cloud Sync & SQLite Store", "ID3 Tagging & Lyric Scraper"]
    }
  },

  {
    name: "UDBR Suite",
    desc: "Universal Device Backup & Recovery Suite for Windows. Ultra-low latency 60-120 FPS hardware screen mirroring, full WhatsApp Vault chat exporter with media & PDF reports, 1-click bloatware remover, and military trade-in data sanitizer.",
    icon: "⚡",
    glow: "cyan",
    badge: "APP",
    type: "DESKTOP",
    githubUrl: "https://github.com/shaswatxd/udbrsuite-releases",
    liveUrl: "https://udbrsuite-releases.vercel.app/",
    badgeClass: "bg-cyan/10 text-cyan border-cyan/20 dark:bg-cyan/15 dark:text-cyan",
    borderClass: "border-cyan/30 hover:border-cyan dark:border-cyan/20 dark:hover:border-cyan/80",
    features: [
      "🎮 60-120 FPS Direct Hardware GPU Screen Mirroring (~15ms)",
      "💬 WhatsApp & Business Vault Exporter (HTML Reports & Media)",
      "⚡ 120Hz Refresh Rate Lock & 0.5x UI Speed Booster",
      "📦 1-Click Bloatware Cleaner & Multi-Format APK Sideload",
      "🛡️ 100% Offline Local Architecture with Zero Telemetry"
    ],
    details: {
      architecture: "Native Windows desktop toolkit built with C#/.NET 8.0, ADB platform tools, Scrcpy hardware acceleration pipeline, and local AES-256 encryption engine with zero cloud telemetry.",
      modules: ["60-120 FPS GPU Mirroring Engine", "WhatsApp Vault & Chat Extractor", "Display 120Hz & Speed Booster", "DoD 5220.22-M Data Sanitizer", "Bloatware & Adware Cleaner", "ADB & Fastboot USB Bridge"]
    }
  },

  {
    name: "Gaming Firewall",
    desc: "Ultra-lightweight Android per-app network firewall & BGMI 6-hour limit bypass companion. Isolates mobile games with 0.00ms proxy penalty, blocks background data hogs locally via TUN sinkhole, and provides a draggable floating HUD with live jitter & ping telemetry.",
    icon: "🛡️",
    glow: "cyan",
    badge: "ANDROID APK",
    type: "ANDROID APK",
    githubUrl: "https://github.com/shaswatxd/gamingfirewall",
    liveUrl: "https://gamingfirewallhai.vercel.app/",
    badgeClass: "bg-cyan/10 text-cyan border-cyan/20 dark:bg-cyan/15 dark:text-cyan",
    borderClass: "border-cyan/30 hover:border-cyan dark:border-cyan/20 dark:hover:border-cyan/80",
    features: [
      "🛡️ 0.00ms Proxy Overhead & Native Direct Hardware UDP Bypass",
      "⏱️ BGMI 6-Hour Daily Playtime Limit Bypass & Port Rule Presets",
      "🚫 100% Local TUN Packet Sinkhole (Zero Cloud Telemetry)",
      "⚡ Real-Time Jitter Alerting & Draggable In-Game Floating HUD",
      "📱 Seamless In-App APK Auto-Updater & Zero Battery Drain"
    ],
    details: {
      architecture: "Native Android firewall engine built with Kotlin & Jetpack Compose using Android's VpnService. Implements a local packet sinkhole (10.244.0.1) for background apps while allowing game sockets to bypass the tunnel for true zero-latency gaming and playtime restriction bypass.",
      modules: ["Zero-Latency TUN Sinkhole Engine", "BGMI 6-Hour Bypass & Preset Rules", "Floating HUD & Jitter Calculator", "In-App APK Auto-Updater", "Per-App Socket Routing Controller", "Local VpnService Bridge"]
    }
  },

  {
    name: "BirthdayMagic",
    desc: "Interactive celebration & mystery surprise experience platform. Features a 3-step creator studio, 12 aesthetic themes, real voice note recording, candle blowing & 3D cake slicing simulation.",
    icon: "🎁",
    glow: "magenta",
    badge: "SITE",
    type: "WEB APP",
    githubUrl: "https://github.com/shaswatxd/special-surprise-box",
    liveUrl: "https://special-surprise-box.vercel.app/",
    badgeClass: "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/15 dark:text-pink-400",
    borderClass: "border-pink-500/30 hover:border-pink-500 dark:border-pink-500/20 dark:hover:border-pink-400",
    features: [
      "✨ Interactive 3D Cake & Real Candle Blowing Physics",
      "🎙️ In-Browser Voice Note Recording & Audio Equalizer",
      "🎟️ Scratch-to-Reveal Gift Coupon & Polaroid Keepsake",
      "🔒 100% Client-Side LZ-String State Compression"
    ],
    details: {
      architecture: "100% Client-side interactive canvas & animation pipeline. Encodes complete multimedia state, voice recordings, and customized settings into URL hashes using LZ-String compression with html2canvas keepsake generation.",
      modules: ["Interactive 4-Stage Story Engine", "3D Wax Seal & Cake Physics", "Web Audio Voice Note Recorder", "LZ-String URL Compression", "HTML5 Canvas Confetti & FX", "Passcode & Midnight Lock System"]
    }
  },

  {
    name: "OmniDownloader",
    desc: "High-speed multi-engine all-in-one media downloader & creator studio for Facebook, Instagram, and Twitter/X with zero watermarks & auto-fallback extraction.",
    icon: "⚡",
    glow: "cyan",
    badge: "SITE",
    type: "WEB APP",
    githubUrl: "https://github.com/shaswatxd/omnidownloader",
    liveUrl: "https://omnidownloader-one.vercel.app/",
    badgeClass: "bg-cyan/10 text-cyan border-cyan/20 dark:bg-cyan/15 dark:text-cyan",
    borderClass: "border-cyan/30 hover:border-cyan dark:border-cyan/20 dark:hover:border-cyan/80",
    features: [
      "⚡ Auto-Fallback Multi-Engine Stream Extraction",
      "🎥 No Watermark HD Downloads (Facebook, Instagram, Twitter/X)",
      "🔒 100% Free Client-Side & Server Sandbox Routing"
    ],
    details: {
      architecture: "High-speed multi-engine extraction pipeline with dynamic failover routing for Facebook, Instagram, and Twitter/X, featuring zero-watermark processing and client-side download history.",
      modules: ["Auto-Fallback Extraction Engine", "Facebook Video & Reel Parser", "Instagram Reel & Story Engine", "Twitter/X Media Extractor", "Client Download History Manager", "Interactive Creative Studio"]
    }
  },

  {
    name: "Bill Generator",
    desc: "Instant free bill & receipt generator with 30+ professional templates. Create GST invoices, rent receipts, salary slips, fuel bills & more — export as high-res PDF or PNG in one click.",
    icon: "🧾",
    glow: "orange",
    badge: "SITE",
    type: "WEB TOOL",
    githubUrl: "https://github.com/shaswatxd/bill-generator",
    liveUrl: "https://billgenhai.vercel.app",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400",
    borderClass: "border-amber-500/30 hover:border-amber-500 dark:border-amber-500/20 dark:hover:border-amber-400",
    features: [
      "🧾 30+ Professional Receipt Templates",
      "🔍 Smart Category Filters & Search",
      "📥 Instant High-Res PDF & PNG Export",
      "🔒 100% Private Client-Side Generation"
    ],
    details: {
      architecture: "Next.js app with fully client-side bill generation. All processing happens in the browser — no server uploads. Supports custom logos, digital signatures, and multiple template categories with live preview.",
      modules: ["Template Engine & Category System", "PDF & PNG Export Pipeline", "Saved Drafts Manager", "Search & Filter Controller"]
    }
  },

  {
    name: "JustPDFCraft",
    desc: "Browser-based client-side PDF utility toolkit to merge, split, compress, watermark, protect, and annotate documents locally.",
    icon: "📄",
    glow: "violet",
    badge: "SITE",
    type: "WEB TOOL",
    githubUrl: "https://github.com/shaswatxd/justpdfcraft",
    liveUrl: "https://justpdfcraft.xyz/",
    badgeClass: "bg-violet/10 text-violet border-violet/20 dark:bg-violet/15 dark:text-violet",
    borderClass: "border-violet/30 hover:border-violet dark:border-violet/20 dark:hover:border-violet/80",
    features: [
      "📄 Free PDF & Student Tools",
      "🔒 100% Secure Client-Side Processing",
      "🛠️ Merge, Split & Compress Functionality"
    ],
    details: {
      architecture: "100% Client-side sandbox. Intercepts files and updates buffer maps in WASM, keeping data completely local.",
      modules: ["pdf-lib compiler", "PDF.js parser", "Local browser memory stream"]
    }
  },

  {
    name: "Resume Builder",
    desc: "Professional resume builder to craft standout resumes easily. Choose from 30 templates, customize sections, and export as PDF instantly.",
    icon: "📝",
    glow: "cyan",
    badge: "SITE",
    type: "WEB APP",
    githubUrl: "https://github.com/shaswatxd/resumeai",
    liveUrl: "https://resumeaihai.vercel.app/",
    badgeClass: "bg-cyan/10 text-cyan border-cyan/20 dark:bg-cyan/15 dark:text-cyan",
    borderClass: "border-cyan/30 hover:border-cyan dark:border-cyan/20 dark:hover:border-cyan/80",
    features: [
      "📄 30 Professional Templates",
      "⚡ Real-Time Live Preview & Editor",
      "💾 Save Draft & Download PDF",
      "🔒 100% Client-Side Private Storage"
    ],
    details: {
      architecture: "Next.js app with fully client-side resume builder. Resumes and drafts are created and stored entirely in the browser.",
      modules: ["Interactive Editor", "30 Template Renderer", "PDF Export Module", "Draft Autosave System"]
    }
  }
];

export const GLOW_COLORS = {
  cyan: "#00c2d1",
  violet: "#8b6bff",
  magenta: "#ff3d9a",
  emerald: "#3ef07c",
  orange: "#e08a4a"
};
