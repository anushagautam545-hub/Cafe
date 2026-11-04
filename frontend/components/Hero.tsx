import React, { useState } from 'react';
import { Coffee, Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { CafeIllustration } from './CafeIllustration.js';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveNook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveNook }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E8DEC8]/60">
      {/* Background radial warmth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FDE68A]/30 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#F7ECE1] rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#8C6D58] uppercase">
              <span>Sunshine Artisan Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Laminated Viennoiserie</span>
              <span aria-hidden="true">·</span>
              <span>Sanctuary Since 2018</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#2C1810] tracking-tight leading-[1.12] text-balance">
              Slow mornings, golden roasts, and quiet sanctuary.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#5C4537] leading-relaxed max-w-2xl font-light">
              Welcome to <strong className="font-semibold text-[#2C1810]">Sunshine</strong> — an artisan coffee haven bathed in natural morning light. Enjoy single-origin estate brews from ₹190, golden buttery croissants fresh from the hearth, and quiet corner nooks to unwind.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
              >
                <Coffee className="w-4 h-4 text-[#FDE68A]" />
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onReserveNook}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#EFE8DD] text-[#2C1810] border border-[#D5C2B1] text-sm font-medium rounded-xl transition-all active:scale-95 whitespace-nowrap shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#B45309]" />
                <span>Reserve a Cozy Table</span>
              </button>
            </div>

            {/* Quiet trust strip */}
            <div className="pt-6 border-t border-[#E8DEC8]/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#705849]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B45309] shrink-0" />
                <div>
                  <div className="font-semibold text-[#2C1810]">Daily 7:00 AM – 8:00 PM</div>
                  <div className="text-[11px] text-[#8C6D58]">Fresh bakes out at 7:30 AM</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
                <div>
                  <div className="font-semibold text-[#2C1810]">418 Old Mill Courtyard</div>
                  <div className="text-[11px] text-[#8C6D58]">Quiet sunlit garden lane</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#15803D]" />
                <div>
                  <div className="font-semibold text-[#2C1810]">Kitchen Open Now</div>
                  <div className="text-[11px] text-[#8C6D58]">Avg. prep time 10–12m</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column (5 Cols) with Real Aesthetic Food Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DECDBB] group aspect-[4/3] lg:aspect-[1/1] bg-[#F5EDE3]">
              {!imgError ? (
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
                  alt="Aesthetic coffee table at Sunshine Cafe with golden croissants and latte"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <CafeIllustration type="hero" className="w-full h-full" />
              )}

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-black/20" />

              {/* Floating Aesthetic Badges */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8DEC8] flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                <span className="text-xs font-semibold text-[#2C1810] tracking-wide">Sunshine Estate Brews</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#DECDBB] shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#B45309] font-bold">
                    Signature Morning Flight
                  </div>
                  <div className="text-sm font-display font-bold text-[#2C1810]">
                    Orange Cappuccino & Brûléed Croissant
                  </div>
                </div>
                <div className="text-base font-bold text-[#2C1810] tabular-nums">
                  ₹450
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
