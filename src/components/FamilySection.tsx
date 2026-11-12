import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Home } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCorner,
  OrnamentalDivider,
  RoyalCrest,
  SectionHeading,
} from './OrnamentalElements';

export const FamilySection: React.FC = () => {
  const { groom, bride } = weddingConfig.families;

  return (
    <section id="families" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFDF8]/52">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Two Cherished Households"
          title="With Blessings From Our Families"
          subtitle="Honouring the love, grace, and heritage that nurtured our lives."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT SIDE – GROOM'S FAMILY */}
          <motion.article
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-[#F7F0E5] border-champagne-double p-8 sm:p-12 flex flex-col justify-between overflow-hidden"
          >
            <FloralCorner
              position="top-left"
              className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-80"
            />
            <FloralCorner
              position="bottom-right"
              className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
            />

            <div className="relative z-10 text-center">
              {/* Groom Identity Header */}
              <span className="inline-block px-4 py-1 rounded-full bg-[#FFFDF8] border border-[#C5A15A]/55 font-sans text-[10px] tracking-[0.26em] uppercase text-[#A98950] font-semibold">
                {groom.roleLabel}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A232C] mt-3 font-medium">
                {groom.sectionTitle}
              </h3>
              <OrnamentalDivider className="my-4" />

              {/* Monogram Seal */}
              <div className="relative mx-auto my-5 w-24 h-24 flex items-center justify-center">
                <RoyalCrest size={96} showGanesh={false} className="absolute inset-0 opacity-85" />
                <span className="font-script text-4xl text-[#762D3C] relative z-10 mt-1">
                  {groom.initial}
                </span>
              </div>

              {/* Groom Name & Education */}
              <h4 className="font-script text-4xl sm:text-5xl text-[#762D3C] leading-none mt-2">
                {groom.name}
              </h4>
              <div className="mt-4">
                <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/90 border border-[#C5A15A]/45 font-sans text-xs sm:text-sm text-[#4A232C] font-medium">
                  <GraduationCap className="w-4 h-4 text-[#A98950]" />
                  <span>{groom.education}</span>
                </p>
              </div>

              {/* Parents */}
              <div className="mt-8 pt-6 border-t border-[#C5A15A]/30">
                <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-[#A98950] font-semibold">
                  {groom.parentsHeading}
                </p>
                <div className="mt-2.5 space-y-1.5 font-serif text-lg sm:text-xl text-[#4A232C]">
                  {groom.parents.map((parent) => (
                    <p key={parent}>{parent}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {/* RIGHT SIDE – BRIDE'S FAMILY */}
          <motion.article
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-[#F7F0E5] border-champagne-double p-8 sm:p-12 flex flex-col justify-between overflow-hidden"
          >
            <FloralCorner
              position="top-right"
              className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-80"
            />
            <FloralCorner
              position="bottom-left"
              className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
            />

            <div className="relative z-10 text-center">
              {/* Bride Identity Header */}
              <span className="inline-block px-4 py-1 rounded-full bg-[#762D3C]/10 border border-[#762D3C]/30 font-sans text-[10px] tracking-[0.26em] uppercase text-[#762D3C] font-semibold">
                {bride.roleLabel}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A232C] mt-3 font-medium">
                {bride.sectionTitle}
              </h3>
              <OrnamentalDivider className="my-4" />

              {/* Monogram Seal */}
              <div className="relative mx-auto my-5 w-24 h-24 flex items-center justify-center">
                <RoyalCrest size={96} showGanesh={false} className="absolute inset-0 opacity-85" />
                <span className="font-script text-4xl text-[#762D3C] relative z-10 mt-1">
                  {bride.initial}
                </span>
              </div>

              {/* Bride Name & Education */}
              <h4 className="font-script text-4xl sm:text-5xl text-[#762D3C] leading-none mt-2">
                {bride.name}
              </h4>
              <div className="mt-4">
                <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/90 border border-[#C99A9A]/60 font-sans text-xs sm:text-sm text-[#4A232C] font-medium">
                  <GraduationCap className="w-4 h-4 text-[#762D3C]" />
                  <span>{bride.education}</span>
                </p>
              </div>

              {/* Parents & Residence */}
              <div className="mt-8 pt-6 border-t border-[#C5A15A]/30">
                <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-[#762D3C] font-semibold">
                  {bride.parentsHeading}
                </p>
                <div className="mt-2.5 space-y-1.5 font-serif text-lg sm:text-xl text-[#4A232C]">
                  {bride.parents.map((parent) => (
                    <p key={parent}>{parent}</p>
                  ))}
                </div>

                <div className="mt-5 inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-[#FFFDF8]/85 border border-[#C5A15A]/35">
                  <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-[#A98950] font-semibold">
                    <Home className="w-3.5 h-3.5" />
                    {bride.residenceHeading}
                  </span>
                  <span className="font-romantic text-base sm:text-lg text-[#4A232C]">
                    {bride.residence}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
