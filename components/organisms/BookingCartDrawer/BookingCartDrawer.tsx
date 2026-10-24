"use client";

import Image from "next/image";
import {
  LuX,
  LuShoppingBag,
  LuTrash2,
  LuCalendar,
  LuClock,
  LuCircleCheck,
  LuArrowRight,
  LuArrowLeft,
  LuTreePalm,
  LuSparkles,
  LuCreditCard,
  LuSmartphone,
  LuQrCode,
  LuShieldCheck,
  LuTent,
  LuBed,
  LuBuilding,
  LuLock,
} from "react-icons/lu";
import type { CottageCategory } from "@/lib/entities/resorts.type";
import { useBookingCartDrawer } from "./bookingCartDrawer.hooks";

function getCategoryBadge(category: CottageCategory) {
  if (category === "Function Hall") {
    return {
      label: "Function Hall",
      icon: LuBuilding,
      color: "bg-amber-100 text-amber-900",
    };
  }
  if (category.includes("Room")) {
    return {
      label: "Overnight Room",
      icon: LuBed,
      color: "bg-blue-100 text-blue-900",
    };
  }
  return {
    label: "Day Cottage / Kubo",
    icon: LuTent,
    color: "bg-emerald-100 text-emerald-900",
  };
}

export function BookingCartDrawer() {
  const {
    items,
    totalCount,
    totalAmount,
    amountToPayNow,
    balanceAtCheckin,
    isCartOpen,
    completedOrder,
    step,
    guestName,
    setGuestName,
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
  } = useBookingCartDrawer();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={handleClose} aria-hidden />

      {/* Slide-out Drawer Panel */}
      <div className="water-drop-surface-deep relative flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto p-6 sm:p-8 shadow-2xl transition-transform duration-300">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-on-primary shadow-xs">
                <LuShoppingBag className="size-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-extrabold text-on-surface">
                  {step === "confirmed"
                    ? "Pass & Payment Receipt"
                    : step === "payment"
                    ? "Pay Online (Secure)"
                    : step === "guest"
                    ? "Guest Details"
                    : "Your Booking Bag"}
                </h2>
                <p className="font-mono text-[11px] text-on-surface-muted">
                  {totalCount} {totalCount === 1 ? "unit" : "units"} selected · Tukuran, ZDS
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="water-drop-pill rounded-full size-8 flex items-center justify-center text-on-surface-muted hover:text-on-surface cursor-pointer transition-all duration-200 ease-in-out"
              aria-label="Close cart"
            >
              <LuX className="size-4" />
            </button>
          </div>

          {/* STEP 1: ITEMS IN CART */}
          {step === "items" && (
            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <div className="water-drop-surface rounded-2xl p-8 text-center my-10 space-y-3">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-container-high text-on-surface-muted">
                    <LuTreePalm className="size-6" />
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface">
                    Your booking bag is empty
                  </h3>
                  <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                    Browse our beach resorts to select open-air kubos, beachfront cottages, grand function halls, or overnight coastal rooms.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                      Selected Accommodations &amp; Spaces
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] font-semibold text-error hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((item) => {
                    const badge = getCategoryBadge(item.itemCategory);
                    const BadgeIcon = badge.icon;

                    return (
                      <div
                        key={item.id}
                        className="water-drop-surface rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 rounded-xl overflow-hidden shrink-0">
                              <Image
                                src={item.resortImage}
                                alt={item.resortName}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-on-surface-muted">
                                  {item.resortName}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold flex items-center gap-1 ${badge.color}`}
                                >
                                  <BadgeIcon className="size-2.5" />
                                  <span>{badge.label}</span>
                                </span>
                              </div>
                              <h4 className="font-display text-sm font-bold text-on-surface mt-1">
                                {item.itemName}
                              </h4>
                              <p className="text-[11px] text-on-surface-variant font-mono font-semibold">
                                ₱{item.priceNumber.toLocaleString()}{" "}
                                {item.itemCategory.includes("Room")
                                  ? "/ Night"
                                  : "/ Day"}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-on-surface-muted hover:text-error transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.itemName}`}
                          >
                            <LuTrash2 className="size-4" />
                          </button>
                        </div>

                        {/* Schedule details & Quantity controls */}
                        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2.5 text-xs">
                          <div className="space-y-0.5 text-[11px] text-on-surface-muted">
                            <p className="flex items-center gap-1 font-mono">
                              <LuCalendar className="size-3 text-outline" /> {item.bookingDate}
                            </p>
                            <p className="flex items-center gap-1">
                              <LuClock className="size-3 text-outline" /> {item.timeSlot}
                            </p>
                          </div>

                          {/* Quantity controls */}
                          <div className="water-drop-pill rounded-full flex items-center gap-2 px-2.5 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="size-5 font-bold text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-on-surface min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="size-5 font-bold text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === "guest" && (
            <form onSubmit={handleProceedToPayment} className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <button
                  type="button"
                  onClick={handleBackToItems}
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <LuArrowLeft className="size-3.5" /> Back to Units
                </button>
                <span className="font-mono text-[11px] font-bold text-on-surface-muted">
                  STEP 2 OF 3 · GUEST INFO
                </span>
              </div>

              <div className="water-drop-surface rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-on-surface">
                    Guest Reservation Details
                  </p>
                  <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50/80">
                    Pay Online Demo
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Provide your name and contact number for instant online confirmation. In the next step, you can pay online via GCash, Maya, or Card.
                </p>

                {error && (
                  <p className="text-xs font-bold text-error bg-error-container/20 p-2.5 rounded-xl">
                    {error}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Your Full Name (Required) *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="water-drop-pill rounded-full w-full px-4 py-2.5 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Mobile Number (For SMS &amp; GCash/Maya Receipt) *
                    </label>
                  </div>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+63 951 824 0846"
                    className="water-drop-pill rounded-full w-full px-4 py-2.5 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Purpose &amp; Special Inclusions
                    </label>
                    <span className="text-[9px] text-on-surface-muted font-medium">Optional</span>
                  </div>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Wedding reception in function hall, celebrating family birthday, need sound system setup"
                    className="w-full rounded-2xl border border-outline-variant/40 bg-white/70 p-3 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: PAY ONLINE (SECURE CHECKOUT) */}
          {step === "payment" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <button
                  type="button"
                  onClick={handleBackToGuest}
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <LuArrowLeft className="size-3.5" /> Back to Guest Details
                </button>
                <span className="font-mono text-[11px] font-bold text-on-surface-muted">
                  STEP 3 OF 3 · PAY ONLINE
                </span>
              </div>

              {/* 1. Payment Plan Selection: Full vs 50% Deposit */}
              <div className="water-drop-surface rounded-2xl p-4 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                  Select Online Payment Option
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentPlan("full")}
                    className={`rounded-xl p-3 text-left transition-all border cursor-pointer ${
                      paymentPlan === "full"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <p className="text-xs font-extrabold text-on-surface">
                      Full Payment (100%)
                    </p>
                    <p className="text-[10px] text-on-surface-muted mt-0.5">
                      Pay total ₱{totalAmount.toLocaleString()} online now
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentPlan("deposit")}
                    className={`rounded-xl p-3 text-left transition-all border cursor-pointer ${
                      paymentPlan === "deposit"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <p className="text-xs font-extrabold text-on-surface">
                      50% Deposit Online
                    </p>
                    <p className="text-[10px] text-on-surface-muted mt-0.5">
                      Pay ₱{Math.round(totalAmount * 0.5).toLocaleString()} now · balance at resort
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. Online Payment Gateway Channels */}
              <div className="water-drop-surface rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Choose Payment Channel
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                    <LuShieldCheck className="size-3" /> SSL 256-Bit Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* GCash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("gcash")}
                    className={`rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      paymentMethod === "gcash"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <LuSmartphone className="size-5 text-sky-600" />
                    <span className="text-xs font-bold text-on-surface">GCash</span>
                    <span className="text-[9px] font-mono text-on-surface-muted">Instant e-Wallet</span>
                  </button>

                  {/* Maya */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("maya")}
                    className={`rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      paymentMethod === "maya"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <LuSmartphone className="size-5 text-emerald-600" />
                    <span className="text-xs font-bold text-on-surface">Maya</span>
                    <span className="text-[9px] font-mono text-on-surface-muted">Wallet / QR</span>
                  </button>

                  {/* Credit / Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <LuCreditCard className="size-5 text-primary" />
                    <span className="text-xs font-bold text-on-surface">Card</span>
                    <span className="text-[9px] font-mono text-on-surface-muted">Visa / Mastercard</span>
                  </button>

                  {/* QR Ph */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qrph")}
                    className={`rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      paymentMethod === "qrph"
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-outline-variant/30 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <LuQrCode className="size-5 text-indigo-600" />
                    <span className="text-xs font-bold text-on-surface">QR Ph</span>
                    <span className="text-[9px] font-mono text-on-surface-muted">Bank Transfer</span>
                  </button>
                </div>

                {/* Dynamic Channel Input Form */}
                <div className="water-drop-surface-deep rounded-xl p-3.5 space-y-2 mt-2">
                  {paymentMethod === "gcash" && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                        Registered GCash Mobile Number
                      </label>
                      <input
                        type="text"
                        value={accountRef}
                        onChange={(e) => setAccountRef(e.target.value)}
                        placeholder="09XX XXX XXXX"
                        className="water-drop-pill rounded-full w-full px-4 py-2 text-xs font-mono text-on-surface outline-hidden"
                      />
                      <p className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-1">
                        <LuLock className="size-2.5 text-primary" /> Connected to official GCash Merchant API demo
                      </p>
                    </div>
                  )}

                  {paymentMethod === "maya" && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                        Maya Registered Number / Account
                      </label>
                      <input
                        type="text"
                        value={accountRef}
                        onChange={(e) => setAccountRef(e.target.value)}
                        placeholder="09XX XXX XXXX"
                        className="water-drop-pill rounded-full w-full px-4 py-2 text-xs font-mono text-on-surface outline-hidden"
                      />
                      <p className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-1">
                        <LuLock className="size-2.5 text-primary" /> Instant Maya checkout gateway
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                          Card Number
                        </label>
                        <input
                          type="text"
                          defaultValue="4532 •••• •••• 8912"
                          className="water-drop-pill rounded-full w-full px-4 py-2 text-xs font-mono text-on-surface outline-hidden"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          defaultValue="11/28"
                          placeholder="MM/YY"
                          className="water-drop-pill rounded-full px-4 py-2 text-xs font-mono text-on-surface outline-hidden text-center"
                        />
                        <input
                          type="password"
                          defaultValue="789"
                          placeholder="CVC"
                          className="water-drop-pill rounded-full px-4 py-2 text-xs font-mono text-on-surface outline-hidden text-center"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "qrph" && (
                    <div className="text-center space-y-2 py-1">
                      <div className="mx-auto size-24 rounded-lg bg-white p-2 border border-outline-variant/40 flex items-center justify-center">
                        <LuQrCode className="size-20 text-on-surface" />
                      </div>
                      <p className="text-[10px] font-mono text-on-surface-variant">
                        Scan with BDO, BPI, UnionBank, RCBC, GCash, or Maya
                      </p>
                    </div>
                  )}
                </div>

                {/* Online Payment Breakdown */}
                <div className="border-t border-outline-variant/30 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Total Accommodation Subtotal:</span>
                    <span className="font-mono font-semibold">₱{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>Online Payment Due Now:</span>
                    <span className="font-mono text-primary text-sm font-extrabold">
                      ₱{amountToPayNow.toLocaleString()}
                    </span>
                  </div>
                  {balanceAtCheckin > 0 && (
                    <div className="flex justify-between text-on-surface-muted text-[11px]">
                      <span>Remaining Balance upon Arrival:</span>
                      <span className="font-mono font-medium">₱{balanceAtCheckin.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-700 text-[10px] font-semibold">
                    <span>Convenience Fee:</span>
                    <span>FREE (Waived Promo)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMED RESERVATION PASS & OFFICIAL RECEIPT */}
          {step === "confirmed" && completedOrder && (
            <div className="mt-6 space-y-4">
              <div className="water-drop-surface-deep rounded-2xl p-6 text-center space-y-3 border border-emerald-500/40">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <LuCircleCheck className="size-7" />
                </div>
                <div>
                  <span className="water-drop-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50">
                    PAID ONLINE · OFFICIAL SEASIDE PASS
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-on-surface mt-2">
                    Tukuran Reservation Guaranteed
                  </h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Order Ref: <strong>{completedOrder.orderId}</strong>
                  </p>
                  <p className="text-[11px] text-primary font-mono font-bold">
                    Gateway Ref: {completedOrder.transactionRef}
                  </p>
                </div>
              </div>

              {/* Perforated Tactile Pass Ticket */}
              <div className="ticket-notch-left ticket-notch-right relative rounded-2xl bg-surface-container-low/90 p-5 border border-white/90 space-y-3">
                <div className="flex items-center justify-between border-b border-dashed border-outline-variant/40 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Lead Guest
                    </span>
                    <p className="font-bold text-xs text-on-surface">
                      {completedOrder.guestName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Hotline &amp; SMS
                    </span>
                    <p className="font-mono text-xs font-bold text-primary">
                      {completedOrder.contactPhone}
                    </p>
                  </div>
                </div>

                {/* Payment Receipt Info */}
                <div className="rounded-xl bg-white/70 p-2.5 text-xs space-y-1 border border-white">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-on-surface-muted">Payment Method:</span>
                    <span className="font-bold text-on-surface uppercase">
                      {completedOrder.paymentMethod} Online Payment
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-on-surface-muted">Amount Paid Online:</span>
                    <span className="font-mono font-extrabold text-emerald-800">
                      ₱{completedOrder.amountPaid.toLocaleString()}
                    </span>
                  </div>
                  {completedOrder.balanceDue > 0 && (
                    <div className="flex justify-between items-center text-[11px] border-t border-outline-variant/20 pt-1">
                      <span className="text-on-surface-muted">Balance Due upon Arrival:</span>
                      <span className="font-mono font-bold text-amber-800">
                        ₱{completedOrder.balanceDue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Items Summary */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Reserved Accommodations &amp; Spaces ({completedOrder.items.length})
                  </span>
                  {completedOrder.items.map((it) => {
                    const badge = getCategoryBadge(it.itemCategory);
                    return (
                      <div
                        key={it.id}
                        className="flex justify-between items-center text-xs"
                      >
                        <span className="font-medium text-on-surface flex items-center gap-1">
                          <span
                            className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                          <span>
                            {it.quantity}x {it.itemName} ({it.resortName})
                          </span>
                        </span>
                        <span className="font-mono font-bold text-on-surface">
                          ₱{(it.priceNumber * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Barcode representation */}
                <div className="mt-4 flex flex-col items-center justify-center space-y-1 rounded-xl bg-white/80 py-2 border border-white">
                  <div className="flex h-7 items-end gap-1 opacity-80" aria-hidden>
                    {[3, 5, 2, 4, 1, 5, 3, 2, 4, 1, 5, 2, 4, 3, 5, 2, 1, 4, 2, 3].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-xs bg-on-surface"
                          style={{ height: `${h * 5}px` }}
                        />
                      )
                    )}
                  </div>
                  <p className="font-mono text-[9px] tracking-widest text-on-surface-muted">
                    {completedOrder.orderId}
                  </p>
                </div>
              </div>

              <div className="water-drop-surface rounded-2xl p-3.5 text-xs space-y-1 text-on-surface-variant">
                <p className="font-bold text-on-surface flex items-center gap-1.5">
                  <LuSparkles className="size-3.5 text-primary" /> Present this pass upon arrival
                </p>
                <p className="text-[11px] leading-relaxed">
                  Upon arrival at the resort gate in Tukuran, show this digital pass or mention your name. Your beach cottage, function hall, or overnight room is guaranteed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Bottom Actions & Price Summary */}
        <div className="mt-6 border-t border-outline-variant/30 pt-4 space-y-3">
          {step === "items" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Total Estimated Amount</span>
                <span className="font-display text-xl font-extrabold text-on-surface">
                  ₱{totalAmount.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={handleProceedToGuest}
                className="water-drop-button-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <span>Proceed to Guest Details</span>
                <LuArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === "guest" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Total to Pay Online</span>
                <span className="font-display text-xl font-extrabold text-on-surface">
                  ₱{totalAmount.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="water-drop-button-primary w-full py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Pay Online</span>
                <LuArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === "payment" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-on-surface-muted block text-[11px]">
                    {paymentPlan === "deposit"
                      ? "50% Online Reservation Deposit"
                      : "Full Payment Online"}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                    Via {paymentMethod}
                  </span>
                </div>
                <span className="font-display text-2xl font-black text-primary">
                  ₱{amountToPayNow.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePayOnlineAndConfirm}
                className="water-drop-button-primary w-full py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Processing {paymentMethod.toUpperCase()} Payment...</span>
                  </>
                ) : (
                  <>
                    <LuShieldCheck className="size-4" />
                    <span>
                      Pay ₱{amountToPayNow.toLocaleString()} Online via {paymentMethod.toUpperCase()}
                    </span>
                  </>
                )}
              </button>
            </>
          )}

          {step === "confirmed" && (
            <button
              type="button"
              onClick={handleClose}
              className="water-drop-button-primary w-full py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Done &amp; Close Pass
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
