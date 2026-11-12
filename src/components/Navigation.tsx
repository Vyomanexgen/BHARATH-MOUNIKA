import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Menu,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { useWeddingAudio } from './AudioController';
import { GoogleTranslateToggle } from './GoogleTranslate';

interface NavigationProps {
  onReplayEntrance: () => void;
}

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#families', label: 'Families' },
  { href: '#story', label: 'Our Story' },
  { href: '#celebrations', label: 'Celebrations' },
  { href: '#venues', label: 'Venues' },
  { href: '#wishes', label: 'Blessings' },
];

export const Navigation: React.FC<NavigationProps> = ({ onReplayEntrance }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isPlaying, embedBlocked, toggleMusic } = useWeddingAudio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FFFDF8]/92 backdrop-blur-md border-b border-[#C5A15A]/35 shadow-[0_8px_30px_-14px_rgba(118,45,60,0.16)]'
          : 'bg-[#FFFDF8]/72 backdrop-blur-sm border-b border-[#C5A15A]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-3">
        {/* Couple Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Return to top of invitation"
        >
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F7F0E5] to-[#E8D8C5] border border-[#C5A15A]/60 flex items-center justify-center font-script text-lg text-[#762D3C] shadow-sm group-hover:border-[#762D3C]/60 transition-colors">
            B&amp;M
          </span>
          <span className="hidden xl:inline font-serif text-sm tracking-[0.2em] uppercase text-[#4A232C] font-medium">
            {weddingConfig.couple.combined}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#4A232C]/85 hover:text-[#762D3C] transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-[#C5A15A] hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls: Google Translate Telugu + Music + Replay + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <GoogleTranslateToggle compact />

          <button
            type="button"
            onClick={toggleMusic}
            aria-label={
              embedBlocked
                ? `Open ${weddingConfig.audio.title} on YouTube`
                : isPlaying
                ? `Pause ${weddingConfig.audio.title}`
                : `Play ${weddingConfig.audio.title}`
            }
            title={
              embedBlocked
                ? `Listen on YouTube: ${weddingConfig.audio.title}`
                : isPlaying
                ? `Pause: ${weddingConfig.audio.title}`
                : `Play: ${weddingConfig.audio.title}`
            }
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#F7F0E5] hover:bg-[#E8D8C5]/75 border border-[#C5A15A]/55 text-[#762D3C] text-xs tracking-[0.12em] uppercase font-medium cursor-pointer transition-all shadow-xs"
          >
            {embedBlocked ? (
              <>
                <ExternalLink className="w-3.5 h-3.5 text-[#762D3C]" />
                <span className="hidden sm:inline">Play Song</span>
              </>
            ) : isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#762D3C] animate-pulse" />
                <span className="hidden sm:inline">{weddingConfig.audio.title}</span>
                <Pause className="w-3 h-3 text-[#A98950]" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#A98950]" />
                <span className="hidden sm:inline">Play Music</span>
                <Play className="w-3 h-3 text-[#762D3C]" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReplayEntrance}
            title="Replay Envelope Opening"
            aria-label="Replay Envelope Opening"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F0E5] hover:bg-[#E8D8C5]/75 border border-[#C5A15A]/45 text-[#A98950] hover:text-[#762D3C] cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F0E5] border border-[#C5A15A]/50 text-[#762D3C] cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#FFFDF8]/98 border-t border-[#C5A15A]/25"
            aria-label="Mobile Navigation"
          >
            <div className="px-6 py-5 grid grid-cols-2 gap-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg bg-[#F7F0E5]/70 text-center font-sans text-xs tracking-[0.16em] uppercase text-[#4A232C] hover:text-[#762D3C] hover:bg-[#E8D8C5]/60 border border-[#C5A15A]/25"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onReplayEntrance();
                }}
                className="col-span-2 py-2.5 px-3 rounded-lg bg-[#F7F0E5] text-center font-sans text-xs tracking-[0.16em] uppercase text-[#762D3C] border border-[#C5A15A]/40 inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay Invitation Envelope
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
