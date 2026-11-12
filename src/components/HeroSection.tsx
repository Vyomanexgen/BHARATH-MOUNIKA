import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCorner,
  GoldenParticles,
  OrnamentalDivider,
  RoyalCrest,
} from './OrnamentalElements';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 bg-transparent"
    >
      {/* Warm Luminous Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(255,253,248,0.28) 0%, rgba(247,240,229,0.42) 60%, rgba(247,240,229,0.68) 100%)',
        }}
      />

      {/* Delicate Golden Shimmer Particles */}
      <GoldenParticles density={40} className="z-0" />

      {/* Ornamental Corner Florals */}
      <FloralCorner
        position="top-left"
        className="absolute top-16 left-0 w-32 h-32 sm:w-48 sm:h-48 z-10 opacity-85"
      />
      <FloralCorner
        position="top-right"
        className="absolute top-16 right-0 w-32 h-32 sm:w-48 sm:h-48 z-10 opacity-85"
      />
      <FloralCorner
        position="bottom-left"
        className="absolute bottom-0 left-0 w-28 h-28 sm:w-44 sm:h-44 z-10 opacity-75"
      />
      <FloralCorner
        position="bottom-right"
        className="absolute bottom-0 right-0 w-28 h-28 sm:w-44 sm:h-44 z-10 opacity-75"
      />

      {/* Royal Arch Invitation Centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-3xl w-full mx-auto"
      >
        <div className="relative rounded-t-[10rem] rounded-b-3xl bg-[#FFFDF8]/84 backdrop-blur-[4px] border-champagne-double px-6 py-12 sm:px-14 sm:py-16 text-center overflow-hidden">
          {/* Subtle Inner Scalloped Arch Accent */}
          <div className="pointer-events-none absolute inset-4 rounded-t-[9rem] rounded-b-2xl border border-[#C5A15A]/30" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative z-10"
          >
            {/* Lord Venkateswara & Goddess Padmavathi Devi Devotional Emblem */}
            <div className="mb-3 flex flex-col items-center">
              <img
                src="/images/venkateswara-padmavathi.jpg"
                alt="Lord Venkateswara Swamy and Goddess Padmavathi Devi"
                className="h-28 sm:h-36 w-auto mx-auto mix-blend-multiply select-none pointer-events-none"
              />
              <p className="font-romantic text-xs sm:text-sm italic text-[#A98950] mt-1">
                With Divine Blessings of Lord Venkateswara &amp; Goddess Padmavathi Devi
              </p>
            </div>

            {/* Small Ganesha inside the Gold Circle Crest */}
            <RoyalCrest size={84} className="mx-auto mb-2 opacity-95" />
            <p className="font-sans text-[11px] sm:text-xs tracking-[0.34em] uppercase text-[#762D3C] font-semibold">
              {weddingConfig.hero.eyebrow}
            </p>
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.28 }}
            className="relative z-10 mt-6"
          >
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#762D3C] leading-none">
              {weddingConfig.couple.groomFirst} &amp; {weddingConfig.couple.brideFirst}
            </h1>
          </motion.div>

          <OrnamentalDivider className="my-6 relative z-10" />

          {/* Tagline & Invitation Message */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.42 }}
            className="relative z-10"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#762D3C] italic font-medium">
              {weddingConfig.hero.tagline}
            </p>
            <p className="font-romantic text-lg sm:text-xl text-[#4A232C] leading-relaxed max-w-xl mx-auto mt-4">
              {weddingConfig.hero.invitationLine}
            </p>
          </motion.div>

          {/* Date & Location Pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="relative z-10 mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm tracking-[0.2em] uppercase font-sans font-semibold text-[#762D3C]"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F0E5] border border-[#C5A15A]/55 shadow-xs">
              <Calendar className="w-4 h-4 text-[#A98950]" />
              {weddingConfig.hero.date}
            </span>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F0E5] border border-[#C5A15A]/55 shadow-xs">
              <MapPin className="w-4 h-4 text-[#A98950]" />
              {weddingConfig.hero.location}
            </span>
          </motion.div>

          {/* Primary CTA & Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
            className="relative z-10 mt-8 flex flex-col items-center gap-5"
          >
            <motion.a
              href="#countdown"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#762D3C] via-[#8A3647] to-[#762D3C] text-[#FFFDF8] font-sans text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold border border-[#C5A15A]/75 shadow-[0_12px_28px_-8px_rgba(118,45,60,0.4)] hover:shadow-[0_16px_34px_-6px_rgba(197,161,90,0.5)] transition-shadow"
            >
              {weddingConfig.hero.ctaLabel}
            </motion.a>

            <motion.a
              href="#countdown"
              aria-label="Scroll to wedding countdown"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex flex-col items-center gap-1 text-[#A98950] hover:text-[#762D3C] transition-colors"
            >
              <span className="font-sans text-[10px] tracking-[0.26em] uppercase">
                Scroll
              </span>
              <ChevronDown className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
