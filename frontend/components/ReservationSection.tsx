import React, { useState, useEffect } from 'react';
import { Flame, Sun, BookOpen, Flower2, Calendar, CheckCircle2 } from 'lucide-react';
import { SeatingNook, Reservation } from '../types/index.js';

export const ReservationSection: React.FC = () => {
  const [nooks, setNooks] = useState<SeatingNook[]>([]);
  const [selectedNookId, setSelectedNookId] = useState<string>('nook-sunlit-window');
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, Nov 5');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadNooks() {
      try {
        const res = await fetch('/api/reservations/nooks');
        const data = await res.json();
        if (data.success && data.nooks) {
          setNooks(data.nooks);
        }
      } catch (err) {
        console.error('Failed to load nooks:', err);
      }
    }
    loadNooks();
  }, []);

  const activeNook = nooks.find(n => n.id === selectedNookId) || nooks[0];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      setErrorMsg('Please provide your name and email.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          nookId: selectedNookId,
          partySize,
          date: selectedDate,
          timeSlot: selectedTime,
          specialRequests
        })
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedReservation(data.reservation);
      } else {
        setErrorMsg(data.message || 'Could not complete reservation.');
      }
    } catch {
      setErrorMsg('Network error while booking table.');
    } finally {
      setSubmitting(false);
    }
  };

  const getNookIcon = (icon: string) => {
    switch (icon) {
      case 'Flame': return <Flame className="w-5 h-5 text-[#EA580C]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#D97706]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#9333EA]" />;
      default: return <Flower2 className="w-5 h-5 text-[#16A34A]" />;
    }
  };

  return (
    <section id="reservations" className="py-16 md:py-24 border-b border-[#E8DEC8]/60 bg-[#F5EDE3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#B45309] uppercase mb-1">
            Table & Sanctuary Booking
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2C1810] tracking-tight">
            Reserve Your Table at Sunshine
          </h2>
          <p className="text-sm md:text-base text-[#6B5143] mt-2">
            Enjoy your morning coffee by our sun-drenched window bay, the quiet library alcove for focus work, or the open secret garden veranda. Free table reservations.
          </p>
        </div>

        {confirmedReservation ? (
          <div className="bg-white rounded-3xl border border-[#DECDBB] p-8 max-w-2xl mx-auto text-center shadow-lg space-y-4">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="text-xs font-semibold tracking-wider text-[#059669] uppercase">
              Table Confirmed at Sunshine
            </div>
            <h3 className="text-2xl font-display font-bold text-[#2C1810]">
              We look forward to welcoming you, {confirmedReservation.guestName}
            </h3>
            <div className="inline-block bg-[#F4EDE2] border border-[#DECDBB] px-4 py-2 rounded-xl text-sm font-mono font-bold text-[#78350F]">
              Reference Code: {confirmedReservation.code}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0E5D8] text-xs text-[#5C4537] text-left">
              <div>
                <span className="text-[#8C6D58] block">Nook</span>
                <strong className="text-[#2C1810]">{confirmedReservation.nookName}</strong>
              </div>
              <div>
                <span className="text-[#8C6D58] block">Date & Time</span>
                <strong className="text-[#2C1810]">{confirmedReservation.date} · {confirmedReservation.timeSlot}</strong>
              </div>
              <div>
                <span className="text-[#8C6D58] block">Party</span>
                <strong className="text-[#2C1810]">{confirmedReservation.partySize} Guests</strong>
              </div>
            </div>

            <p className="text-xs text-[#7A6150] pt-2">
              A confirmation email has been dispatched to {confirmedReservation.guestEmail}. Your table will be held for 15 minutes past your booking time.
            </p>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="mt-4 px-6 py-2.5 bg-[#2C1810] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#432519] transition-all"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Nook Selection Cards with Real Photos */}
            <div className="lg:col-span-7 space-y-4">
              <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
                1. Select Desired Seating Atmosphere
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nooks.map((nook) => {
                  const isSelected = selectedNookId === nook.id;
                  return (
                    <div
                      key={nook.id}
                      onClick={() => setSelectedNookId(nook.id)}
                      className={`rounded-2xl border cursor-pointer transition-all overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#2C1810] shadow-md ring-2 ring-[#2C1810]'
                          : 'bg-white/90 border-[#DECDBB] hover:border-[#B89F89] hover:bg-white'
                      }`}
                    >
                      {/* Photo Header */}
                      <div className="relative h-28 w-full overflow-hidden bg-[#F5EDE3]">
                        <img
                          src={nook.imageUrl}
                          alt={nook.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-3 text-white font-display font-bold text-sm">
                          {nook.name}
                        </div>
                        <div className="absolute top-2 right-2 bg-white/90 text-[#2C1810] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {nook.capacity}
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-[#8C6D58] font-medium">
                          {nook.tagline}
                        </p>
                        <p className="text-xs text-[#6B5143] mt-1.5 line-clamp-2">
                          {nook.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {nook.atmosphere.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-[10px] text-[#7A6150] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeNook && (
                <div className="p-4 rounded-2xl bg-white border border-[#DECDBB] text-xs text-[#5C4537] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#2C1810]">Best suited for: </span>
                    {activeNook.bestFor}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#DECDBB] p-6 sm:p-8 shadow-md">
              <h3 className="text-xl font-display font-bold text-[#2C1810] mb-1">
                Booking Details
              </h3>
              <p className="text-xs text-[#7A6150] mb-6">
                Complimentary table reservations at Sunshine.
              </p>

              <form onSubmit={handleBook} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Today, Nov 4', 'Tomorrow, Nov 5', 'Friday, Nov 6'].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`py-2 px-2 rounded-xl border text-center font-medium transition-all ${
                          selectedDate === d
                            ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810]'
                            : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                        }`}
                      >
                        {d.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-1.5">
                    Time Slot ({activeNook?.name})
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(activeNook?.availableSlots || ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']).slice(0, 6).map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-1 rounded-xl border text-center font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-[#78350F] text-white border-[#78350F]'
                            : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-1.5">
                    Party Size
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 6].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setPartySize(size)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                          partySize === size
                            ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810]'
                            : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
                        }`}
                      >
                        {size} {size === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Info */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Sengupta"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5C4537] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5C4537] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 00000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4537] mb-1">
                      Special Request or Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Quiet corner, celebrating birthday, power outlet..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DECDBB] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#2C1810] hover:bg-[#432519] text-[#FAF7F2] font-medium text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Confirming with Host...' : `Reserve Table at Sunshine`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
