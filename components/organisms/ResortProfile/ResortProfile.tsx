"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LuArrowLeft,
  LuMapPin,
  LuPhone,
  LuClock,
  LuUsers,
  LuCheck,
  LuShoppingBag,
  LuCalendar,
  LuWaves,
  LuFlame,
  LuCar,
  LuShieldCheck,
  LuCircleCheck,
  LuTent,
  LuUser,
} from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { BookingCartDrawer } from "@/components/organisms/BookingCartDrawer/BookingCartDrawer";
import { Footer } from "@/components/organisms/Footer/Footer";
import { useCart } from "@/lib/context/cart.context";
import { useResortProfile } from "./resortProfile.hooks";

interface ResortProfileProps {
  resort: ResortHighlight;
  projectName?: string;
}

export function ResortProfile({
  resort,
  projectName = "PROJECT ONE",
}: ResortProfileProps) {
  const {
    images,
    selectedGalleryIdx,
    setSelectedGalleryIdx,
    selectedCategory,
    setSelectedCategory,
    bookingDate,
    setBookingDate,
    selectedGuests,
    setSelectedGuests,
    filteredCottages,
    addedItemName,
    handleAddToCart,
  } = useResortProfile({ resort });

  const { totalCount, openCart, guestName } = useCart();

  return (
    <div className="relative min-h-screen bg-transparent text-on-surface antialiased flex flex-col justify-between">
      {/* 1. Top Floating Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-8 sm:pt-4">
        <div className="water-drop-pill rounded-full mx-auto flex w-full max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link
              href="/browse"
              className="water-drop-pill rounded-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-on-surface hover:bg-white transition-all hover:scale-105 active:scale-95"
            >
              <LuArrowLeft className="size-3.5 text-primary" />
              <span className="hidden sm:inline">Back to Map &amp; Browse</span>
              <span className="sm:hidden">Browse Map</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-flex text-xs font-mono font-semibold text-on-surface-muted">
              {resort.name} · {resort.barangay}
            </span>

            {/* Demo Guest Indicator */}
            <div className="water-drop-pill rounded-full hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-on-surface">
              <LuUser className="size-3 text-primary" />
              <span className="max-w-25 truncate">{guestName}</span>
              <span className="rounded-full bg-surface-container-high px-1.5 py-0.2 text-[8px] uppercase tracking-wider text-on-surface-muted font-mono">
                Guest
              </span>
            </div>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className={`water-drop-pill rounded-full flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                totalCount > 0 ? "bg-primary text-white shadow-md" : "text-on-surface hover:bg-white"
              }`}
            >
              <LuShoppingBag className="size-3.5" />
              <span>Bag</span>
              {totalCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-white text-primary text-[10px] font-black">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Profile Content */}
      <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-8 sm:py-8 lg:py-12 space-y-8 sm:space-y-12">
        {/* Resort Showcase Hero Card */}
        <section className="water-drop-surface rounded-3xl p-4 sm:p-8 lg:p-10">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-center">
            {/* Left: Interactive Photographic Gallery */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={images[selectedGalleryIdx]}
                  alt={resort.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="size-full object-cover transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="water-drop-pill rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold text-on-surface shadow-xs">
                    {resort.number} · {resort.badge}
                  </span>
                  {resort.hasFunctionHall && (
                    <span className="water-drop-pill rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-amber-900 bg-amber-50">
                      Function Hall
                    </span>
                  )}
                  {resort.hasOvernightRooms && (
                    <span className="water-drop-pill rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50">
                      Overnight Rooms
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90">
                    {resort.barangay}, Tukuran, Zamboanga del Sur
                  </p>
                  <h1 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                    {resort.name}
                  </h1>
                </div>
              </div>

              {/* Gallery Thumbnails - Swipeable on mobile */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`relative aspect-16/10 w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${selectedGalleryIdx === idx
                          ? "border-primary scale-105 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`Photo ${idx + 1}`}

                        fill
                        sizes="96px"
                        className="size-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Overview, Hotline, and Quick Specs */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <p className="text-sm sm:text-base leading-relaxed text-on-surface font-medium">
                  {resort.overview}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant font-normal">
                  {resort.details}
                </p>
              </div>

              {/* Direct Hotline Banner */}
              <div className="water-drop-surface-deep rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Verified Direct Mobile Hotline
                  </span>
                  <a
                    href={`tel:${resort.contactNumber}`}
                    className="font-mono text-base font-extrabold text-primary underline flex items-center gap-1.5"
                  >
                    <LuPhone className="size-4" />
                    {resort.contactNumber}
                  </a>
                </div>
                <a
                  href={`tel:${resort.contactNumber}`}
                  className="water-drop-button-primary px-4 py-2 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  Call Now
                </a>
              </div>

              {/* Quick Specification Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="water-drop-surface-deep rounded-2xl p-3 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted flex items-center gap-1">
                    <LuClock className="size-3 text-outline" /> Hours
                  </span>
                  <p className="font-semibold text-on-surface">{resort.openHours}</p>
                </div>

                <div className="water-drop-surface-deep rounded-2xl p-3 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted flex items-center gap-1">
                    <LuMapPin className="size-3 text-outline" /> Plus Code
                  </span>
                  <p className="font-mono font-semibold text-on-surface truncate">
                    {resort.locationCode.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Key Resort Inclusions */}
              <div className="space-y-2 border-t border-outline-variant/30 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-muted block">
                  Resort Highlights
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {resort.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-on-surface"
                    >
                      <span className="water-drop-pill rounded-full flex size-4 items-center justify-center text-emerald-700 shrink-0">
                        <LuCheck className="size-2.5 stroke-3" />
                      </span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Available Rooms & Cottages Catalog Section */}
        <section id="available-units" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-outline-variant/30 pb-6">
            <div>
              <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-primary">
                <LuTent className="size-3.5 text-primary" />
                <span>BOOKING &amp; RESERVATION CATALOG</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mt-2">
                Available Cottages, Function Halls &amp; Rooms
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl font-normal">
                Choose your desired beachfront kubo, grand function hall, or overnight room. Tap &quot;Add to Booking Bag&quot; to pay online and reserve instantly.
              </p>
            </div>

            {/* Category Filter Tabs - Horizontal swipe on mobile */}
            <div className="water-drop-pill rounded-full flex items-center p-1.5 self-start md:self-auto overflow-x-auto no-scrollbar max-w-full gap-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${selectedCategory === "all"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                All ({resort.cottages.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("day")}
                className={`rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${selectedCategory === "day"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                Day Cottages
              </button>
              {resort.hasFunctionHall && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("hall")}
                  className={`rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${selectedCategory === "hall"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  Function Halls
                </button>
              )}
              {resort.hasOvernightRooms && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("room")}
                  className={`rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${selectedCategory === "room"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  Overnight Rooms
                </button>
              )}
            </div>
          </div>

          {/* Quick Date and Group Size Bar */}
          <div className="water-drop-surface rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <LuCalendar className="size-4 text-primary" /> Target Date:
                </span>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="water-drop-pill rounded-full px-3 py-1 font-mono text-xs font-semibold text-on-surface outline-hidden cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <LuUsers className="size-4 text-primary" /> Group:
                </span>
                <select
                  value={selectedGuests}
                  onChange={(e) => setSelectedGuests(e.target.value)}
                  className="water-drop-pill rounded-full px-3 py-1 text-xs font-semibold text-on-surface outline-hidden cursor-pointer"
                >
                  <option value="2–4 Guests">2–4 Guests</option>
                  <option value="4–6 Guests">4–6 Guests</option>
                  <option value="6–10 Guests">6–10 Guests</option>
                  <option value="10–15 Guests">10–15 Guests</option>
                  <option value="15+ Guests">15+ Guests (Pavilion)</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] font-mono text-on-surface-muted hidden sm:block">
              Live Demo Booking · Instant Digital Ticket Pass
            </div>
          </div>

          {/* Notification when item is added */}
          {addedItemName && (
            <div className="water-drop-surface-deep rounded-2xl p-4 flex items-center justify-between border border-emerald-500/40 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <LuCircleCheck className="size-4 text-emerald-600" />
                <span>Added &quot;{addedItemName}&quot; to your booking bag!</span>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="water-drop-button-primary px-3 py-1 text-[11px] font-bold"
              >
                View Bag ({totalCount})
              </button>
            </div>
          )}

          {/* Cottages & Rooms Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filteredCottages.map((cot) => {
              const isHall = cot.category === "Function Hall";
              const isRoom = cot.category.includes("Room");

              return (
                <div
                  key={cot.id}
                  className="water-drop-surface group rounded-3xl overflow-hidden flex flex-col justify-between p-5 transition-all duration-300 hover:shadow-xl"
                >
                  <div>
                    {/* Photo & Badge */}
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={cot.image || resort.image}
                        alt={cot.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${
                            isHall
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : isRoom
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          {cot.category}
                        </span>
                        <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-sky-800 bg-sky-50">
                          Pay Online
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs">
                          {cot.availableCount} Available Today
                        </span>
                      </div>
                    </div>

                    {/* Title & Pricing */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-extrabold text-on-surface">
                          {cot.name}
                        </h3>
                        <span className="font-display text-base font-black text-primary shrink-0">
                          {cot.rate}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-muted">
                        <LuUsers className="size-3.5 text-outline" />
                        <span>{cot.capacity}</span>
                      </div>

                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {cot.features}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="mt-5 border-t border-outline-variant/20 pt-4">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(cot)}
                      className="water-drop-button-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <LuShoppingBag className="size-3.5" />
                      <span>Add to Bag (Pay Online)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Resort Amenities & Guidelines */}
        <section className="water-drop-surface-deep rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
              Guidelines &amp; Practical Details
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface">
              Beachside Rules &amp; Amenities
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="water-drop-surface rounded-2xl p-4 space-y-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
                <LuWaves className="size-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface">
                Swimming &amp; Tides
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Calm waters ideal for children and family swimming during high and moderate tides.
              </p>
            </div>

            <div className="water-drop-surface rounded-2xl p-4 space-y-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
                <LuFlame className="size-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface">
                Barbecue &amp; Grilling
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Open-air charcoal grilling stations available for guest picnics and family gatherings.
              </p>
            </div>

            <div className="water-drop-surface rounded-2xl p-4 space-y-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
                <LuCar className="size-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface">
                Parking &amp; Access
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct vehicle driveway access and shaded parking area for motorbikes, vans, and SUVs.
              </p>
            </div>

            <div className="water-drop-surface rounded-2xl p-4 space-y-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
                <LuShieldCheck className="size-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface">
                Verified Verification
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct hotline confirmation with resort caretakers before arrival for smooth check-in.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Complete Add-To-Cart & Demo Checkout Drawer */}
      <BookingCartDrawer />

      {/* 6. Footer */}
      <Footer projectName={projectName} />
    </div>
  );
}
