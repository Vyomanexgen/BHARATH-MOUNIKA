import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider } from './OrnamentalElements';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCelebrationTime: boolean;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCelebrationTime: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isCelebrationTime: false,
  };
}

const CounterMedallion: React.FC<{ value: number; label: string; delay: number }> = ({
  value,
  label,
  delay,
}) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FFFDF8] border-2 border-[#C5A15A]/70 shadow-[0_18px_40px_-16px_rgba(118,45,60,0.2)] flex flex-col items-center justify-center group">
        {/* Inner Ornamental Ring */}
        <div className="absolute inset-2 rounded-full border border-dashed border-[#C5A15A]/55 pointer-events-none group-hover:rotate-12 transition-transform duration-700" />
        {/* Top Royal Dot */}
        <span className="absolute -top-1.5 w-3 h-3 rounded-full bg-[#762D3C] border-2 border-[#FFFDF8]" />

        <div className="overflow-hidden h-11 sm:h-14 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={formatted}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-5xl text-[#762D3C] font-semibold tabular-nums"
            >
              {formatted}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="font-sans text-[10px] sm:text-xs tracking-[0.24em] uppercase text-[#A98950] font-semibold mt-1">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(weddingConfig.countdown.targetIso)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingConfig.countdown.targetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F0E5]/55 backdrop-blur-[1px] border-y border-[#C5A15A]/25"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.32em] uppercase text-[#762D3C] font-semibold mb-2">
            Counting Down To The Sacred Day
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A232C] font-medium">
            22 November 2026
          </h2>
          <OrnamentalDivider />
        </motion.div>

        {timeLeft.isCelebrationTime ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 max-w-2xl mx-auto rounded-3xl bg-[#FFFDF8] border-champagne-double px-8 py-10"
          >
            <p className="font-script text-4xl sm:text-5xl text-[#762D3C]">
              The Wedding Celebration Is Here
            </p>
            <p className="font-romantic text-xl text-[#6E4750] italic mt-3">
              We are delighted to celebrate this joyous occasion together with our cherished family and friends.
            </p>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center max-w-3xl mx-auto">
            {units.map((unit, idx) => (
              <CounterMedallion
                key={unit.label}
                value={unit.value}
                label={unit.label}
                delay={idx * 0.08}
              />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 font-romantic text-xl sm:text-2xl italic text-[#762D3C]"
        >
          &ldquo;{weddingConfig.countdown.caption}&rdquo;
        </motion.p>
      </div>
    </section>
  );
};

