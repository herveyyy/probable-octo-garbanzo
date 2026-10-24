"use client";

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
} from "react-icons/lu";
import { useBookingCartDrawer } from "./bookingCartDrawer.hooks";

export function BookingCartDrawer() {
  const {
    items,
    totalCount,
    totalAmount,
    isCartOpen,
    completedOrder,
    step,
    guestName,
    setGuestName,
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
                  {step === "confirmed" ? "Reservation Confirmed" : "Your Booking Bag"}
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
                    Browse our beach resorts to select open-air kubos, picnic cottages, or overnight coastal rooms.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                      Selected Units
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] font-semibold text-error hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="water-drop-surface rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.resortImage}
                            alt={item.resortName}
                            className="size-12 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-on-surface-muted">
                              {item.resortName}
                            </span>
                            <h4 className="font-display text-sm font-bold text-on-surface mt-0.5">
                              {item.itemName}
                            </h4>
                            <p className="text-[11px] text-on-surface-variant font-mono font-semibold">
                              ₱{item.priceNumber.toLocaleString()} {item.itemCategory.includes("Room") ? "/ Night" : "/ Day"}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-on-surface-muted hover:text-error transition-colors p-1"
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
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === "guest" && (
            <form onSubmit={handleSubmitBooking} className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <button
                  type="button"
                  onClick={handleBackToItems}
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <LuArrowLeft className="size-3.5" /> Back to Units
                </button>
                <span className="font-mono text-[11px] font-bold text-on-surface-muted">
                  STEP 2 OF 2
                </span>
              </div>

              <div className="water-drop-surface rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-on-surface">
                    Guest Demo Reservation
                  </p>
                  <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50/80">
                    No Login Needed
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  For this demo, no password or account registration is required. Simply provide your name to issue your instant Tukuran beach pass.
                </p>

                {error && (
                  <p className="text-xs font-bold text-error bg-error-container/20 p-2.5 rounded-xl">
                    {error}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Your Name (Required) *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Guest Explorer"
                    className="water-drop-pill rounded-full w-full px-4 py-2.5 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Mobile Phone
                    </label>
                    <span className="text-[9px] text-on-surface-muted font-medium">Optional for demo</span>
                  </div>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+63 9XX XXX XXXX (Optional)"
                    className="water-drop-pill rounded-full w-full px-4 py-2.5 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                      Special Requests or Group Notes
                    </label>
                    <span className="text-[9px] text-on-surface-muted font-medium">Optional</span>
                  </div>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need extra barbecue grill, celebrating family reunion"
                    className="w-full rounded-2xl border border-outline-variant/40 bg-white/70 p-3 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: CONFIRMED RESERVATION PASS */}
          {step === "confirmed" && completedOrder && (
            <div className="mt-6 space-y-4">
              <div className="water-drop-surface-deep rounded-2xl p-6 text-center space-y-3 border border-emerald-500/30">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <LuCircleCheck className="size-7" />
                </div>
                <div>
                  <span className="water-drop-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-emerald-800">
                    DEMO BOOKING CONFIRMED
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-on-surface mt-2">
                    Tukuran Seaside Pass Ready
                  </h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Order Ref: <strong>{completedOrder.orderId}</strong>
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
                      Phone Hotline
                    </span>
                    <p className="font-mono text-xs font-bold text-primary">
                      {completedOrder.contactPhone}
                    </p>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Reserved Units ({completedOrder.items.length})
                  </span>
                  {completedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-on-surface">
                        {it.quantity}x {it.itemName} ({it.resortName})
                      </span>
                      <span className="font-mono font-bold text-on-surface">
                        ₱{(it.priceNumber * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
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
                  Upon arrival at the resort entrance in Tukuran, simply mention your name or show this pass to secure your reserved cottage or room.
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
                className="water-drop-button-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Proceed to Guest Details</span>
                <LuArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === "guest" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Total to Confirm</span>
                <span className="font-display text-xl font-extrabold text-on-surface">
                  ₱{totalAmount.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="water-drop-button-primary w-full py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99]"
              >
                Confirm Demo Reservation (Instant Pass)
              </button>
            </>
          )}

          {step === "confirmed" && (
            <button
              type="button"
              onClick={handleClose}
              className="water-drop-button-primary w-full py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99]"
            >
              Done &amp; Close Pass
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
