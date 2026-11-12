import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  OrnamentalDivider,
  RoyalCrest,
  SectionHeading,
} from './OrnamentalElements';

export const LoveStorySection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const { heading, subheading, chapters } = weddingConfig.loveStory;

  return (
    <section
      id="story"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F0E5]/52 overflow-hidden border-t border-[#C5A15A]/20"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Our Love Story"
          title={heading}
          subtitle={subheading}
        />

        {/* Interactive Chapter Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {chapters.map((chapter, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={chapter.number}
                type="button"
                onClick={() => {
                  setActiveChapter(idx);
                  const el = document.getElementById(`story-chapter-${idx}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-[0.18em] uppercase transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#762D3C] text-[#FFFDF8] border-[#C5A15A] shadow-md'
                    : 'bg-[#FFFDF8] text-[#4A232C] border-[#C5A15A]/45 hover:border-[#762D3C]/50'
                }`}
              >
                {chapter.number}
              </button>
            );
          })}
        </div>

        {/* Three-Chapter Editorial Timeline */}
        <div className="relative">
          {/* Center Vertical Champagne Line (Desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C5A15A]/75 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {chapters.map((chapter, idx) => {
              const isRight = idx % 2 === 1;
              return (
                <motion.div
                  id={`story-chapter-${idx}`}
                  key={chapter.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  onViewportEnter={() => setActiveChapter(idx)}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center"
                >
                  {/* Timeline Center Medallion */}
                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#FFFDF8] border-2 border-[#C5A15A] items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    <Heart className="w-4 h-4 text-[#762D3C] fill-[#C99A9A]/45" />
                  </div>

                  {/* Ornamental Chapter Crest Column */}
                  <div
                    className={`hidden md:flex items-center justify-center ${
                      isRight ? 'md:order-1 md:pr-10' : 'md:order-2 md:pl-10'
                    }`}
                  >
                    <div className="relative w-44 h-44 rounded-full bg-[#FFFDF8]/85 border border-[#C5A15A]/50 shadow-sm flex flex-col items-center justify-center p-4 text-center">
                      <RoyalCrest size={56} className="opacity-85 mb-1" />
                      <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#A98950] font-semibold">
                        {chapter.number}
                      </span>
                      <span className="font-script text-2xl text-[#762D3C] mt-0.5">
                        {idx === 0 ? 'Beginning' : idx === 1 ? 'Promise' : 'Forever'}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Story Card Column */}
                  <div
                    className={`${
                      isRight ? 'md:order-2 md:pl-10' : 'md:order-1 md:pr-10'
                    }`}
                  >
                    <div className="rounded-3xl bg-[#FFFDF8] border-champagne-double px-7 py-8 sm:px-9 sm:py-10 text-center">
                      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#762D3C] font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A15A]" />
                        {chapter.number}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#4A232C] mt-2 font-medium">
                        {chapter.number} &ndash; {chapter.title}
                      </h3>
                      <OrnamentalDivider className="my-3" />
                      <p className="font-romantic text-xl sm:text-2xl text-[#6E4750] italic leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
