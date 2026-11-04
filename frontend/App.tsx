import React, { useState } from 'react';
import { CozyAudioProvider } from './context/AudioContext.js';
import { CartProvider, useCart } from './context/CartContext.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { MenuSection } from './components/MenuSection.js';
import { ReservationSection } from './components/ReservationSection.js';
import { BaristaQuizSection } from './components/BaristaQuizSection.js';
import { CafeStorySection } from './components/CafeStorySection.js';
import { ReviewsSection } from './components/ReviewsSection.js';
import { Footer } from './components/Footer.js';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal.js';
import { CartDrawer } from './components/CartDrawer.js';
import { MenuItem, CustomizationOptions } from './types/index.js';

function SunshineCafeApp() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<MenuItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItemForCustomization(item);
    setIsCustomizerOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, undefined, 1);
    showToast(`Added ${item.name} (₹${item.price}) to order bag`);
  };

  const handleConfirmCustomization = (item: MenuItem, customization: CustomizationOptions, quantity: number) => {
    addToCart(item, customization, quantity);
    showToast(`Added ${quantity}x ${item.name} with custom brew specs`);
  };

  const handleAddPairToCart = (drink: MenuItem, pastry: MenuItem) => {
    addToCart(drink, undefined, 1);
    addToCart(pastry, undefined, 1);
    setIsCartOpen(true);
    showToast(`Added ${drink.name} & ${pastry.name} (₹${drink.price + pastry.price}) to bag!`);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      {/* Top Bar with Brand "Sunshine", clean nav, and Order Now CTA (cozy sounds removed from navbar) */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExploreMenu={scrollToMenu}
          onReserveNook={scrollToReservations}
        />

        <MenuSection
          onSelectItem={handleOpenCustomizer}
          onQuickAdd={handleQuickAdd}
        />

        <ReservationSection />

        <BaristaQuizSection
          onAddPairToCart={handleAddPairToCart}
        />

        <CafeStorySection />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <DrinkCustomizerModal
        item={selectedItemForCustomization}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onConfirm={handleConfirmCustomization}
      />

      {/* Slide-out Cart with Address form & Order Successful Placed state */}
      <CartDrawer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2C1810] text-[#FAF7F2] px-5 py-3 rounded-2xl shadow-xl text-xs font-medium border border-[#4A2D1F] flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CozyAudioProvider>
      <CartProvider>
        <SunshineCafeApp />
      </CartProvider>
    </CozyAudioProvider>
  );
}
