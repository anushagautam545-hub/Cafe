import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.js';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#2C1810] hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Sunshine</span>
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#6B5143]">
          <a
            href="#menu"
            className="hover:text-[#2C1810] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Artisan Menu
          </a>
          <a
            href="#reservations"
            className="hover:text-[#2C1810] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Cozy Nooks
          </a>
          <a
            href="#barista"
            className="hover:text-[#2C1810] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Barista Match
          </a>
          <a
            href="#craft"
            className="hover:text-[#2C1810] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Our Roastery
          </a>
          <a
            href="#reviews"
            className="hover:text-[#2C1810] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Guest Stories
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Bag / Order button with count) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs md:text-sm font-medium text-white bg-[#2C1810] hover:bg-[#432519] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#F5EFE6]" />
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="bg-[#B45309] text-white text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
