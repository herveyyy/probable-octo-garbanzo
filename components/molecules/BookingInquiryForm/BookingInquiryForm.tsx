"use client";

import { LuPhoneCall, LuTent, LuUsers, LuPhone } from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { TUKURAN_RESORTS } from "@/lib/entities/resorts.type";
import { useBookingInquiryForm } from "./bookingInquiryForm.hooks";

interface BookingInquiryFormProps {
  activeResort: ResortHighlight;
  onSelectResort: (resort: ResortHighlight) => void;
}

export function BookingInquiryForm({
  activeResort,
  onSelectResort,
}: BookingInquiryFormProps) {
  const {
    guestName,
    setGuestName,
    contactPhone,
    setContactPhone,
    guestCount,
    setGuestCount,
    isSubmitting,
    feedback,
    handleSubmit,
  } = useBookingInquiryForm({ activeResort, onSelectResort });

  return (
    <section id="booking" className="mt-24 scroll-mt-24 lg:mt-32">
      <div className="water-drop-surface-deep rounded-3xl p-8 sm:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl text-center space-y-4">


          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface">
            Reserve your beach cottage.
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant font-normal">
            Planning a family gathering, weekend picnic, or day trip? Inquire directly
            for open-air cottage rentals and overnight coastal rooms.
          </p>

          {/* Feedback message banner */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold transition-all duration-300 ease-in-out ${feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-error-container/20 text-error border border-error/30"
                }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Direct Booking Inquiry Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted px-2">
                  Resort
                </label>
                <select
                  value={activeResort.id}
                  onChange={(e) => {
                    const r = TUKURAN_RESORTS.find(
                      (item) => item.id === e.target.value
                    );
                    if (r) onSelectResort(r);
                  }}
                  className="water-drop-pill rounded-full w-full px-4 py-3 text-xs font-semibold text-on-surface outline-hidden cursor-pointer"
                >
                  {TUKURAN_RESORTS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted px-2">
                  Your Name (Required) *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Guest Explorer"
                  className="water-drop-pill rounded-full w-full px-4 py-3 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                />
              </div>

              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                    Contact Phone
                  </label>
                  <span className="text-[9px] text-on-surface-muted font-medium">Optional</span>
                </div>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+63 9XX XXX XXXX (Optional)"
                  className="water-drop-pill rounded-full w-full px-4 py-3 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted px-2">
                  Group Size
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="water-drop-pill rounded-full w-full px-4 py-3 text-xs font-semibold text-on-surface outline-hidden cursor-pointer"
                >
                  <option value="1-4 Guests">1–4 Guests</option>
                  <option value="4-8 Guests (Day Kubo)">4–8 Guests (Day Kubo)</option>
                  <option value="8-15 Guests (Family)">8–15 Guests (Family)</option>
                  <option value="15+ Guests (Pavilion)">15+ Guests (Pavilion)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="water-drop-button-primary w-full sm:w-auto px-8 py-3.5 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting Request..."
                  : `Request Cottage at ${activeResort.name}`}
              </button>

              <a
                href={`tel:${activeResort.contactNumber}`}
                className="water-drop-button-secondary w-full sm:w-auto px-6 py-3.5 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                <LuPhoneCall className="size-3.5" />
                <span>Call {activeResort.contactNumber}</span>
              </a>
            </div>
          </form>
        </div>

        {/* 3 Pillars for Tukuran */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3 border-t border-outline-variant/30 pt-10">
          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <LuTent className="size-4 text-primary" />
              <p className="font-display text-sm font-bold text-on-surface">
                Open-Air Shoreline Cottages
              </p>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              Bamboo cottages and kubos placed steps from the water for sea breezes,
              safe swimming, and shade during day trips.
            </p>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <LuUsers className="size-4 text-primary" />
              <p className="font-display text-sm font-bold text-on-surface">
                Family &amp; Group Friendly
              </p>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              Outdoor barbecue areas, picnic tables, and spacious gazebos suited for
              gatherings, reunions, and weekend relaxation.
            </p>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <LuPhone className="size-4 text-primary" />
              <p className="font-display text-sm font-bold text-on-surface">
                Verified Local Contacts
              </p>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              Direct mobile numbers for Lantau Beach, Donel&apos;s, and Sirena Beach Resort for
              instant cottage confirmation before you arrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
