"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import type { CartItem, BookingOrder, PaymentMethod, PaymentPlan } from "@/lib/entities/resorts.type";
import { DEFAULT_GUEST_NAME } from "@/lib/entities/resorts.type";

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  completedOrder: BookingOrder | null;
  guestName: string;
  setGuestName: (name: string) => void;
  resetGuestName: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  completeBooking: (bookingData: {
    guestName: string;
    contactPhone?: string;
    notes?: string;
    paymentMethod?: PaymentMethod;
    paymentPlan?: PaymentPlan;
    accountReference?: string;
  }) => BookingOrder;
  dismissOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tukuran_beach_cart_v1";
const ORDER_STORAGE_KEY = "tukuran_beach_last_order_v1";
const GUEST_STORAGE_KEY = "tukuran_beach_guest_name_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [guestName, setGuestNameState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_GUEST_NAME;
    try {
      const stored = localStorage.getItem(GUEST_STORAGE_KEY);
      return stored && stored.trim() ? stored.trim() : DEFAULT_GUEST_NAME;
    } catch {
      return DEFAULT_GUEST_NAME;
    }
  });

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<BookingOrder | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      return storedOrder ? JSON.parse(storedOrder) : null;
    } catch {
      return null;
    }
  });

  const setGuestName = useCallback((name: string) => {
    const clean = name.trim() || DEFAULT_GUEST_NAME;
    setGuestNameState(clean);
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, clean);
    } catch {
      // Ignore
    }
  }, []);

  const resetGuestName = useCallback(() => {
    setGuestNameState(DEFAULT_GUEST_NAME);
    try {
      localStorage.removeItem(GUEST_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addToCart = useCallback((newItem: Omit<CartItem, "id">) => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => {
      // Check if identical item (same resort, unit, and date) already exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.resortId === newItem.resortId &&
          i.itemName === newItem.itemName &&
          i.bookingDate === newItem.bookingDate &&
          i.timeSlot === newItem.timeSlot
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + newItem.quantity,
        };
        return next;
      }
      return [...prev, { ...newItem, id }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0),
    [items]
  );

  const completeBooking = useCallback(
    (bookingData: {
      guestName: string;
      contactPhone?: string;
      notes?: string;
      paymentMethod?: PaymentMethod;
      paymentPlan?: PaymentPlan;
      accountReference?: string;
    }) => {
      const orderId = `TKR-${Date.now().toString(36).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      const resolvedGuestName =
        bookingData.guestName.trim() || guestName || DEFAULT_GUEST_NAME;

      const method = bookingData.paymentMethod || "gcash";
      const plan = bookingData.paymentPlan || "full";
      const amountPaid =
        plan === "deposit" ? Math.round(totalAmount * 0.5) : totalAmount;
      const balanceDue = totalAmount - amountPaid;
      const transactionRef = `TXN-${method.toUpperCase()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const newOrder: BookingOrder = {
        orderId,
        items: [...items],
        totalAmount,
        guestName: resolvedGuestName,
        contactPhone: bookingData.contactPhone?.trim() || "Walk-in / Demo Guest",
        notes: bookingData.notes,
        bookingDate: items[0]?.bookingDate || new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
        status: "confirmed",
        paymentMethod: method,
        paymentPlan: plan,
        amountPaid,
        balanceDue,
        transactionRef,
        accountReference: bookingData.accountReference,
      };

      setCompletedOrder(newOrder);
      setGuestName(resolvedGuestName);
      setItems([]);
      try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(newOrder));
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
      return newOrder;
    },
    [items, totalAmount, guestName, setGuestName]
  );

  const dismissOrder = useCallback(() => {
    setCompletedOrder(null);
    try {
      localStorage.removeItem(ORDER_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalAmount,
      isCartOpen,
      completedOrder,
      guestName,
      setGuestName,
      resetGuestName,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      completeBooking,
      dismissOrder,
    }),
    [
      items,
      totalCount,
      totalAmount,
      isCartOpen,
      completedOrder,
      guestName,
      setGuestName,
      resetGuestName,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      completeBooking,
      dismissOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
