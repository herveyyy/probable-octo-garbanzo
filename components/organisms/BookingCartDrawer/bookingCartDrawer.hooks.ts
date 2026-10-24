"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/cart.context";

export function useBookingCartDrawer() {
  const {
    items,
    totalCount,
    totalAmount,
    isCartOpen,
    completedOrder,
    guestName: defaultGuestName,
    setGuestName: setGlobalGuestName,
    removeFromCart,
    updateQuantity,
    clearCart,
    closeCart,
    completeBooking,
    dismissOrder,
  } = useCart();

  const [step, setStep] = useState<"items" | "guest" | "confirmed">("items");
  const [inputName, setInputName] = useState(() => defaultGuestName || "Guest Explorer");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleProceedToGuest = () => {
    if (items.length === 0) return;
    if (!inputName.trim()) {
      setInputName(defaultGuestName || "Guest Explorer");
    }
    setStep("guest");
    setError(null);
  };

  const handleBackToItems = () => {
    setStep("items");
    setError(null);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputName.trim() || defaultGuestName.trim() || "Guest Explorer";
    if (!finalName) {
      setError("Please enter your name.");
      return;
    }

    setGlobalGuestName(finalName);
    completeBooking({
      guestName: finalName,
      contactPhone: contactPhone.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    setStep("confirmed");
  };

  const handleClose = () => {
    closeCart();
    if (step === "confirmed") {
      setStep("items");
      dismissOrder();
    }
  };

  return {
    items,
    totalCount,
    totalAmount,
    isCartOpen,
    completedOrder,
    step,
    guestName: inputName,
    setGuestName: setInputName,
    contactPhone,
    setContactPhone,
    notes,
    setNotes,
    error,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleClose,
    handleProceedToGuest,
    handleBackToItems,
    handleSubmitBooking,
    dismissOrder,
  };
}
