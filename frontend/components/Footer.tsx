import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#24130C] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D2014]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E2417]">
          {/* Brand & Manifesto (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-display font-bold text-[#FAF7F2]">
              Sunshine
            </h3>
            <p className="text-xs sm:text-sm text-[#C4B1A0] leading-relaxed max-w-sm">
              An analog neighborhood roastery and coffee retreat dedicated to estate-grown varietals, fresh French viennoiserie, and the slow art of peaceful morning light.
            </p>
            <div className="text-xs text-[#E8D8C8] flex items-center gap-1.5 pt-2">
              <span>Made with care for bright mornings</span>
              <Heart className="w-3.5 h-3.5 text-[#EAB308] fill-current" />
            </div>
          </div>

          {/* Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4C3B3]">
              Hours & Hearth
            </h4>
            <div className="text-xs text-[#C4B1A0] space-y-2">
              <div>
                <span className="block font-medium text-[#FAF7F2]">Monday — Friday</span>
                <span>07:00 AM — 08:00 PM</span>
              </div>
              <div>
                <span className="block font-medium text-[#FAF7F2]">Saturday — Sunday</span>
                <span>08:00 AM — 09:00 PM</span>
              </div>
              <div className="pt-1 text-[11px] text-[#A89382]">
                Bakery and sourdough tartine service fresh all day.
              </div>
            </div>
          </div>

          {/* Location & Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4C3B3]">
              Sanctuary Location
            </h4>
            <div className="text-xs text-[#C4B1A0] space-y-2">
              <p className="leading-relaxed">
                418 Old Mill Courtyard<br />
                Cobblestone North Lane<br />
                Suite 12B
              </p>
              <p className="text-[11px] text-[#A89382]">
                Bicycle racks & garden seating available.
              </p>
            </div>
          </div>

          {/* Newsletter / Seasonal Roasts Drop (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4C3B3]">
              The Roaster&apos;s Dispatch
            </h4>
            <p className="text-xs text-[#C4B1A0] leading-relaxed">
              Quiet notes on seasonal harvest drops, holiday brioche releases, and tasting flights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#331C11] border border-[#4D2D1D] text-[#FAF7F2] placeholder-[#8C6D58] focus:outline-none focus:ring-1 focus:ring-[#D4C3B3]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#FAF7F2] text-[#2C1810] hover:bg-[#EFE5D7] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-[#10B981] font-medium">
                  Welcome to our quiet roaster circle.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C6D58] gap-4">
          <p>© {new Date().getFullYear()} Sunshine Coffee Roasters & Bakery. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#menu" className="hover:text-[#D4C3B3] transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-[#D4C3B3] transition-colors">Reservations</a>
            <a href="#craft" className="hover:text-[#D4C3B3] transition-colors">Direct Trade</a>
            <a href="#reviews" className="hover:text-[#D4C3B3] transition-colors">Guest Stories</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
