import React, { useState } from 'react';
import { Sparkles, Heart, Plus } from 'lucide-react';
import { MenuItem } from '../types/index.js';
import { CafeIllustration } from './CafeIllustration.js';

interface BaristaQuizProps {
  onAddPairToCart: (drink: MenuItem, pastry: MenuItem) => void;
}

export const BaristaQuizSection: React.FC<BaristaQuizProps> = ({ onAddPairToCart }) => {
  const [selectedMood, setSelectedMood] = useState('foggy-morning');
  const [selectedFlavor, setSelectedFlavor] = useState('warm-spice');
  const [selectedCaffeine, setSelectedCaffeine] = useState('regular');
  const [loading, setLoading] = useState(false);
  const [drinkImgErr, setDrinkImgErr] = useState(false);
  const [pastryImgErr, setPastryImgErr] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    drink: MenuItem;
    pastry: MenuItem;
    baristaNote: string;
    matchReason: string;
  } | null>(null);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      setDrinkImgErr(false);
      setPastryImgErr(false);
      const res = await fetch('/api/barista/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMood,
          flavorProfile: selectedFlavor,
          caffeineLevel: selectedCaffeine
        })
      });
      const data = await res.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      }
    } catch (err) {
      console.error('Failed to get recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIllustrationType = (id: string): 'pourover' | 'cappuccino' | 'matcha' | 'croissant' | 'fireplace' => {
    if (id.includes('chemex') || id.includes('drip')) return 'pourover';
    if (id.includes('matcha')) return 'matcha';
    if (id.includes('croissant') || id.includes('bun') || id.includes('babka')) return 'croissant';
    return 'cappuccino';
  };

  return (
    <section id="barista" className="py-16 md:py-24 border-b border-[#E8DEC8]/60 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase mb-1">
            Personalized Flavor Pairing
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2C1810] tracking-tight">
            The Sunshine Barista’s Palette
          </h2>
          <p className="text-sm md:text-base text-[#6B5143] mt-2">
            Share what you are feeling today, and let our roaster pair your drink and bakery creation with sensory tasting notes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#DECDBB] shadow-sm space-y-6">
            {/* Step 1: Mood */}
            <div>
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                1. What is your morning or afternoon vibe?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'foggy-morning', label: '🌫️ Misty & Rainy' },
                  { id: 'deep-focus', label: '📖 Deep Focus & Reading' },
                  { id: 'sweet-indulgence', label: '🍫 Sweet Indulgence' },
                  { id: 'gentle-calm', label: '🌿 Gentle Calm & Light' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all ${
                      selectedMood === m.id
                        ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor Profile */}
            <div>
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                2. Flavor Notes You Crave
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'warm-spice', label: 'Spiced Cardamom & Honey' },
                  { id: 'citrus-floral', label: 'Bergamot, Peach & Flora' },
                  { id: 'silky-sweet', label: 'Smoked Vanilla & Cacao' },
                  { id: 'earthy', label: 'Umami Matcha & Lavender' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFlavor(f.id)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                      selectedFlavor === f.id
                        ? 'bg-[#78350F] text-white border-[#78350F] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Caffeine */}
            <div>
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                3. Energy & Caffeine
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'regular', label: 'Double Espresso' },
                  { id: 'gentle', label: 'Gentle (Matcha/Tea)' },
                  { id: 'decaf', label: 'Smooth Decaf' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaffeine(c.id)}
                    className={`py-2 px-1 rounded-xl border text-center font-medium transition-all ${
                      selectedCaffeine === c.id
                        ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810]'
                        : 'bg-[#FAF7F2] text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={fetchRecommendation}
              disabled={loading}
              className="w-full py-3.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] font-medium text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FDE68A]" />
              <span>{loading ? 'Consulting Sunshine Barista...' : 'Pair My Drink & Pastry'}</span>
            </button>
          </div>

          {/* Results Column (7 cols) with Real Photos & Rupees */}
          <div className="lg:col-span-7">
            {recommendation ? (
              <div className="bg-[#FAF5EF] rounded-3xl border border-[#DECDBB] p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Curated Sunshine Pairing</span>
                </div>

                {/* Barista Note Quote */}
                <div className="p-4 rounded-2xl bg-white/90 border border-[#E8DEC8] italic text-sm text-[#4A3428] leading-relaxed">
                  &ldquo;{recommendation.baristaNote}&rdquo;
                </div>

                {/* Paired Items Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Drink Card */}
                  <div className="bg-white p-4 rounded-2xl border border-[#DECDBB] space-y-3">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EDE3]">
                      {!drinkImgErr && recommendation.drink.imageUrl ? (
                        <img
                          src={recommendation.drink.imageUrl}
                          alt={recommendation.drink.name}
                          referrerPolicy="no-referrer"
                          onError={() => setDrinkImgErr(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CafeIllustration type={getIllustrationType(recommendation.drink.id)} className="w-full h-full" />
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D58]">
                        The Brew
                      </div>
                      <h4 className="font-display font-bold text-base text-[#2C1810]">
                        {recommendation.drink.name}
                      </h4>
                      <p className="text-xs text-[#6B5143] mt-1 line-clamp-2">
                        {recommendation.drink.description}
                      </p>
                      <div className="mt-2 text-sm font-bold text-[#2C1810] tabular-nums">
                        ₹{recommendation.drink.price}
                      </div>
                    </div>
                  </div>

                  {/* Pastry Card */}
                  <div className="bg-white p-4 rounded-2xl border border-[#DECDBB] space-y-3">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EDE3]">
                      {!pastryImgErr && recommendation.pastry.imageUrl ? (
                        <img
                          src={recommendation.pastry.imageUrl}
                          alt={recommendation.pastry.name}
                          referrerPolicy="no-referrer"
                          onError={() => setPastryImgErr(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CafeIllustration type={getIllustrationType(recommendation.pastry.id)} className="w-full h-full" />
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D58]">
                        The Counterpart Bake
                      </div>
                      <h4 className="font-display font-bold text-base text-[#2C1810]">
                        {recommendation.pastry.name}
                      </h4>
                      <p className="text-xs text-[#6B5143] mt-1 line-clamp-2">
                        {recommendation.pastry.description}
                      </p>
                      <div className="mt-2 text-sm font-bold text-[#2C1810] tabular-nums">
                        ₹{recommendation.pastry.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Combined Add-to-Cart Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-[#7A6150]">
                    Total Pairing: <strong className="text-base font-bold text-[#2C1810] tabular-nums">₹{recommendation.drink.price + recommendation.pastry.price}</strong>
                  </div>

                  <button
                    onClick={() => onAddPairToCart(recommendation.drink, recommendation.pastry)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] text-xs font-medium rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Complete Pairing to Bag</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF5EF] rounded-3xl border border-dashed border-[#D4C3B3] p-12 text-center text-[#7A6150] space-y-3">
                <Sparkles className="w-10 h-10 text-[#A89382] mx-auto opacity-70" />
                <h4 className="font-display font-bold text-lg text-[#2C1810]">
                  Select your preferences on the left
                </h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  Click &ldquo;Pair My Drink & Pastry&rdquo; and Sunshine will construct your ideal taste balance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
