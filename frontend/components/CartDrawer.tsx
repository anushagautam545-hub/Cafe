import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  User,
  Home,
  UtensilsCrossed,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { CustomerDetails } from '../types/index.js';
import { CafeIllustration } from './CafeIllustration.js';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    cartCount,
    placeOrder,
    activeOrder,
    setActiveOrder
  } = useCart();

  // Customer Details Form State
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine-in'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card_online' | 'counter_pay'>('upi');
  const [tip, setTip] = useState<number>(30); // ₹30 default tip
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState<'items' | 'checkout'>('items');

  if (!isCartOpen) return null;

  // 5% standard restaurant GST
  const tax = Math.round(subtotal * 0.05);
  const deliveryFee = orderType === 'delivery' ? 40 : 0; // ₹40 delivery fee
  const finalTotal = subtotal + tax + tip + deliveryFee;

  const handleProceedToDetails = () => {
    if (cart.length === 0) return;
    setStep('checkout');
    setErrorMsg('');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter a contact mobile number.');
      return;
    }
    if (orderType === 'delivery') {
      if (!address.trim()) {
        setErrorMsg('Please enter your delivery street address / locality.');
        return;
      }
      if (!pincode.trim()) {
        setErrorMsg('Please provide a 6-digit delivery pincode.');
        return;
      }
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setErrorMsg('Please enter your table number.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    const customerDetails: CustomerDetails = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      orderType,
      flatNo: flatNo.trim() || undefined,
      address: address.trim() || undefined,
      landmark: landmark.trim() || undefined,
      city: city.trim() || undefined,
      pincode: pincode.trim() || undefined,
      tableNumber: tableNumber.trim() || undefined,
      instructions: instructions.trim() || undefined
    };

    try {
      await placeOrder(customerDetails, paymentMethod, tip);
      // activeOrder is now populated in context
      setStep('items');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not place order. Please try again.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const getIllustrationType = (id: string): 'pourover' | 'cappuccino' | 'matcha' | 'croissant' | 'fireplace' => {
    if (id.includes('chemex') || id.includes('drip')) return 'pourover';
    if (id.includes('matcha')) return 'matcha';
    if (id.includes('croissant') || id.includes('bun') || id.includes('babka')) return 'croissant';
    return 'cappuccino';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1C0F0A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-[#DECDBB] text-[#2C1810]">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B45309]" />
            <h3 className="font-display font-bold text-lg text-[#2C1810]">
              {activeOrder
                ? 'Order Confirmation'
                : step === 'checkout'
                ? 'Delivery & Customer Details'
                : `Your Order Bag ${cartCount > 0 ? `(${cartCount})` : ''}`}
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-[#7A6150] hover:text-[#2C1810] hover:bg-[#EFE5D7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- STATE 1: ORDER SUCCESSFULLY PLACED SCREEN --- */}
        {activeOrder ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="text-center pt-2">
              <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="inline-block bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Order Successfully Placed! 🎉
              </div>
              <h4 className="text-2xl font-display font-bold text-[#2C1810]">
                {activeOrder.orderNumber}
              </h4>
              <p className="text-xs text-[#7A6150] mt-1">
                Thank you, <strong className="text-[#2C1810]">{activeOrder.customerDetails.name}</strong>! Sunshine baristas and chefs have received your order.
              </p>
            </div>

            {/* Delivery / Pickup Address Confirmation Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#DECDBB] shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-2">
                <span className="font-bold uppercase tracking-wider text-[#B45309]">
                  {activeOrder.customerDetails.orderType === 'delivery'
                    ? '🛵 Doorstep Delivery'
                    : activeOrder.customerDetails.orderType === 'dine-in'
                    ? '🪑 Dine-in Table Service'
                    : '☕ Takeaway Counter Pickup'}
                </span>
                <span className="text-[#059669] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded-md">
                  Est: {activeOrder.estimatedTime}
                </span>
              </div>

              {activeOrder.customerDetails.orderType === 'delivery' && (
                <div>
                  <div className="text-[#7A6150] font-medium mb-0.5">Delivery Address:</div>
                  <div className="font-semibold text-[#2C1810] leading-relaxed">
                    {activeOrder.customerDetails.flatNo && `${activeOrder.customerDetails.flatNo}, `}
                    {activeOrder.customerDetails.address}
                    {activeOrder.customerDetails.landmark && ` (Near ${activeOrder.customerDetails.landmark})`}
                    {activeOrder.customerDetails.city && `, ${activeOrder.customerDetails.city}`}
                    {activeOrder.customerDetails.pincode && ` - ${activeOrder.customerDetails.pincode}`}
                  </div>
                </div>
              )}

              {activeOrder.customerDetails.orderType === 'dine-in' && (
                <div>
                  <div className="text-[#7A6150] font-medium">Table Assignment:</div>
                  <div className="font-semibold text-[#2C1810]">{activeOrder.customerDetails.tableNumber}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2ECE3] text-[11px]">
                <div>
                  <span className="text-[#8C6D58] block">Phone:</span>
                  <span className="font-semibold text-[#2C1810]">{activeOrder.customerDetails.phone}</span>
                </div>
                <div>
                  <span className="text-[#8C6D58] block">Payment:</span>
                  <span className="font-semibold text-[#2C1810] uppercase">
                    {activeOrder.paymentMethod === 'upi'
                      ? 'UPI / GPay'
                      : activeOrder.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : activeOrder.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {/* Brewing & Preparation Live Steps */}
            <div className="p-4 rounded-2xl bg-[#FAF5EF] border border-[#DECDBB] space-y-3">
              <div className="text-xs font-bold text-[#78350F] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Live Status Tracker</span>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  { title: 'Order Accepted & Verified', desc: 'Dispatched to Sunshine Kitchen', done: true },
                  { title: 'Pulling Espresso Shots & Lamination', desc: 'Crafting microfoam & warming pastries', done: true },
                  { title: 'Quality Check & Eco-Packing', desc: 'Sealed fresh in thermal containers', done: false },
                  { title: 'Out for Delivery / Counter Call', desc: 'On its way to you', done: false }
                ].map((stepItem, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                        stepItem.done ? 'bg-[#2C1810] text-white' : 'bg-[#E8DEC8] text-[#7A6150]'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`font-semibold ${stepItem.done ? 'text-[#2C1810]' : 'text-[#8C6D58]'}`}>
                        {stepItem.title}
                      </div>
                      <div className="text-[11px] text-[#7A6150]">{stepItem.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Receipt in Rupees (₹) */}
            <div className="p-4 rounded-2xl bg-white border border-[#DECDBB] text-xs space-y-2">
              <div className="font-semibold text-[#2C1810] mb-2">Item Summary:</div>
              {activeOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[#5C4537]">
                  <span>{it.quantity}x {it.name} {it.temperature ? `(${it.temperature})` : ''}</span>
                  <span className="tabular-nums font-medium">₹{it.price * it.quantity}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#DECDBB] flex justify-between font-bold text-[#2C1810] text-sm">
                <span>Grand Total Paid</span>
                <span className="tabular-nums">₹{activeOrder.total}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveOrder(null)}
              className="w-full py-3.5 bg-[#2C1810] text-[#FAF7F2] text-xs sm:text-sm font-medium rounded-xl hover:bg-[#432519] transition-all"
            >
              Order Something Else
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* --- STATE 2: EMPTY BAG --- */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F2EAE0] flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-[#A89382]" />
            </div>
            <h4 className="font-display font-bold text-lg text-[#2C1810]">
              Your order bag is empty
            </h4>
            <p className="text-xs text-[#7A6150] max-w-xs mt-1 mb-6">
              Browse our single-origin roasts, seasonal citrus lattes, and fresh bakery treats.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 bg-[#2C1810] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#432519] transition-all"
            >
              Browse Sunshine Menu
            </button>
          </div>
        ) : step === 'items' ? (
          /* --- STATE 3: BAG ITEMS REVIEW --- */
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {cart.map((ci) => (
                <div
                  key={ci.cartItemId}
                  className="p-3.5 bg-white rounded-2xl border border-[#DECDBB] flex items-start gap-3 shadow-2xs"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#F5EDE3]">
                    {ci.item.imageUrl ? (
                      <img
                        src={ci.item.imageUrl}
                        alt={ci.item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CafeIllustration type={getIllustrationType(ci.item.id)} className="w-full h-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#2C1810] truncate">
                        {ci.item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(ci.cartItemId)}
                        className="text-[#A89382] hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {ci.customization && (
                      <div className="text-[11px] text-[#7A6150] space-y-0.5 mt-0.5">
                        {ci.customization.temperature && <span>{ci.customization.temperature} · </span>}
                        {ci.customization.milk && <span>{ci.customization.milk} · </span>}
                        {ci.customization.sweetness && <span>{ci.customization.sweetness}</span>}
                        {ci.customization.extraShots ? (
                          <div className="text-[#B45309]">+{ci.customization.extraShots} Extra Shot</div>
                        ) : null}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-[#F2ECE3]">
                      <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#DECDBB] rounded-lg px-2 py-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(ci.cartItemId, -1)}
                          className="text-[#7A6150] hover:text-[#2C1810]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="tabular-nums font-semibold w-3 text-center">{ci.quantity}</span>
                        <button
                          onClick={() => updateQuantity(ci.cartItemId, 1)}
                          className="text-[#7A6150] hover:text-[#2C1810]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-[#2C1810] tabular-nums">
                        ₹{ci.itemTotal}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Proceed to Details */}
            <div className="p-6 bg-white border-t border-[#E8DEC8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5143]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8C6D58]">
                  <span>Taxes & Delivery calculated at next step</span>
                </div>
              </div>

              <button
                onClick={handleProceedToDetails}
                className="w-full py-3.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] font-medium text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Enter Name & Delivery Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* --- STATE 4: ASKING FOR NAME, ADDRESS & CHECKOUT DETAILS --- */
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Back to items button */}
              <button
                type="button"
                onClick={() => setStep('items')}
                className="text-xs text-[#7A6150] hover:text-[#2C1810] flex items-center gap-1 font-medium"
              >
                ← Back to items ({cartCount})
              </button>

              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                  How Would You Like Your Order?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'delivery', label: '🛵 Delivery', sub: 'Home/Office' },
                    { id: 'pickup', label: '☕ Pickup', sub: 'Takeaway' },
                    { id: 'dine-in', label: '🪑 Dine-in', sub: 'At Table' }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setOrderType(t.id as 'delivery' | 'pickup' | 'dine-in')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        orderType === t.id
                          ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810] shadow-xs'
                          : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                      }`}
                    >
                      <div className="font-semibold">{t.label}</div>
                      <div className="text-[10px] opacity-75">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
                <div className="text-xs font-bold text-[#78350F] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Contact Information</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4537] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Email (for e-receipt)
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                </div>
              </div>

              {/* Address Fields for Delivery */}
              {orderType === 'delivery' && (
                <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
                  <div className="text-xs font-bold text-[#78350F] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Doorstep Delivery Address</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Flat / House No. / Building / Floor
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Oakwood Heights, 4th Floor"
                      value={flatNo}
                      onChange={(e) => setFlatNo(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Complete Street Address / Locality *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. 14th Main Road, Indiranagar, near Metro Station"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5C4537] mb-1">
                        Landmark
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Opposite City Park"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5C4537] mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 560038"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Table Number for Dine-In */}
              {orderType === 'dine-in' && (
                <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
                  <div className="text-xs font-bold text-[#78350F] uppercase tracking-wider flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Dine-In Table</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Table Number or Seating Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Table 4 / Window Bay Nook"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-medium text-[#5C4537] mb-1">
                  Delivery / Chef Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please ring bell, leave at security, extra cinnamon..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-white border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                />
              </div>

              {/* Payment Mode */}
              <div className="pt-2 border-t border-[#E8DEC8]">
                <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'upi', label: '⚡ UPI / GPay / PhonePe', sub: 'Instant & Seamless' },
                    { id: 'cod', label: '💵 Cash on Delivery / Counter', sub: 'Pay when delivered' },
                    { id: 'card_online', label: '💳 Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                    { id: 'counter_pay', label: '🏪 Pay at Counter', sub: 'Cash / Card on arrival' }
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as 'upi' | 'cod' | 'card_online' | 'counter_pay')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        paymentMethod === pm.id
                          ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810]'
                          : 'bg-white text-[#5C4537] border-[#DECDBB]'
                      }`}
                    >
                      <div className="font-semibold">{pm.label}</div>
                      <div className="text-[10px] opacity-75">{pm.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Barista Tip in Rupees */}
              <div className="pt-2 border-t border-[#E8DEC8]">
                <div className="flex justify-between items-center text-xs font-medium text-[#5C4537] mb-1.5">
                  <span>Add Tip for Baristas & Delivery Partner</span>
                  <span className="tabular-nums font-bold">₹{tip}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {[
                    { label: 'None', val: 0 },
                    { label: '₹20', val: 20 },
                    { label: '₹30', val: 30 },
                    { label: '₹50', val: 50 }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.label}
                      onClick={() => setTip(t.val)}
                      className={`py-1.5 rounded-lg border text-center font-medium transition-all ${
                        tip === t.val
                          ? 'bg-[#78350F] text-white border-[#78350F]'
                          : 'bg-white text-[#5C4537] border-[#DECDBB]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}
            </form>

            {/* Bottom Total & Submit Button in Rupees (₹) */}
            <div className="p-6 bg-white border-t border-[#E8DEC8] space-y-3">
              <div className="space-y-1 text-xs text-[#6B5143]">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurant GST (5%)</span>
                  <span className="tabular-nums">₹{tax}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Doorstep Delivery Fee</span>
                    <span className="tabular-nums">₹{deliveryFee}</span>
                  </div>
                )}
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Staff Tip</span>
                    <span className="tabular-nums">₹{tip}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#F2ECE3] flex justify-between text-base font-bold text-[#2C1810]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="w-full py-3.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] font-medium text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Submitting to Sunshine...' : `Place Order · ₹${finalTotal}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
