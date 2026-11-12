import React, { useEffect, useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { WeddingAudioProvider, useWeddingAudio } from './components/AudioController';
import { EnvelopeEntrance } from './components/EnvelopeEntrance';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { FamilySection } from './components/FamilySection';
import { LoveStorySection } from './components/LoveStorySection';
import { CelebrationsSection } from './components/CelebrationsSection';
import { VenuesSection } from './components/VenuesSection';
import { WishesSection } from './components/WishesSection';
import { FamilyInviteFooter } from './components/FamilyInviteFooter';
import { RoyalCrest } from './components/OrnamentalElements';

const FloatingAudioPill: React.FC = () => {
  const { isPlaying, embedBlocked, toggleMusic } = useWeddingAudio();

  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      aria-label={
        embedBlocked
          ? 'Open Seetha Kalyanam on YouTube'
          : isPlaying
          ? 'Pause Seetha Kalyanam'
          : 'Play Seetha Kalyana Vaibhogame'
      }
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFDF8]/92 backdrop-blur-md border border-[#C5A15A]/70 text-[#762D3C] shadow-[0_12px_28px_-8px_rgba(118,45,60,0.3)] cursor-pointer hover:bg-[#F7F0E5] transition-colors sm:hidden"
    >
      {embedBlocked ? (
        <ExternalLink className="w-4 h-4" />
      ) : isPlaying ? (
        <Volume2 className="w-4 h-4 animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-[#A98950]" />
      )}
      <span className="font-sans text-[11px] tracking-[0.12em] uppercase font-semibold">
        {embedBlocked ? 'YouTube Song' : isPlaying ? 'Pause Song' : 'Play Song'}
      </span>
    </motion.button>
  );
};

const WeddingExperience: React.FC = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setPageLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F0E5] text-[#4A232C]">
      {/* Page-Loading Transition */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-[#F7F0E5] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <RoyalCrest size={72} />
              <p className="font-script text-4xl text-[#762D3C] mt-2">
                Bharath &amp; Mounika
              </p>
              <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-[#A98950] mt-2">
                22 November 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope Entrance Overlay */}
      <AnimatePresence>
        {!pageLoading && envelopeOpen && (
          <EnvelopeEntrance
            key="envelope-entrance"
            onComplete={() => setEnvelopeOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Wedding Story & Invitation */}
      {!envelopeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative"
        >
          {/* Fixed Sacred Wedding Artwork Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F7F0E5]"
          >
            <img
              src="/images/wedding-bg.jpg"
              alt=""
              className="w-full h-full object-cover sm:object-contain object-bottom opacity-85"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(247,240,229,0.18) 35%, rgba(247,240,229,0.72) 100%)',
              }}
            />
          </div>

          <div className="relative z-10">
            <Navigation onReplayEntrance={handleReplay} />
            <main>
              <HeroSection />
              <CountdownSection />
              <FamilySection />
              <LoveStorySection />
              <CelebrationsSection />
              <VenuesSection />
              <WishesSection />
            </main>
            <FamilyInviteFooter />
            <FloatingAudioPill />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WeddingAudioProvider>
        <WeddingExperience />
      </WeddingAudioProvider>
    </MotionConfig>
  );
}
