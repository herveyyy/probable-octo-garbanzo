"use client";

import Link from "next/link";
import { LuMapPin, LuPhoneCall, LuSparkles, LuMap } from "react-icons/lu";
import { Footer } from "@/components/organisms/Footer/Footer";
import { IslandNavbar } from "@/components/molecules/IslandNavbar/IslandNavbar";
import { ResortHighlightCard } from "@/components/molecules/ResortHighlightCard/ResortHighlightCard";
import { CottagePass } from "@/components/molecules/CottagePass/CottagePass";
import { ResortMatrixTable } from "@/components/molecules/ResortMatrixTable/ResortMatrixTable";
import { SoundscapeWidget } from "@/components/molecules/SoundscapeWidget/SoundscapeWidget";
import { BookingInquiryForm } from "@/components/molecules/BookingInquiryForm/BookingInquiryForm";
import { BookingCartDrawer } from "@/components/organisms/BookingCartDrawer/BookingCartDrawer";
import { useInstallLanding } from "./installLanding.hooks";

interface InstallLandingProps {
  projectName?: string;
}

export function InstallLanding({
  projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE",
}: InstallLandingProps) {
  const {
    resorts,
    activeResort,
    guestFilter,
    setGuestFilter,
    handleSelectResort,
  } = useInstallLanding();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-on-surface antialiased flex flex-col justify-between">
      {/* 1. Responsive Island Navigation Molecule */}
      <IslandNavbar
        projectName={projectName}
        activeResort={activeResort}
        onSelectResort={handleSelectResort}
      />

      {/* 2. Hero Section */}
      <main className="relative z-10 mx-auto w-full max-w-340 px-6 pt-24 pb-16 lg:px-12 lg:pt-36">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 space-y-6">


            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-on-surface leading-[1.04]">
              Beach resorts, open-air cottages, <br />
              function halls &amp; overnight rooms.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-on-surface-variant font-normal">
              Book local beachfront kubos, shaded day-trip cottages, grand banquet function halls,
              and overnight coastal rooms in Tukuran, Zamboanga del Sur. Explore the calm waters at <strong>Lantau Beach</strong>,
              group family shorelines at <strong>Donel&apos;s Beach Resort</strong>, and waterfront retreats
              at <strong>Sirena Beach Resort</strong> in Dalahikan. Secure instant passes with online payment via GCash, Maya, or Card.
            </p>

            {/* Quick Filter Capsules */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-muted mr-1">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => setGuestFilter("all")}
                className={`water-drop-pill rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${guestFilter === "all" ? "bg-primary text-on-primary" : "text-on-surface hover:bg-white"
                  }`}
              >
                All 3 Resorts
              </button>
              <button
                type="button"
                onClick={() => setGuestFilter("day")}
                className={`water-drop-pill rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${guestFilter === "day" ? "bg-primary text-on-primary" : "text-on-surface hover:bg-white"
                  }`}
              >
                Day-Trip Open-Air Cottages
              </button>
              <button
                type="button"
                onClick={() => setGuestFilter("functionhall")}
                className={`water-drop-pill rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${guestFilter === "functionhall" ? "bg-primary text-on-primary" : "text-on-surface hover:bg-white"
                  }`}
              >
                Event Function Halls
              </button>
              <button
                type="button"
                onClick={() => setGuestFilter("overnight")}
                className={`water-drop-pill rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${guestFilter === "overnight" ? "bg-primary text-on-primary" : "text-on-surface hover:bg-white"
                  }`}
              >
                Overnight Rooms
              </button>
            </div>
          </div>

          {/* Hero Quick Spotlight Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="water-drop-surface rounded-3xl p-5 transition-all duration-300 ease-in-out hover:shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                  Quick Active Spot
                </p>
                <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-on-surface">
                  {activeResort.openHours}
                </span>
              </div>
              <p className="mt-2 font-display text-xl font-extrabold text-on-surface">
                {activeResort.name}
              </p>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5 flex items-center gap-1.5">
                <LuMapPin className="size-3 text-outline" />
                {activeResort.locationCode}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-outline-variant/30 pt-3">
                <span className="text-xs font-semibold text-on-surface-muted">
                  Cottages Starting
                </span>
                <span className="font-display text-base font-extrabold text-primary">
                  {activeResort.cottages[0].rate}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/browse"
                className="water-drop-button-primary flex-1 py-3.5 text-center text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <LuMap className="size-3.5" />
                <span>Explore Map &amp; Browse</span>
              </Link>
              <a
                href="#highlights"
                className="water-drop-button-secondary px-5 py-3.5 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Highlights ↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. The 3 Featured Resort Highlights Grid */}
        <span id="resorts" className="scroll-mt-28 -translate-y-28 block pointer-events-none" />
        <section id="highlights" className="mt-24 scroll-mt-24 lg:mt-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-outline-variant/30 pb-6">
            <div className="space-y-2">
              <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-primary">
                <LuSparkles className="size-3 text-primary" />
                <span>TUKURAN COASTAL HIGHLIGHTS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
                Featured Resorts &amp; Shoreline Spots
              </h2>
              <p className="text-sm text-on-surface-variant max-w-2xl font-normal">
                Discover the 3 premier beach destinations in Tukuran, Zamboanga del Sur. Each
                offers a unique seaside atmosphere for day trips, group gatherings, and cottage getaways.
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <span className="font-mono text-xs font-bold text-on-surface-muted">
                3 LOCATIONS VERIFIED
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {resorts.map((resort) => {
              const isSelected = activeResort.id === resort.id;
              const matchesFilter =
                guestFilter === "all" ||
                (guestFilter === "day" &&
                  resort.cottages.some((c) => c.category === "Day Cottage")) ||
                (guestFilter === "functionhall" && resort.hasFunctionHall) ||
                (guestFilter === "overnight" && resort.hasOvernightRooms);

              return (
                <ResortHighlightCard
                  key={resort.id}
                  resort={resort}
                  isSelected={isSelected}
                  matchesFilter={matchesFilter}
                  onSelect={(r) => handleSelectResort(r, true)}
                />
              );
            })}
          </div>
        </section>

        {/* 4. Interactive Cottage & Room Reservation Pass */}
        <span id="cottages" className="scroll-mt-28 -translate-y-28 block pointer-events-none" />
        <section id="cottage-pass" className="mt-24 scroll-mt-24 lg:mt-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-outline-variant/30 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-muted">
                Direct Booking Engine
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
                Cottage Selection &amp; Pass Customizer
              </h2>
            </div>

            <div className="water-drop-pill rounded-full flex flex-wrap items-center gap-2 p-1.5">
              {resorts.map((r) => {
                const isRSelected = activeResort.id === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectResort(r)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${isRSelected
                      ? "water-drop-button-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white"
                      }`}
                  >
                    {r.number} · {r.name}
                  </button>
                );
              })}
            </div>
          </div>

          <CottagePass resort={activeResort} />
        </section>

        {/* 5. Side-by-Side Comparison Matrix */}
        <ResortMatrixTable onSelectResort={handleSelectResort} />

        {/* 6. Coastal Audio Landscape */}
        <SoundscapeWidget resort={activeResort} />

        {/* 7. Direct Reservation Inquiry Form */}
        <BookingInquiryForm
          activeResort={activeResort}
          onSelectResort={handleSelectResort}
        />
      </main>

      {/* 8. Slide-out Booking Bag Drawer */}
      <BookingCartDrawer />

      {/* 9. Modern Monolithic Dark Footer */}
      <Footer projectName={projectName} />
    </div>
  );
}

export function InstallLandingFallback() {
  return (
    <div className="relative min-h-screen bg-surface">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-20 lg:px-16">
        <div className="water-drop-pill h-12 w-48" />
        <div className="mt-16 grid gap-12 xl:grid-cols-2">
          <div className="water-drop-surface h-64 rounded-3xl" />
          <div className="water-drop-surface h-96 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
