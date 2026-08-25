"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import { soundManager } from '../utils/SoundManager';

const ACTIONS = [
  {
    id: 'section-projects',
    title: 'Jump to Projects',
    subtitle: 'View live builds and apps',
    icon: '🚀',
    category: 'Navigation',
    action: () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    id: 'section-stack',
    title: 'Jump to Tech Stack',
    subtitle: 'Languages, frameworks & tools',
    icon: '⚡',
    category: 'Navigation',
    action: () => {
      document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    id: 'section-terminal',
    title: 'Open Interactive Terminal',
    subtitle: 'Run mock CLI commands',
    icon: '💻',
    category: 'Navigation',
    action: () => {
      document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    id: 'section-contact',
    title: 'Get in Touch',
    subtitle: 'Email, Twitter & Socials',
    icon: '📬',
    category: 'Navigation',
    action: () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    id: 'theme-toggle',
    title: 'Toggle Color Theme',
    subtitle: 'Switch Light / Dark mode',
    icon: '🌓',
    category: 'Preferences',
    action: () => {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch {}
    }
  },
  {
    id: 'sound-toggle',
    title: 'Toggle Audio FX',
    subtitle: 'Enable or disable click sounds',
    icon: '🔊',
    category: 'Preferences',
    action: () => {
      soundManager.toggleMute();
    }
  },
  {
    id: 'github-profile',
    title: 'GitHub Profile',
    subtitle: 'github.com/shaswatxd',
    icon: '🐙',
    category: 'External',
    action: () => {
      window.open('https://github.com/shaswatxd', '_blank');
    }
  }
];

export default memo(function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      soundManager.playKeypress();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combine actions & projects into searchable items
  const allItems = React.useMemo(() => {
    const projectItems = PROJECTS.map((p) => ({
      id: `proj-${p.name}`,
      title: p.name,
      subtitle: p.desc,
      icon: p.icon,
      category: 'Projects',
      badge: p.type || p.badge,
      action: () => {
        if (p.liveUrl && p.liveUrl !== '#') {
          window.open(p.liveUrl, '_blank');
        }
      }
    }));

    return [...ACTIONS, ...projectItems];
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Execute selected item
  const handleSelect = useCallback((item) => {
    soundManager.playSuccess();
    onClose();
    if (item && item.action) {
      item.action();
    }
  }, [onClose]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      soundManager.playHover();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      soundManager.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[14vh] p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette Window */}
          <motion.div
            className="relative w-full max-w-[580px] bg-white dark:bg-[#111114] border border-[#0a0a0a]/15 dark:border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#0a0a0a]/10 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-cyan flex-shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  soundManager.playKeypress();
                }}
                placeholder="Type a command, project, or action..."
                className="w-full bg-transparent text-sm text-[#0a0a0a] dark:text-[#f2f2f2] placeholder-[#888] dark:placeholder-[#666] outline-none font-mono"
              />

              <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-[#0a0a0a]/15 dark:border-white/15 text-[#888] dark:text-[#777]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[340px] overflow-y-auto p-2 scrollbar-thin divide-y divide-transparent"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-[#888] dark:text-[#666]">
                  No matching commands or projects found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      data-active={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-xs select-none ${
                        isSelected
                          ? 'bg-cyan/10 dark:bg-cyan/15 text-[#0a0a0a] dark:text-white'
                          : 'text-[#555] dark:text-[#aaa] hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        <div className="min-w-0">
                          <div className="font-medium text-[#0a0a0a] dark:text-[#f2f2f2] truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded border border-cyan/30 text-cyan">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#777] dark:text-[#888] truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-[10px] text-[#999] dark:text-[#666]">
                          {item.category}
                        </span>
                        {isSelected && (
                          <span className="font-mono text-[10px] text-cyan font-bold">↵</span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2 border-t border-[#0a0a0a]/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#888] dark:text-[#666] bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-cyan">ShaswatShell Command Launcher</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
