import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { MenuItem } from '../types/index.js';
import { CafeIllustration } from './CafeIllustration.js';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'dairy-free' | 'gluten-free'>('all');
  const [loading, setLoading] = useState(true);
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeCategory !== 'all') params.append('category', activeCategory);
        if (searchQuery) params.append('search', searchQuery);
        if (dietaryFilter !== 'all') params.append('dietary', dietaryFilter);

        const res = await fetch(`/api/menu?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [activeCategory, searchQuery, dietaryFilter]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/menu/meta/categories');
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    loadCategories();
  }, []);

  const handleImageError = (id: string) => {
    setFailedImageIds((prev) => ({ ...prev, [id]: true }));
  };

  const getCardIllustrationType = (id: string): 'pourover' | 'cappuccino' | 'matcha' | 'croissant' | 'fireplace' => {
    if (id.includes('chemex') || id.includes('drip')) return 'pourover';
    if (id.includes('matcha')) return 'matcha';
    if (id.includes('croissant') || id.includes('babka') || id.includes('bun')) return 'croissant';
    return 'cappuccino';
  };

  return (
    <section id="menu" className="py-16 md:py-24 border-b border-[#E8DEC8]/60 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase mb-1">
            Handcrafted Provisions
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2C1810] tracking-tight">
            Sunshine Menu & Bakes
          </h2>
          <p className="text-sm md:text-base text-[#6B5143] mt-2">
            Every specialty roast is calibrated daily; every brioche and sourdough tartine is made fresh with pure ingredients. Prices in Indian Rupees (₹).
          </p>
        </div>

        {/* Filter Controls Row: Search + Category Segments + Dietary */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Interactive Category Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#2C1810] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F2EAE0] text-[#6B5143] hover:text-[#2C1810] hover:bg-[#EAE0D4]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Dietary Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#8C6D58] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flavors, beans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] placeholder-[#A89382] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#F2EAE0] p-1 rounded-xl">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  dietaryFilter === 'all' ? 'bg-white text-[#2C1810] shadow-xs' : 'text-[#7A6150]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('gluten-free')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  dietaryFilter === 'gluten-free' ? 'bg-white text-[#2C1810] shadow-xs' : 'text-[#7A6150]'
                }`}
              >
                Gluten-Free
              </button>
              <button
                onClick={() => setDietaryFilter('dairy-free')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  dietaryFilter === 'dairy-free' ? 'bg-white text-[#2C1810] shadow-xs' : 'text-[#7A6150]'
                }`}
              >
                Dairy-Free
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid with Real Aesthetic Food Photography */}
        {loading ? (
          <div className="py-16 text-center text-sm text-[#8C6D58]">
            <div className="animate-spin w-6 h-6 border-2 border-[#78350F] border-t-transparent rounded-full mx-auto mb-3" />
            <span>Infusing flavor profiles...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#DECDBB] p-8 max-w-md mx-auto">
            <p className="text-base font-semibold text-[#2C1810]">No items match your filter</p>
            <p className="text-xs text-[#7A6150] mt-1 mb-4">Try clearing your search term or selecting another category.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="px-4 py-2 bg-[#2C1810] text-[#FAF7F2] text-xs font-medium rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-[#DECDBB] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Real Aesthetic Food Image */}
                <div
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-[#F5EDE3]"
                  onClick={() => onSelectItem(item)}
                >
                  {!failedImageIds[item.id] && item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <CafeIllustration
                      type={getCardIllustrationType(item.id)}
                      className="w-full h-full"
                    />
                  )}

                  {/* Badges */}
                  {item.badge && (
                    <div className="absolute top-4 left-4 bg-[#2C1810]/85 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-sm">
                      {item.badge}
                    </div>
                  )}

                  {item.origin && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#2C1810] text-[11px] font-medium px-2.5 py-0.5 rounded-md shadow-xs">
                      {item.origin}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata Line with · separators */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8C6D58] mb-1.5">
                      {item.roast && <span>{item.roast} Roast</span>}
                      {item.roast && <span aria-hidden="true">·</span>}
                      <span>{item.prepTimeMinutes}m prep</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-medium text-[#B45309]">★ {item.rating}</span>
                    </div>

                    <h3
                      onClick={() => onSelectItem(item)}
                      className="text-lg font-display font-bold text-[#2C1810] group-hover:text-[#B45309] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#6B5143] mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting notes list */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#F2ECE3] text-[11px] text-[#7A6150]">
                        <span className="font-medium text-[#2C1810]">Notes:</span>
                        {item.tastingNotes.join(' · ')}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row in Rupees (₹) */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xl font-bold text-[#2C1810] tabular-nums">
                      ₹{item.price}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3.5 py-2 text-xs font-medium text-[#5C4537] hover:text-[#2C1810] bg-[#FAF7F2] hover:bg-[#EFE5D7] border border-[#DECDBB] rounded-xl transition-all"
                      >
                        Customize
                      </button>

                      <button
                        onClick={() => onQuickAdd(item)}
                        className="p-2 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] rounded-xl shadow-xs transition-all active:scale-95"
                        title="Add to order bag"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
