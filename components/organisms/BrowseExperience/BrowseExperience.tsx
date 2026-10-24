"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LuSearch,
  LuMapPin,
  LuPhone,
  LuPhoneCall,
  LuArrowUpRight,
  LuTreePalm,
  LuShoppingBag,
  LuUser,
} from "react-icons/lu";
import dynamic from "next/dynamic";
import { BookingCartDrawer } from "@/components/organisms/BookingCartDrawer/BookingCartDrawer";

const ResortMap = dynamic(
  () =>
    import("@/components/molecules/ResortMap/ResortMap").then(
      (m) => m.ResortMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="water-drop-surface flex items-center justify-center rounded-3xl min-h-105">
        <div className="flex flex-col items-center gap-2 text-center text-xs text-on-surface-muted">
          <div className="size-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span>Loading Tukuran Coastal Map...</span>
        </div>
      </div>
    ),
  }
);
import { Footer } from "@/components/organisms/Footer/Footer";
import { useCart } from "@/lib/context/cart.context";
import { useBrowseExperience } from "./browseExperience.hooks";

interface BrowseExperienceProps {
  projectName?: string;
}

export function BrowseExperience({
  projectName = "PROJECT ONE",
}: BrowseExperienceProps) {
  const {
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    selectedResort,
    handleSelectResort,
    filteredResorts,
    mobileView,
    setMobileView,
  } = useBrowseExperience();

  const { totalCount, openCart, guestName } = useCart();

  return (
    <div className="relative min-h-screen bg-transparent text-on-surface antialiased flex flex-col justify-between">
      {/* 1. Browse Top Floating Navigation Header */}
      <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-8 sm:pt-4">
        <div className="water-drop-pill rounded-full mx-auto flex w-full max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <Link
              href="/landing"
              className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-xs">
                <LuTreePalm className="size-4" />
              </span>
              <div className="truncate">
                <span className="font-display text-xs sm:text-sm font-extrabold tracking-tight text-on-surface block leading-tight truncate">
                  {projectName}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-on-surface-muted block leading-none truncate">
                  Tukuran Coastal Explorer
                </span>
              </div>
            </Link>
          </div>

          {/* Quick links & Cart Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/landing#highlights"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span>Featured</span>
            </Link>

            {/* Demo Guest Indicator */}
            <div className="water-drop-pill rounded-full hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-on-surface">
              <LuUser className="size-3 text-primary" />
              <span className="max-w-25 truncate">{guestName}</span>
              <span className="rounded-full bg-surface-container-high px-1.5 py-0.2 text-[8px] uppercase tracking-wider text-on-surface-muted font-mono">
                Guest
              </span>
            </div>

            {/* Cart Trigger with Counter Badge */}
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

      {/* 2. Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-8 sm:py-8 lg:py-12">
        {/* Page Title & Context Header */}
        <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-3 py-1 text-[11px] sm:text-xs font-semibold text-on-surface">
                <span className="size-2 rounded-full bg-emerald-600" />
                <span>COASTAL RESORT &amp; COTTAGE MAP · TUKURAN</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mt-1.5 sm:mt-2">
                Browse Shoreline Resorts
              </h1>
            </div>

            {/* Mobile View Toggle */}
            <div className="water-drop-pill rounded-full flex items-center p-1 lg:hidden self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setMobileView("map")}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${mobileView === "map"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                Map View
              </button>
              <button
                type="button"
                onClick={() => setMobileView("list")}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${mobileView === "list"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                List View
              </button>
              <button
                type="button"
                onClick={() => setMobileView("split")}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${mobileView === "split"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                  }`}
              >
                Both
              </button>
            </div>
          </div>

          {/* Search Input & Quick Filter Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resort name, barangay, or location code..."
                className="water-drop-pill rounded-full w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted transition-all"
              />
            </div>

            {/* Filter Pills - Swipeable on phone */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`water-drop-pill rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${filterCategory === "all"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-white"
                  }`}
              >
                All 3 Resorts
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("day")}
                className={`water-drop-pill rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${filterCategory === "day"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-white"
                  }`}
              >
                Day Cottages
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("functionhall")}
                className={`water-drop-pill rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${filterCategory === "functionhall"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-white"
                  }`}
              >
                Function Halls
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("overnight")}
                className={`water-drop-pill rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${filterCategory === "overnight"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-white"
                  }`}
              >
                Overnight Rooms
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("budget")}
                className={`water-drop-pill rounded-full shrink-0 px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${filterCategory === "budget"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-white"
                  }`}
              >
                Under ₱1,000
              </button>
            </div>
          </div>
        </div>


        {/* 3. Interactive Split Map & Resort List Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Vector MapLibre Map */}
          <div
            className={`lg:col-span-6 lg:sticky lg:top-24 ${mobileView === "list" ? "hidden lg:block" : "block"
              }`}
          >
            <ResortMap
              resorts={filteredResorts}
              selectedResort={selectedResort}
              onSelectResort={handleSelectResort}
              className="h-115 sm:h-135 lg:h-155"
            />
          </div>

          {/* Right Column: Resort Cards & Unit Preview */}
          <div
            className={`lg:col-span-6 space-y-6 ${mobileView === "map" ? "hidden lg:block" : "block"
              }`}
          >
            {filteredResorts.length === 0 ? (
              <div className="water-drop-surface rounded-3xl p-8 text-center space-y-3">
                <LuSearch className="mx-auto size-8 text-outline" />
                <h3 className="font-display text-lg font-bold text-on-surface">
                  No resorts matched your search
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Try adjusting your search terms or tap &quot;All 3 Resorts&quot; to reset.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className="water-drop-button-primary px-4 py-2 text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredResorts.map((resort) => {
                const isSelected = selectedResort?.id === resort.id;
                return (
                  <div
                    key={resort.id}
                    onClick={() => handleSelectResort(resort)}
                    className={`water-drop-surface group rounded-3xl overflow-hidden p-5 sm:p-6 transition-all duration-300 cursor-pointer ${isSelected
                      ? "ring-2 ring-primary shadow-xl"
                      : "hover:shadow-lg"
                      }`}
                  >
                    {/* Top Picture & Badges */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                      <Image
                        src={resort.image}
                        alt={resort.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap">
                        <span className="water-drop-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-on-surface shadow-xs">
                          {resort.number} · {resort.name}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {resort.hasFunctionHall && (
                            <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                              Function Hall
                            </span>
                          )}
                          {resort.hasOvernightRooms && (
                            <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                              Overnight Rooms
                            </span>
                          )}
                          <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-sky-800 bg-sky-50 border border-sky-200">
                            Pay Online
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-white/90">
                          {resort.barangay}, Tukuran
                        </p>
                        <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
                          {resort.name}
                        </h2>
                      </div>
                    </div>

                    {/* Resort Description */}
                    <div className="mt-4 space-y-3">
                      <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant font-normal">
                        {resort.overview}
                      </p>

                      <div className="water-drop-surface-deep rounded-2xl p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <LuMapPin className="size-3.5 text-primary shrink-0" />
                          <span className="font-mono text-[11px] text-on-surface font-semibold">
                            {resort.locationCode}
                          </span>
                        </div>
                        <a
                          href={`tel:${resort.contactNumber}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-xs font-bold text-primary underline flex items-center gap-1"
                        >
                          <LuPhone className="size-3" />
                          {resort.contactNumber}
                        </a>
                      </div>

                      {/* Units Quick Breakdown */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-on-surface-muted">
                          <span>Available Units ({resort.cottages.length})</span>
                          <span className="font-mono text-primary font-bold">
                            From {resort.cottages[0].rate}
                          </span>
                        </div>

                        <div className="grid gap-1.5 sm:grid-cols-3">
                          {resort.cottages.map((cot) => (
                            <div
                              key={cot.id}
                              className="water-drop-surface-deep rounded-xl p-2.5 text-[11px] space-y-0.5"
                            >
                              <span className="font-bold text-on-surface truncate block">
                                {cot.name}
                              </span>
                              <span className="font-mono text-primary font-bold block">
                                {cot.rate}
                              </span>
                              <span className="text-[10px] text-on-surface-muted block">
                                {cot.capacity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="pt-2 flex items-center gap-3">
                        <Link
                          href={`/resorts/${resort.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="water-drop-button-primary flex-1 py-3 text-center text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Explore Available Units &amp; Book</span>
                          <LuArrowUpRight className="size-4" />
                        </Link>
                        <a
                          href={`tel:${resort.contactNumber}`}
                          onClick={(e) => e.stopPropagation()}
                          className="water-drop-button-secondary px-4 py-3 text-xs font-bold flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          <LuPhoneCall className="size-3.5" />
                          <span className="hidden sm:inline">Call Hotline</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* 4. Slide-Out Booking Bag & Demo Confirmation Drawer */}
      <BookingCartDrawer />

      {/* 5. Monolithic Modern Footer */}
      <Footer projectName={projectName} />
    </div>
  );
}
