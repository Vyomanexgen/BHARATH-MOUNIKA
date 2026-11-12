import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCorner,
  OrnamentalDivider,
  RoyalCrest,
} from './OrnamentalElements';

export const FamilyInviteFooter: React.FC = () => {
  const { familyClosingInvite, footer } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Invitation From The Family */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 bg-[#F7F0E5]/52 border-t border-[#C5A15A]/25 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-[#FFFDF8] border-champagne-double px-7 py-12 sm:px-14 sm:py-16 text-center overflow-hidden"
          >
            <FloralCorner
              position="top-left"
              className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-80"
            />
            <FloralCorner
              position="top-right"
              className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-80"
            />
            <FloralCorner
              position="bottom-left"
              className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
            />
            <FloralCorner
              position="bottom-right"
              className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
            />

            <div className="relative z-10">
              <RoyalCrest size={56} className="mx-auto mb-3 opacity-90" />
              <p className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#A98950] font-semibold">
                Invited By
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#4A232C] mt-2 font-medium">
                {familyClosingInvite.heading}
              </h2>
              <OrnamentalDivider className="my-4" />

              <p className="font-serif text-2xl sm:text-3xl text-[#762D3C] font-semibold mt-4">
                {familyClosingInvite.hosts}
              </p>

              <address className="not-italic mt-4 font-romantic text-xl sm:text-2xl text-[#6E4750] leading-relaxed">
                {familyClosingInvite.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Royal Footer */}
      <footer className="relative bg-[#E8D8C5]/65 border-t border-[#C5A15A]/45 py-14 sm:py-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-script text-4xl sm:text-5xl text-[#762D3C] leading-none">
            {weddingConfig.couple.groomFirst} &amp; {weddingConfig.couple.brideFirst}
          </h3>
          <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#A98950] font-semibold mt-2">
            {footer.subtitle}
          </p>

          <OrnamentalDivider className="my-5" />

          <p className="font-romantic text-xl sm:text-2xl text-[#4A232C]">
            {footer.thankYou}
          </p>
          <p className="font-romantic text-lg sm:text-xl italic text-[#762D3C] mt-1">
            {footer.signOff}
          </p>

          <div className="mt-8 flex items-center justify-center">
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFFDF8] hover:bg-[#762D3C] text-[#762D3C] hover:text-[#FFFDF8] border border-[#C5A15A] font-sans text-xs tracking-[0.18em] uppercase font-semibold cursor-pointer transition-colors shadow-xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>
      </footer>
    </>
  );
};
