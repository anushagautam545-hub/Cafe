import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CustomizationOptions, CartItem, Order, CustomerDetails } from '../types/index.js';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: CustomizationOptions, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (customerDetails: CustomerDetails, paymentMethod: 'upi' | 'cod' | 'card_online' | 'counter_pay', tip: number) => Promise<Order>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunshine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('sunshine_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sunshine_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('sunshine_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('sunshine_active_order');
      }
    } catch {
      // ignore
    }
  }, [activeOrder]);

  const addToCart = (item: MenuItem, customization?: CustomizationOptions, quantity = 1) => {
    const customKey = customization
      ? `${customization.temperature || ''}-${customization.milk || ''}-${customization.sweetness || ''}-${customization.extraShots || 0}`
      : 'standard';
    const cartItemId = `${item.id}-${customKey}`;

    // Add-ons in Indian Rupees (₹)
    let extraCost = 0;
    if (customization?.extraShots) {
      extraCost += customization.extraShots * 50; // ₹50 per extra shot
    }
    if (customization?.milk === 'Oat Velvet' || customization?.milk === 'Pistachio Milk' || customization?.milk === 'Macadamia') {
      extraCost += 45; // ₹45 for artisanal plant milk
    }

    const unitPrice = item.price + extraCost;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? { ...ci, quantity: ci.quantity + quantity, itemTotal: (ci.quantity + quantity) * unitPrice }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity,
          customization,
          itemTotal: unitPrice * quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = ci.itemTotal / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              itemTotal: unitPrice * newQty
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);

  const placeOrder = async (
    customerDetails: CustomerDetails,
    paymentMethod: 'upi' | 'cod' | 'card_online' | 'counter_pay',
    tip: number
  ) => {
    const payload = {
      customerDetails,
      items: cart.map((ci) => ({
        menuItemId: ci.item.id,
        name: ci.item.name,
        price: Math.round(ci.itemTotal / ci.quantity),
        quantity: ci.quantity,
        temperature: ci.customization?.temperature,
        milk: ci.customization?.milk,
        sweetness: ci.customization?.sweetness
      })),
      paymentMethod,
      tip
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to place order');
    }

    const data = await res.json();
    setActiveOrder(data.order);
    clearCart();
    return data.order as Order;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        activeOrder,
        setActiveOrder,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
