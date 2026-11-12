import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCorner,
  GoldenParticles,
  OrnamentalDivider,
  RoyalCrest,
} from './OrnamentalElements';
import { useWeddingAudio } from './AudioController';

interface EnvelopeEntranceProps {
  onComplete: () => void;
}

export const EnvelopeEntrance: React.FC<EnvelopeEntranceProps> = ({
  onComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const { startMusic } = useWeddingAudio();

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    void startMusic();
    window.setTimeout(() => {
      onComplete();
    }, 1650);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.85, delay: isOpening ? 0.95 : 0, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ivory-silk px-4 py-8"
      aria-label="Wedding Invitation Envelope"
    >
      {/* Sacred Wedding Artwork Background */}
      <img
        src="/images/wedding-bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover sm:object-contain object-bottom opacity-80"
      />

      {/* Warm luminous radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,253,248,0.48) 0%, rgba(247,240,229,0.62) 60%, rgba(232,216,197,0.82) 100%)',
        }}
      />

      {/* Golden floating particles */}
      <GoldenParticles density={48} />

      {/* Slow floral corner reveals */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -24, y: -24 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute top-0 left-0 w-36 h-36 sm:w-52 sm:h-52"
      >
        <FloralCorner position="top-left" className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 24, y: -24 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.25, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52"
      >
        <FloralCorner position="top-right" className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -24, y: 24 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.25, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-0 left-0 w-36 h-36 sm:w-52 sm:h-52"
      >
        <FloralCorner position="bottom-left" className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 24, y: 24 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.25, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-0 right-0 w-36 h-36 sm:w-52 sm:h-52"
      >
        <FloralCorner position="bottom-right" className="w-full h-full" />
      </motion.div>

      {/* Center Ornamental Envelope */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-center mb-5 flex flex-col items-center"
        >
          <img
            src="/images/venkateswara-padmavathi.jpg"
            alt="Lord Venkateswara Swamy and Goddess Padmavathi Devi"
            className="h-24 sm:h-28 w-auto mx-auto mb-2 mix-blend-multiply select-none pointer-events-none"
          />
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#762D3C] font-semibold">
            A Royal Wedding Celebration
          </p>
        </motion.div>

        {/* 3D Envelope Assembly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{
            opacity: 1,
            scale: isOpening ? 1.04 : 1,
            y: 0,
          }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[440px] aspect-[4/2.85]"
          style={{ perspective: '1200px' }}
        >
          {/* Envelope Back Base */}
          <div className="absolute inset-0 rounded-xl bg-[#EFE4D3] border border-[#C5A15A]/60 shadow-[0_28px_70px_-20px_rgba(118,45,60,0.22)]" />

          {/* Rising Inner Invitation Card */}
          <motion.div
            initial={{ y: 0, opacity: 0.9 }}
            animate={{
              y: isOpening ? -92 : -6,
              opacity: 1,
            }}
            transition={{
              duration: 0.9,
              delay: isOpening ? 0.35 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-4 top-3 bottom-3 rounded-lg bg-[#FFFDF8] border border-[#C5A15A]/55 shadow-md flex flex-col items-center justify-center px-5 text-center"
          >
            <div className="absolute inset-2 rounded border border-[#C5A15A]/25 pointer-events-none" />
            <RoyalCrest size={48} className="mb-1 opacity-90" />
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#762D3C]">
              Together With Their Families
            </p>
            <h1 className="font-script text-4xl sm:text-5xl text-[#762D3C] mt-1 leading-none">
              {weddingConfig.couple.groomFirst} &amp; {weddingConfig.couple.brideFirst}
            </h1>
            <OrnamentalDivider className="my-2 scale-75" />
            <p className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#A98950]">
              {weddingConfig.hero.date} • TIRUMALA
            </p>
          </motion.div>

          {/* Envelope Left & Right Pocket Folds */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 440 314"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <polygon
                points="0,0 220,175 0,314"
                fill="#F7F0E5"
                stroke="#C5A15A"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <polygon
                points="440,0 220,175 440,314"
                fill="#F2E7D6"
                stroke="#C5A15A"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <polygon
                points="0,314 220,148 440,314"
                fill="#FFFDF8"
                stroke="#C5A15A"
                strokeOpacity="0.55"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Animated Top Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpening ? -175 : 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[58%] z-20"
          >
            <svg
              viewBox="0 0 440 182"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_6px_12px_rgba(118,45,60,0.12)]"
            >
              <defs>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF8" />
                  <stop offset="100%" stopColor="#EFE3D0" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 L440,0 L232,172 Q220,182 208,172 Z"
                fill="url(#flapGrad)"
                stroke="#C5A15A"
                strokeOpacity="0.6"
                strokeWidth="1.3"
              />
            </svg>
          </motion.div>

          {/* Royal Burgundy Wax Seal */}
          <AnimatePresence>
            {!isOpening && (
              <motion.button
                type="button"
                onClick={handleOpen}
                aria-label="Break wax seal and open wedding invitation"
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.25, opacity: 0, y: -18 }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.55, delay: 0.55 }}
                className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full bg-gradient-to-br from-[#8D3849] via-[#762D3C] to-[#581E2B] border-2 border-[#E6CB88]/80 shadow-[0_12px_28px_rgba(118,45,60,0.38)] flex flex-col items-center justify-center cursor-pointer group"
              >
                <span className="absolute inset-1.5 rounded-full border border-[#E6CB88]/45 pointer-events-none" />
                <span className="font-script text-2xl text-[#FFFDF8] leading-none tracking-wide">
                  {weddingConfig.couple.monogram}
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#E8D8C5] mt-0.5">
                  Sealed
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-9 flex flex-col items-center gap-3 text-center"
        >
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={isOpening}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#762D3C] via-[#8A3647] to-[#762D3C] text-[#FFFDF8] font-serif text-sm sm:text-base tracking-[0.18em] uppercase border border-[#C5A15A]/75 shadow-[0_14px_34px_-8px_rgba(118,45,60,0.45)] cursor-pointer transition-shadow hover:shadow-[0_18px_42px_-6px_rgba(197,161,90,0.55)] disabled:opacity-70"
          >
            <Sparkles className="w-4 h-4 text-[#E6CB88]" />
            <span>Open Wedding Invitation</span>
            <Sparkles className="w-4 h-4 text-[#E6CB88]" />
          </motion.button>

          <p className="inline-flex items-center gap-1.5 font-romantic text-sm sm:text-base italic text-[#6E4750]">
            <Volume2 className="w-3.5 h-3.5 text-[#A98950]" />
            <span>Opening softly plays {weddingConfig.audio.title}</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
