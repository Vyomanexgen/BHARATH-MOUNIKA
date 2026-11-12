import React from 'react';
import { motion } from 'framer-motion';
import { Car, Compass, MapPin, Navigation } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, SectionHeading } from './OrnamentalElements';

export const VenuesSection: React.FC = () => {
  return (
    <section
      id="venues"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFDF8]/52 border-t border-[#C5A15A]/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Destinations & Travel"
          title="Venues & Directions"
          subtitle="We look forward to welcoming you warmly in Tirupati and Tirumala."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {weddingConfig.events.map((event, idx) => {
            const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
              event.mapEmbedQuery
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#F7F0E5] border-champagne-double p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#FFFDF8] border border-[#C5A15A]/55 font-sans text-[10px] tracking-[0.22em] uppercase text-[#762D3C] font-semibold">
                      {event.id === 'reception' ? 'Reception Venue' : 'Wedding Venue'}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#4A232C] mt-3 font-medium">
                      {event.venueName}
                    </h3>
                    <OrnamentalDivider className="my-3" />
                  </div>

                  {/* Full Venue Address */}
                  <div className="flex items-start gap-3 rounded-2xl bg-[#FFFDF8] border border-[#C5A15A]/40 p-4 mt-4">
                    <MapPin className="w-5 h-5 text-[#762D3C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A98950] font-semibold">
                        Full Address
                      </p>
                      <p className="font-serif text-base text-[#4A232C] leading-relaxed mt-1">
                        {event.fullAddress}
                      </p>
                    </div>
                  </div>

                  {/* Embedded Google Map */}
                  <div className="mt-5 rounded-2xl overflow-hidden border border-[#C5A15A]/60 bg-[#FFFDF8] p-1.5 shadow-sm">
                    <iframe
                      title={`Map to ${event.venueName}`}
                      src={embedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-60 sm:h-64 rounded-xl border-0"
                    />
                  </div>

                  {/* Parking & Travel Information Placeholders */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#FFFDF8]/90 border border-[#C5A15A]/35 p-4">
                      <div className="flex items-center gap-2 text-[#762D3C] mb-1.5">
                        <Car className="w-4 h-4 text-[#A98950]" />
                        <span className="font-sans text-[10px] tracking-[0.18em] uppercase font-semibold">
                          Parking Information
                        </span>
                      </div>
                      <p className="font-romantic text-sm sm:text-base italic text-[#6E4750] leading-snug">
                        {event.travelPlaceholder.parking}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FFFDF8]/90 border border-[#C5A15A]/35 p-4">
                      <div className="flex items-center gap-2 text-[#762D3C] mb-1.5">
                        <Compass className="w-4 h-4 text-[#A98950]" />
                        <span className="font-sans text-[10px] tracking-[0.18em] uppercase font-semibold">
                          Travel Information
                        </span>
                      </div>
                      <p className="font-romantic text-sm sm:text-base italic text-[#6E4750] leading-snug">
                        {event.travelPlaceholder.travel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="mt-6 text-center">
                  <a
                    href={event.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3 rounded-full bg-[#762D3C] hover:bg-[#5E222E] text-[#FFFDF8] font-sans text-xs tracking-[0.2em] uppercase font-semibold border border-[#C5A15A]/70 shadow-sm transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#E6CB88]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

