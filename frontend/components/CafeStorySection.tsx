import React from 'react';
import { HeartHandshake, Flame, Compass } from 'lucide-react';
import { CafeIllustration } from './CafeIllustration.js';

export const CafeStorySection: React.FC = () => {
  return (
    <section id="craft" className="py-16 md:py-24 border-b border-[#E8DEC8]/60 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column with Real Aesthetic Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#DECDBB] aspect-[4/3] bg-[#F5EDE3]">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan coffee beans and pour over at Sunshine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story Text Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
              The Sunshine Philosophy
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2C1810] tracking-tight leading-tight">
              Crafted slowly with natural warmth.
            </h2>

            <p className="text-sm md:text-base text-[#5C4537] leading-relaxed">
              <strong className="text-[#2C1810]">Sunshine</strong> was founded to bring back slow, joyful coffee rituals. We partner directly with organic family-owned estates in Chikmagalur, Araku Valley, and Boquete highlands. Every batch is micro-roasted in small batches to highlight intrinsic fruit, floral, and cacao esters.
            </p>

            <p className="text-sm md:text-base text-[#5C4537] leading-relaxed">
              Our bakery rolls out French butter croissants, babka knots, and sourdough loaves fresh every dawn at 5:00 AM. In a bustling city, Sunshine provides an unhurried sanctuary to work, read, or gather over warm cups.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8DEC8]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2C1810]">
                  <HeartHandshake className="w-4 h-4 text-[#B45309]" />
                  <span>Estate Direct</span>
                </div>
                <p className="text-xs text-[#7A6150] leading-normal">
                  Direct partnerships with generational growers, ensuring sustainable fair remuneration.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2C1810]">
                  <Flame className="w-4 h-4 text-[#B45309]" />
                  <span>Micro Roasting</span>
                </div>
                <p className="text-xs text-[#7A6150] leading-normal">
                  Roasted in 5kg drum batches for maximum sweetness and aromatic clarity.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2C1810]">
                  <Compass className="w-4 h-4 text-[#B45309]" />
                  <span>Acoustic Comfort</span>
                </div>
                <p className="text-xs text-[#7A6150] leading-normal">
                  Warm natural lighting, quiet reading corners, and serene neighborhood ambience.
                </p>
              </div>
            </div>

            {/* Quantitative Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E8DEC8] text-center">
              <div className="p-3 bg-white rounded-2xl border border-[#DECDBB]">
                <div className="text-2xl font-bold font-display text-[#2C1810] tabular-nums">100%</div>
                <div className="text-[11px] text-[#8C6D58] font-medium mt-0.5">Specialty Grade</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#DECDBB]">
                <div className="text-2xl font-bold font-display text-[#2C1810] tabular-nums">&lt;48h</div>
                <div className="text-[11px] text-[#8C6D58] font-medium mt-0.5">Roaster to Cup</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#DECDBB]">
                <div className="text-2xl font-bold font-display text-[#2C1810] tabular-nums">From ₹180</div>
                <div className="text-[11px] text-[#8C6D58] font-medium mt-0.5">Artisan Bakes</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-[#DECDBB]">
                <div className="text-2xl font-bold font-display text-[#2C1810] tabular-nums">4</div>
                <div className="text-[11px] text-[#8C6D58] font-medium mt-0.5">Sanctuary Nooks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
