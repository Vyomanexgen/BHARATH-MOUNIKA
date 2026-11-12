import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Heart,
  Loader2,
  Quote,
  Send,
} from 'lucide-react';
import { fetchApprovedWishes, submitWish, type WishRecord } from '../lib/api';
import { OrnamentalDivider, SectionHeading } from './OrnamentalElements';

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadWishes = useCallback(async () => {
    try {
      const data = await fetchApprovedWishes();
      setWishes(data);
    } catch {
      // Fail gracefully without fake mock entries
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWishes();
  }, [loadWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    setErrorMsg(null);

    const nameTrimmed = guestName.trim();
    const msgTrimmed = message.trim();

    if (nameTrimmed.length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (msgTrimmed.length < 5) {
      setErrorMsg('Please write a warm blessing (at least 5 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitWish({
        guestName: nameTrimmed,
        message: msgTrimmed,
      });
      setNotice(res.notice);
      if (res.wish.status === 'approved') {
        setWishes((prev) => [res.wish, ...prev]);
      }
      setGuestName('');
      setMessage('');
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to submit your blessing. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="wishes"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFDF8]/52 border-t border-[#C5A15A]/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Blessings & Wishes"
          title="Send Your Love & Blessings"
          subtitle="Share your warm prayers, wisdom, and joyful wishes for Bharath and Mounika."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-5 rounded-3xl bg-[#F7F0E5] border-champagne-double p-6 sm:p-8"
          >
            <h3 className="font-serif text-2xl text-[#4A232C] font-medium text-center">
              Leave a Blessing
            </h3>
            <OrnamentalDivider className="my-3" />

            <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
              <div>
                <label
                  htmlFor="wish-name"
                  className="block font-sans text-xs tracking-[0.18em] uppercase text-[#762D3C] font-semibold mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF8] border border-[#C5A15A]/55 focus:border-[#762D3C] focus:ring-2 focus:ring-[#C5A15A]/30 outline-none text-[#4A232C] placeholder:text-[#6E4750]/55 font-sans text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="wish-message"
                  className="block font-sans text-xs tracking-[0.18em] uppercase text-[#762D3C] font-semibold mb-2"
                >
                  Your Blessing or Message *
                </label>
                <textarea
                  id="wish-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a heartfelt blessing for the couple..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF8] border border-[#C5A15A]/55 focus:border-[#762D3C] focus:ring-2 focus:ring-[#C5A15A]/30 outline-none text-[#4A232C] placeholder:text-[#6E4750]/55 font-sans text-sm resize-none"
                />
              </div>

              {errorMsg && (
                <p className="rounded-xl bg-[#762D3C]/10 border border-[#762D3C]/30 px-4 py-2.5 text-xs sm:text-sm text-[#762D3C]">
                  {errorMsg}
                </p>
              )}

              {notice && (
                <div className="rounded-xl bg-[#FFFDF8] border border-[#C5A15A] px-4 py-3 text-xs sm:text-sm text-[#4A232C] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#762D3C] shrink-0 mt-0.5" />
                  <span>{notice}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#762D3C] hover:bg-[#5E222E] text-[#FFFDF8] font-sans text-xs tracking-[0.2em] uppercase font-semibold border border-[#C5A15A]/70 shadow-sm cursor-pointer transition-colors disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Blessing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#E6CB88]" />
                    <span>Send Blessing</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Blessings Wall */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="rounded-3xl bg-[#F7F0E5]/70 border border-[#C5A15A]/40 p-12 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#762D3C] mx-auto" />
                <p className="font-romantic text-lg italic text-[#6E4750] mt-3">
                  Loading cherished blessings...
                </p>
              </div>
            ) : wishes.length === 0 ? (
              <div className="rounded-3xl bg-[#F7F0E5]/70 border border-[#C5A15A]/40 p-12 text-center">
                <Heart className="w-8 h-8 text-[#C99A9A] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#4A232C]">
                  Be the first to share a blessing
                </p>
                <p className="font-romantic text-lg italic text-[#6E4750] mt-1">
                  Warm wishes from loved ones will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <AnimatePresence>
                  {wishes.map((wish, idx) => (
                    <motion.article
                      key={wish.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: Math.min(idx * 0.06, 0.3) }}
                      className="rounded-2xl bg-[#F7F0E5]/85 border border-[#C5A15A]/50 p-6 shadow-[0_14px_34px_-18px_rgba(118,45,60,0.18)] flex flex-col justify-between relative"
                    >
                      <Quote className="w-6 h-6 text-[#C5A15A]/50 mb-2" />
                      <p className="font-romantic text-lg sm:text-xl italic text-[#4A232C] leading-relaxed">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                      <div className="mt-4 pt-3 border-t border-[#C5A15A]/25 flex items-center justify-between gap-2">
                        <span className="font-serif text-sm sm:text-base text-[#762D3C] font-semibold">
                          {wish.guestName}
                        </span>
                        <Heart className="w-3.5 h-3.5 text-[#C99A9A] fill-[#C99A9A]" />
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
