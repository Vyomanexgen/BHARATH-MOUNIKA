import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  CalendarPlus,
  Clock,
  Download,
  MapPin,
  Navigation,
} from 'lucide-react';
import { weddingConfig, type WeddingEvent } from '../config/weddingConfig';
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar';
import {
  FloralCorner,
  OrnamentalDivider,
  RoyalCrest,
  SectionHeading,
} from './OrnamentalElements';

const EventCard: React.FC<{ event: WeddingEvent; index: number }> = ({
  event,
  index,
}) => {
  const isBurgundy = event.theme === 'burgundy';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-[2rem] overflow-hidden border-2 shadow-[0_26px_64px_-22px_rgba(118,45,60,0.22)] flex flex-col justify-between ${
        isBurgundy
          ? 'border-[#C5A15A] bg-[#F7F0E5]'
          : 'border-[#C5A15A]/80 bg-[#FFFDF8]'
      }`}
    >
      <FloralCorner
        position="top-left"
        className="absolute top-0 left-0 w-24 h-24 opacity-70"
      />
      <FloralCorner
        position="top-right"
        className="absolute top-0 right-0 w-24 h-24 opacity-70"
      />

      {/* Top Ornamental Ribbon Header */}
      <div
        className={`relative pt-8 pb-6 px-6 text-center border-b ${
          isBurgundy
            ? 'bg-gradient-to-b from-[#762D3C]/10 to-transparent border-[#762D3C]/15'
            : 'bg-gradient-to-b from-[#E8D8C5]/55 to-transparent border-[#C5A15A]/25'
        }`}
      >
        <span
          className={`inline-block px-4 py-1.5 rounded-full font-sans text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold border shadow-xs ${
            isBurgundy
              ? 'bg-[#762D3C] text-[#FFFDF8] border-[#E6CB88]/75'
              : 'bg-[#FFFDF8] text-[#762D3C] border-[#C5A15A]'
          }`}
        >
          {event.badge}
        </span>

        <RoyalCrest size={54} className="mx-auto mt-4 opacity-90" />

        <h3
          className={`font-serif text-3xl sm:text-4xl text-center font-medium mt-2 ${
            isBurgundy ? 'text-[#762D3C]' : 'text-[#4A232C]'
          }`}
        >
          {event.title}
        </h3>
        <OrnamentalDivider className="my-3" />
      </div>

      {/* Card Body */}
      <div className="relative px-6 sm:px-10 py-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Animated Date & Time Blocks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl p-4 border ${
              isBurgundy
                ? 'bg-[#FFFDF8]/95 border-[#762D3C]/25'
                : 'bg-[#F7F0E5]/85 border-[#C5A15A]/45'
            }`}
          >
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isBurgundy
                    ? 'bg-[#762D3C] text-[#FFFDF8]'
                    : 'bg-[#C5A15A]/20 text-[#762D3C] border border-[#C5A15A]/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A98950] font-semibold">
                  Date
                </p>
                <p className="font-serif text-sm sm:text-base text-[#4A232C] font-medium">
                  {event.dateLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isBurgundy
                    ? 'bg-[#762D3C] text-[#FFFDF8]'
                    : 'bg-[#C5A15A]/20 text-[#762D3C] border border-[#C5A15A]/50'
                }`}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A98950] font-semibold">
                  {event.timeHeading}
                </p>
                <p className="font-serif text-sm sm:text-base text-[#762D3C] font-semibold">
                  {event.timeLabel}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Venue Details */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 text-[#762D3C] mb-1.5">
              <MapPin className="w-4 h-4 text-[#A98950]" />
              <span className="font-sans text-[11px] tracking-[0.22em] uppercase font-semibold">
                Venue
              </span>
            </div>
            <div className="font-serif text-base sm:text-lg text-[#4A232C] leading-relaxed">
              {event.venueLines.map((line, i) => (
                <p key={line} className={i === 0 ? 'font-semibold text-[#762D3C]' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center font-romantic text-lg sm:text-xl italic text-[#6E4750] leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 pt-6 border-t border-[#C5A15A]/30 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-sm ${
              isBurgundy
                ? 'bg-[#762D3C] text-[#FFFDF8] hover:bg-[#5E222E] border border-[#C5A15A]/60'
                : 'bg-[#C5A15A] text-[#FFFDF8] hover:bg-[#A98950] border border-[#A98950]'
            }`}
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => downloadIcsFile(event)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFDF8] hover:bg-[#E8D8C5]/60 text-[#4A232C] border border-[#C5A15A]/55 font-sans text-xs tracking-[0.16em] uppercase font-semibold cursor-pointer transition-colors"
            title="Download .ics calendar invite"
          >
            <Download className="w-3.5 h-3.5 text-[#A98950]" />
            <span>Save .ICS</span>
          </button>

          <a
            href={event.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F0E5] hover:bg-[#E8D8C5] text-[#762D3C] border border-[#762D3C]/35 font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export const CelebrationsSection: React.FC = () => {
  return (
    <section
      id="celebrations"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFDF8]/52 border-t border-[#C5A15A]/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Wedding Celebrations"
          title="Join Our Auspicious Gatherings"
          subtitle="Two joyous evenings of music, devotion, blessings, and celebratory feasts."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {weddingConfig.events.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
