"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/cart.context";
import type { PaymentMethod, PaymentPlan } from "@/lib/entities/resorts.type";

export type CartStep = "items" | "guest" | "payment" | "confirmed";

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

  const [step, setStep] = useState<CartStep>("items");
  const [inputName, setInputName] = useState(() => defaultGuestName || "Guest Explorer");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Online Payment States
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("full");
  const [accountRef, setAccountRef] = useState("0951 824 0846");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const amountToPayNow =
    paymentPlan === "deposit" ? Math.round(totalAmount * 0.5) : totalAmount;
  const balanceAtCheckin = totalAmount - amountToPayNow;

  const handleProceedToGuest = () => {
    if (items.length === 0) return;
    if (!inputName.trim()) {
      setInputName(defaultGuestName || "Guest Explorer");
    }
    setStep("guest");
    setError(null);
  };

  const handleProceedToPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = inputName.trim() || defaultGuestName.trim() || "Guest Explorer";
    if (!finalName) {
      setError("Please enter your name.");
      return;
    }
    setGlobalGuestName(finalName);
    setStep("payment");
    setError(null);
  };

  const handleBackToItems = () => {
    setStep("items");
    setError(null);
  };

  const handleBackToGuest = () => {
    setStep("guest");
    setError(null);
  };

  const handlePayOnlineAndConfirm = () => {
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);
    setError(null);

    // Simulate realistic instant payment gateway verification
    setTimeout(() => {
      const finalName = inputName.trim() || defaultGuestName.trim() || "Guest Explorer";
      completeBooking({
        guestName: finalName,
        contactPhone: contactPhone.trim() || undefined,
        notes: notes.trim() || undefined,
        paymentMethod,
        paymentPlan,
        accountReference: accountRef.trim() || undefined,
      });

      setIsProcessingPayment(false);
      setStep("confirmed");
    }, 750);
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
    amountToPayNow,
    balanceAtCheckin,
    isCartOpen,
    completedOrder,
    step,
    guestName: inputName,
    setGuestName: setInputName,
    contactPhone,
    setContactPhone,
    notes,
    setNotes,
    paymentMethod,
    setPaymentMethod,
    paymentPlan,
    setPaymentPlan,
    accountRef,
    setAccountRef,
    isProcessingPayment,
    error,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleClose,
    handleProceedToGuest,
    handleProceedToPayment,
    handleBackToItems,
    handleBackToGuest,
    handlePayOnlineAndConfirm,
    dismissOrder,
  };
}
