import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types/index.js';
import { CafeIllustration } from './CafeIllustration.js';

interface DrinkCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: MenuItem, customization: CustomizationOptions, quantity: number) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !item) return null;

  const isCoffeeOrTea = item.category === 'coffee' || item.category === 'pour-over' || item.category === 'seasonal' || item.category === 'tea';

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    item.temperatureOptions?.includes('Hot') ? 'Hot' : item.temperatureOptions?.[0] || 'Hot'
  );
  const [milk, setMilk] = useState<CustomizationOptions['milk']>(
    item.milkOptionsAvailable ? 'Oat Velvet' : undefined
  );
  const [sweetness, setSweetness] = useState<CustomizationOptions['sweetness']>(
    isCoffeeOrTea ? 'Regular (50%)' : undefined
  );
  const [extraShots, setExtraShots] = useState(0);
  const [specialNotes, setSpecialNotes] = useState('');
  const [imgFailed, setImgFailed] = useState(false);

  // Calculate pricing in Indian Rupees (₹)
  let addOns = 0;
  if (extraShots > 0) addOns += extraShots * 50; // ₹50 per extra shot
  if (milk === 'Oat Velvet' || milk === 'Pistachio Milk' || milk === 'Macadamia') addOns += 45; // ₹45 for plant milk
  const unitPrice = item.price + addOns;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onConfirm(
      item,
      {
        temperature: item.temperatureOptions?.length ? temperature : undefined,
        milk: item.milkOptionsAvailable ? milk : undefined,
        sweetness: isCoffeeOrTea ? sweetness : undefined,
        extraShots: extraShots > 0 ? extraShots : undefined,
        specialNotes: specialNotes.trim() || undefined
      },
      quantity
    );
    onClose();
  };

  const getIllustrationType = (id: string): 'pourover' | 'cappuccino' | 'matcha' | 'croissant' | 'fireplace' => {
    if (id.includes('chemex') || id.includes('drip')) return 'pourover';
    if (id.includes('matcha')) return 'matcha';
    if (id.includes('croissant') || id.includes('bun') || id.includes('babka')) return 'croissant';
    return 'cappuccino';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C0F0A]/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECDBB] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-[#2C1810] my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6150] hover:text-[#2C1810] hover:bg-[#EFE5D7] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto pr-1 space-y-6 flex-1">
          {/* Header & Product Spotlight */}
          <div className="flex gap-4 items-start pb-4 border-b border-[#E8DEC8]">
            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-[#F5EDE3]">
              {!imgFailed && item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CafeIllustration type={getIllustrationType(item.id)} className="w-full h-full" />
              )}
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase">
                {item.origin || item.category}
              </div>
              <h3 className="text-xl font-display font-bold text-[#2C1810]">
                {item.name}
              </h3>
              <p className="text-xs text-[#6B5143] mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="text-sm font-semibold text-[#2C1810] mt-2 tabular-nums">
                Base ₹{item.price}
              </div>
            </div>
          </div>

          {/* Temperature Choice (if applicable) */}
          {item.temperatureOptions && item.temperatureOptions.length > 1 && (
            <div>
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                Preparation Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.temperatureOptions.map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setTemperature(temp)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-medium border transition-all text-center ${
                      temperature === temp
                        ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810] shadow-sm'
                        : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    {temp === 'Hot' ? '☕ Piping Hot' : '🧊 Over Crushed Ice'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options (if applicable) */}
          {item.milkOptionsAvailable && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#7A6150] uppercase tracking-wider">
                  Milk & Plant Velvet
                </label>
                <span className="text-[11px] text-[#8C6D58]">Plant craft +₹45</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Oat Velvet', label: 'Oat Velvet', extra: '+₹45' },
                  { id: 'Whole Milk', label: 'Whole Dairy', extra: 'Standard' },
                  { id: 'Pistachio Milk', label: 'Pistachio', extra: '+₹45' },
                  { id: 'Almond Cream', label: 'Almond Cream', extra: '+₹45' },
                  { id: 'Macadamia', label: 'Macadamia', extra: '+₹45' },
                  { id: 'No Milk', label: 'No Milk (Black)', extra: '' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMilk(opt.id as CustomizationOptions['milk'])}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      milk === opt.id
                        ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810]'
                        : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    <div className="font-medium">{opt.label}</div>
                    <div className="text-[10px] opacity-75">{opt.extra}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness / Syrups */}
          {isCoffeeOrTea && (
            <div>
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                Sweetness & Infusions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Unsweetened',
                  'Light (25%)',
                  'Regular (50%)',
                  'Madagascar Vanilla',
                  'Spiced Brown Sugar',
                  'Wildflower Honey'
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSweetness(s as CustomizationOptions['sweetness'])}
                    className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      sweetness === s
                        ? 'bg-[#78350F] text-white border-[#78350F]'
                        : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Espresso Shots */}
          {item.category === 'coffee' && (
            <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#E4D4C4] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#2C1810]">Extra Espresso Shot</div>
                <div className="text-[11px] text-[#7A6150]">Pulled from our dark estate blend (+₹50)</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={extraShots <= 0}
                  onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                  className="p-1.5 rounded-lg bg-white border border-[#D5C2B1] text-[#2C1810] disabled:opacity-40 hover:bg-[#FAF7F2]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold tabular-nums w-4 text-center">{extraShots}</span>
                <button
                  type="button"
                  onClick={() => setExtraShots(extraShots + 1)}
                  className="p-1.5 rounded-lg bg-white border border-[#D5C2B1] text-[#2C1810] hover:bg-[#FAF7F2]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
              Note for Barista
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, light ice, separate bag for pastry..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] focus:outline-none focus:ring-1 focus:ring-[#78350F] text-[#2C1810]"
            />
          </div>
        </div>

        {/* Bottom Sticky Action Footer */}
        <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between gap-4 mt-2">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white border border-[#DECDBB] rounded-xl px-3 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="text-[#7A6150] hover:text-[#2C1810] disabled:opacity-30"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold tabular-nums w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#7A6150] hover:text-[#2C1810]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-between px-6 py-3 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] rounded-xl font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>Add to Order Bag</span>
            <span className="tabular-nums font-bold tracking-tight">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
