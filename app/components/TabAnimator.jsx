"use client";

import { useEffect } from 'react';

/**
 * TabAnimator: Adds subtle dynamic life to the browser tab icon & title.
 * - Animates the Cyan 'S' icon glow in the browser tab.
 * - Detects when user leaves tab and shows engaging return messages.
 */
export default function TabAnimator() {
  useEffect(() => {
    let faviconInterval;
    let titleInterval;
    const defaultTitle = "ShaswatShell — Dev Console | Building & Shipping";
    const awayTitles = [
      "⚡ Come back & explore! | ShaswatShell",
      "👀 Still checking builds? | ShaswatShell",
      "🚀 NovaDL & Tools live | ShaswatShell"
    ];
    let awayIndex = 0;

    // Create or find dynamic favicon link
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Generate dynamic SVG favicon frames with pulsing cyan accent
    const frames = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="7" fill="#0a0a0a"/>
        <path d="M22 11.5C22 8.5 19.5 7 16 7C12.5 7 10 8.5 10 11.5C10 14.5 13 15.2 16 16C19 16.8 22 17.5 22 20.5C22 23 19.5 25 16 25C12.5 25 10 23 10 20.5" fill="none" stroke="#00c2d1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="25" cy="7" r="2.5" fill="#3ef07c"/>
      </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="7" fill="#0a0a0a"/>
        <path d="M22 11.5C22 8.5 19.5 7 16 7C12.5 7 10 8.5 10 11.5C10 14.5 13 15.2 16 16C19 16.8 22 17.5 22 20.5C22 23 19.5 25 16 25C12.5 25 10 23 10 20.5" fill="none" stroke="#00f0ff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="25" cy="7" r="3" fill="#00f0ff"/>
      </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="7" fill="#0a0a0a"/>
        <path d="M22 11.5C22 8.5 19.5 7 16 7C12.5 7 10 8.5 10 11.5C10 14.5 13 15.2 16 16C19 16.8 22 17.5 22 20.5C22 23 19.5 25 16 25C12.5 25 10 23 10 20.5" fill="none" stroke="#8b6bff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="25" cy="7" r="2.5" fill="#8b6bff"/>
      </svg>`
    ];

    let frameIndex = 0;
    const updateFavicon = () => {
      if (document.hidden) return;
      const svg = frames[frameIndex];
      link.href = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
      frameIndex = (frameIndex + 1) % frames.length;
    };

    // Cycle favicon every 1.5 seconds when active
    faviconInterval = setInterval(updateFavicon, 1500);

    // Handle Tab Focus & Away States
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(faviconInterval);
        document.title = awayTitles[0];
        titleInterval = setInterval(() => {
          awayIndex = (awayIndex + 1) % awayTitles.length;
          document.title = awayTitles[awayIndex];
        }, 2200);
      } else {
        clearInterval(titleInterval);
        document.title = "✨ Welcome Back! | ShaswatShell";
        setTimeout(() => {
          document.title = defaultTitle;
        }, 1500);
        faviconInterval = setInterval(updateFavicon, 1500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(faviconInterval);
      clearInterval(titleInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
