"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuTreePalm,
  LuMapPin,
  LuPhone,
  LuPhoneCall,
  LuClock,
  LuChevronDown,
  LuMenu,
  LuX,
  LuTent,
  LuWaves,
  LuVolume2,
  LuSparkles,
  LuArrowRight,
  LuShoppingBag,
  LuMap,
  LuUser,
} from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { TUKURAN_RESORTS } from "@/lib/entities/resorts.type";
import { useCart } from "@/lib/context/cart.context";
import { useIslandNavbar } from "./islandNavbar.hooks";

interface IslandNavbarProps {
  projectName?: string;
  activeResort: ResortHighlight;
  onSelectResort: (resort: ResortHighlight) => void;
}

export function IslandNavbar({
  projectName = "PROJECT ONE",
  activeResort,
  onSelectResort,
}: IslandNavbarProps) {
  const {
    isTopHudOpen,
    isScrolled,
    isCircleIslandOpen,
    isMobileMenuOpen,
    isGuestModalOpen,
    toggleTopHud,
    closeTopHud,
    toggleCircleIsland,
    closeCircleIsland,
    toggleMobileMenu,
    closeMobileMenu,
    openGuestModal,
    closeGuestModal,
    handleSelectAndClose,
  } = useIslandNavbar({ activeResort, onSelectResort });

  const { totalCount, openCart, guestName, setGuestName, resetGuestName } = useCart();
  const [customName, setCustomName] = useState<string | null>(null);
  const displayInputName = customName ?? guestName;

  const handleCloseGuestModal = () => {
    setCustomName(null);
    closeGuestModal();
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. UNSCROLLED DESKTOP CAPSULES (lg+)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={`fixed top-5 inset-x-0 z-40 px-6 sm:px-10 hidden lg:flex items-center justify-between pointer-events-none transition-all duration-300 ease-in-out ${isScrolled
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
          }`}
      >
        {/* Top-Left Island HUD */}
        <div className="pointer-events-auto relative">
          <button
            type="button"
            onClick={toggleTopHud}
            className={`water-drop-pill rounded-full group flex items-center gap-2.5 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] ${isTopHudOpen ? "ring-2 ring-primary bg-white shadow-xl" : "hover:bg-white"
              }`}
          >
            {/* Calm solid status dot, zero blinking ping */}
            <span className="size-2 rounded-full bg-emerald-600" aria-hidden />
            <span className="font-mono text-[11px] font-bold tracking-tight text-on-surface">
              TUKURAN COAST
            </span>
            <span className="text-[11px] font-medium text-on-surface-muted">
              {activeResort.name}
            </span>
            <LuChevronDown
              className={`size-3 text-outline transition-transform duration-300 ease-in-out ${isTopHudOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Expanded Top-Left Info Card */}
          {isTopHudOpen && (
            <div className="absolute top-12 left-0 w-80 water-drop-surface-deep rounded-3xl p-5 shadow-2xl transition-all duration-300 ease-in-out z-50">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-600" />
                  <span className="font-mono text-xs font-bold text-on-surface">
                    COASTAL CONDITIONS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeTopHud}
                  className="water-drop-pill rounded-full size-6 flex items-center justify-center text-xs text-on-surface-muted hover:text-on-surface cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <LuX className="size-3.5" />
                </button>
              </div>

              <div className="space-y-2 py-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted flex items-center gap-1.5">
                    <LuMapPin className="size-3.5 text-outline" /> Location
                  </span>
                  <span className="font-semibold text-on-surface">Tukuran, ZDS, Philippines</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted flex items-center gap-1.5">
                    <LuTreePalm className="size-3.5 text-outline" /> Active Resort
                  </span>
                  <span className="font-bold text-primary">{activeResort.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted flex items-center gap-1.5">
                    <LuPhone className="size-3.5 text-outline" /> Direct Hotline
                  </span>
                  <a
                    href={`tel:${activeResort.contactNumber}`}
                    className="font-mono font-bold text-primary underline hover:text-on-surface transition-colors duration-200"
                  >
                    {activeResort.contactNumber}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-muted flex items-center gap-1.5">
                    <LuClock className="size-3.5 text-outline" /> Schedule
                  </span>
                  <span className="font-mono text-on-surface">{activeResort.openHours}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex gap-2">
                <a
                  href="#highlights"
                  onClick={closeTopHud}
                  className="water-drop-button-primary flex-1 py-2 text-center text-[10px] font-bold transition-all duration-200 ease-in-out"
                >
                  Inspect Highlights
                </a>
                <a
                  href="#cottage-pass"
                  onClick={closeTopHud}
                  className="water-drop-button-secondary flex-1 py-2 text-center text-[10px] font-bold transition-all duration-200 ease-in-out"
                >
                  Book Cottage Pass
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Center/Right Desktop Navbar */}
        <header className="pointer-events-auto">
          <nav className="water-drop-pill rounded-full flex items-center gap-6 sm:gap-8 px-6 py-2.5 transition-all duration-300 ease-in-out shadow-md">
            <Link
              href="/landing"
              className="flex items-center gap-2.5 transition-transform duration-200 ease-in-out hover:scale-105"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-on-primary">
                <LuTreePalm className="size-3.5" />
              </span>
              <div className="text-left">
                <span className="font-display text-sm font-bold tracking-tight text-on-surface block leading-tight">
                  {projectName}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-on-surface-muted block leading-none">
                  Tukuran Resorts
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-5 text-xs font-semibold text-on-surface-variant">
              <Link
                href="/browse"
                className="flex items-center gap-1.5 text-primary font-bold transition-all duration-200 hover:scale-105"
              >
                <LuMap className="size-3.5" />
                <span>Browse Map</span>
              </Link>
              <a
                href="#highlights"
                className="transition-colors duration-200 ease-in-out hover:text-on-surface"
              >
                Highlights
              </a>
              <a
                href="#cottage-pass"
                className="transition-colors duration-200 ease-in-out hover:text-on-surface"
              >
                Cottages &amp; Pass
              </a>
              <a
                href="#compare"
                className="transition-colors duration-200 ease-in-out hover:text-on-surface"
              >
                Resort Matrix
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={openGuestModal}
                className="water-drop-pill rounded-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-white cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
                title="Click to change Demo Guest Name"
              >
                <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <LuUser className="size-3" />
                </div>
                <span className="text-[11px] font-bold text-on-surface max-w-22.5 truncate">
                  {guestName}
                </span>
                <span className="rounded-full bg-surface-container-high px-1.5 py-0.5 text-[9px] font-bold text-on-surface-muted uppercase">
                  Guest
                </span>
              </button>

              <button
                type="button"
                onClick={openCart}
                className="water-drop-button-secondary flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Open Booking Bag"
              >
                <LuShoppingBag className="size-3.5" />
                <span>Bag</span>
                {totalCount > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-on-primary text-[10px] font-black">
                    {totalCount}
                  </span>
                )}
              </button>

              <a
                href="#booking"
                className="water-drop-button-primary px-4 py-2 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Book Cottage
              </a>
            </div>
          </nav>
        </header>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE/TABLET FLOATING DYNAMIC HEADER (< lg)
          Clean, Spacious, Zero Overflow, Perfect Tap Targets
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-2 sm:top-4 inset-x-2 sm:inset-x-6 z-40 lg:hidden transition-all duration-300 ease-in-out safe-pt safe-px">
        <div
          className={`water-drop-pill rounded-full flex items-center justify-between px-3.5 py-2 shadow-xl w-full max-w-lg mx-auto backdrop-blur-xl transition-all duration-300 ${
            isScrolled ? "bg-white/92 ring-1 ring-primary/20 shadow-2xl" : "bg-white/80"
          }`}
        >
          {/* Brand Logo & Name */}
          <Link href="/landing" className="flex items-center gap-2 min-w-0 pr-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm">
              <LuTreePalm className="size-4" />
            </span>
            <div className="truncate">
              <span className="font-display text-xs font-black tracking-tight text-on-surface block leading-tight truncate">
                {projectName}
              </span>
              <span className="text-[10px] font-semibold text-primary block leading-none truncate">
                {activeResort.name}
              </span>
            </div>
          </Link>

          {/* Clean Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Bag Button with Animated Count Badge */}
            <button
              type="button"
              onClick={openCart}
              className={`water-drop-pill rounded-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                totalCount > 0 ? "bg-primary text-white shadow-md" : "hover:bg-white text-on-surface"
              }`}
              aria-label="Open Booking Bag"
            >
              <LuShoppingBag className="size-3.5" />
              <span>Bag</span>
              {totalCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-white text-primary text-[10px] font-black">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Menu Trigger */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
              className={`water-drop-pill rounded-full size-9 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 ${
                isMobileMenuOpen ? "bg-primary text-white" : "hover:bg-white text-on-surface"
              }`}
            >
              {isMobileMenuOpen ? <LuX className="size-4" /> : <LuMenu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="mt-2 water-drop-surface-deep rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300 ease-in-out w-full max-w-lg mx-auto max-h-[calc(100dvh-5.5rem)] overflow-y-auto no-scrollbar safe-pb">
            {/* Demo Guest Account Strip */}
            <div className="water-drop-surface rounded-2xl p-3 mb-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <LuUser className="size-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Guest Account (Demo)
                  </span>
                  <span className="font-bold text-on-surface text-xs">{guestName}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openGuestModal();
                }}
                className="water-drop-button-secondary px-2.5 py-1 text-[10px] font-bold"
              >
                Change Name
              </button>
            </div>

            {/* Quick Switch Resort Tabs on Mobile */}
            <div className="water-drop-surface rounded-2xl p-3 mb-3 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                Quick Select Beach Resort:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {TUKURAN_RESORTS.map((r) => {
                  const isSel = activeResort.id === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectAndClose(r)}
                      className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold transition-all cursor-pointer truncate ${
                        isSel ? "bg-primary text-white shadow-xs" : "bg-white/70 hover:bg-white text-on-surface"
                      }`}
                    >
                      {r.name.replace(" Beach Resort", "").replace(" Resort", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Resort Info Card */}
            <div className="water-drop-surface rounded-2xl p-3 mb-4 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-on-surface">
                  <span className="size-2 rounded-full bg-emerald-600" />
                  {activeResort.name}
                </span>
                <span className="font-mono text-[10px] text-on-surface-muted">
                  {activeResort.openHours}
                </span>
              </div>
              <div className="pt-1 flex items-center justify-between">
                <a
                  href={`tel:${activeResort.contactNumber}`}
                  className="inline-flex items-center gap-1 font-mono font-bold text-primary text-xs underline"
                >
                  <LuPhone className="size-3" />
                  {activeResort.contactNumber}
                </a>
                <span className="water-drop-pill rounded-full px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Open Today
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs font-semibold text-on-surface">
              <Link
                href="/browse"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 hover:bg-primary/15 transition-all duration-200 font-bold text-primary"
              >
                <span className="flex items-center gap-2.5">
                  <LuMap className="size-4 text-primary" /> Interactive Map &amp; Browse
                </span>
                <LuArrowRight className="size-3.5" />
              </Link>
              <a
                href="#highlights"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <LuSparkles className="size-4 text-primary" /> 3 Resort Highlights
                </span>
                <LuArrowRight className="size-3.5 opacity-50" />
              </a>
              <a
                href="#cottage-pass"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <LuTent className="size-4 text-primary" /> Cottages &amp; Reservation Pass
                </span>
                <LuArrowRight className="size-3.5 opacity-50" />
              </a>
              <a
                href="#compare"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <LuWaves className="size-4 text-primary" /> Compare All 3 Resorts
                </span>
                <LuArrowRight className="size-3.5 opacity-50" />
              </a>
              <a
                href="#soundscape"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <LuVolume2 className="size-4 text-primary" /> Seaside Audio Ambience
                </span>
                <LuArrowRight className="size-3.5 opacity-50" />
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex gap-2">
              <a
                href="#booking"
                onClick={closeMobileMenu}
                className="water-drop-button-primary flex-1 py-3 text-center text-xs font-bold transition-all duration-200"
              >
                Reserve Cottage Now
              </a>
              <a
                href={`tel:${activeResort.contactNumber}`}
                className="water-drop-button-secondary px-4 py-3 text-xs font-bold flex items-center justify-center transition-all duration-200"
                aria-label="Direct Call"
              >
                <LuPhoneCall className="size-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SCROLLED CIRCLE ISLAND (Desktop Only, lg+)
          ───────────────────────────────────────────────────────────── */}
      {isScrolled && (
        <div className="fixed top-5 right-6 z-50 hidden lg:block transition-all duration-300 ease-in-out">
          {!isCircleIslandOpen ? (
            <button
              type="button"
              onClick={toggleCircleIsland}
              aria-label="Expand Resort Island Menu"
              className="water-drop-pill rounded-full group flex size-12 cursor-pointer items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 shadow-xl"
            >
              <LuMenu className="size-5 text-on-surface transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </button>
          ) : (
            <div className="water-drop-surface-deep rounded-3xl p-5 shadow-2xl transition-all duration-300 ease-in-out w-72">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="space-y-0.5">
                  <span className="font-display text-xs font-bold text-on-surface block">
                    {projectName}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-on-surface-muted block">
                    Tukuran Beach Resorts
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCircleIsland}
                  className="water-drop-pill rounded-full flex size-7 items-center justify-center text-on-surface-muted hover:text-on-surface cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <LuX className="size-4" />
                </button>
              </div>

              {/* Quick Switcher Inside Island */}
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                  Quick Select Resort
                </p>
                <div className="flex flex-col gap-1">
                  {TUKURAN_RESORTS.map((r) => {
                    const isSel = activeResort.id === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleSelectAndClose(r)}
                        className={`text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-between ${isSel
                            ? "bg-primary text-on-primary"
                            : "hover:bg-white text-on-surface"
                          }`}
                      >
                        <span>{r.name}</span>
                        <span className="font-mono text-[10px] opacity-75">
                          {r.cottages[0].rate.split("/")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-3 text-xs font-semibold border-t border-outline-variant/20 mt-3">
                <a
                  href="#highlights"
                  onClick={closeCircleIsland}
                  className="rounded-xl px-3 py-1.5 text-on-surface hover:bg-white transition-all duration-200 ease-in-out"
                >
                  Resort Highlights
                </a>
                <a
                  href="#cottage-pass"
                  onClick={closeCircleIsland}
                  className="rounded-xl px-3 py-1.5 text-on-surface hover:bg-white transition-all duration-200 ease-in-out"
                >
                  Cottage &amp; Room Pass
                </a>
                <a
                  href="#compare"
                  onClick={closeCircleIsland}
                  className="rounded-xl px-3 py-1.5 text-on-surface hover:bg-white transition-all duration-200 ease-in-out"
                >
                  Compare All 3 Resorts
                </a>
                <a
                  href="#booking"
                  onClick={closeCircleIsland}
                  className="rounded-xl px-3 py-1.5 text-on-surface hover:bg-white transition-all duration-200 ease-in-out"
                >
                  Direct Inquiry Form
                </a>
              </div>

              <div className="pt-2.5 border-t border-outline-variant/20 mt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-on-surface">
                  <LuUser className="size-3.5 text-outline" />
                  <span className="text-[11px] font-bold truncate max-w-27.5">{guestName}</span>
                  <span className="text-[9px] bg-surface-container-high px-1 rounded-full text-on-surface-muted">Guest</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeCircleIsland();
                    openGuestModal();
                  }}
                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                >
                  Rename
                </button>
              </div>

              <div className="pt-2 border-t border-outline-variant/30 mt-2">
                <a
                  href="#booking"
                  onClick={closeCircleIsland}
                  className="water-drop-button-primary block py-2.5 text-center text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  Reserve Now
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. DEMO GUEST NAME MODAL (Name only, no login required)
          ───────────────────────────────────────────────────────────── */}
      {isGuestModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 w-full h-dvh safe-px safe-pt safe-pb"
        >
          <div className="water-drop-surface-deep rounded-3xl p-5 sm:p-6 shadow-2xl max-w-sm w-full space-y-4 max-h-[90dvh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <LuUser className="size-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-on-surface">
                    Demo Guest Account
                  </h3>
                  <span className="text-[10px] font-semibold text-emerald-800 block">
                    No Login or Password Required
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseGuestModal}
                className="water-drop-pill rounded-full size-7 flex items-center justify-center text-on-surface-muted hover:text-on-surface cursor-pointer transition-colors"
                aria-label="Close Modal"
              >
                <LuX className="size-4" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              This booking app is in demo mode. All seaside reservations and cottage passes are issued under your Guest Name:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (displayInputName.trim()) {
                  setGuestName(displayInputName.trim());
                  setCustomName(null);
                }
                closeGuestModal();
              }}
              className="space-y-3.5"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                  Guest Name (Only Required Field)
                </label>
                <input
                  type="text"
                  required
                  value={displayInputName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Guest Explorer"
                  className="water-drop-pill rounded-full w-full px-4 py-2.5 text-xs text-on-surface outline-hidden placeholder:text-on-surface-muted"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="water-drop-button-primary flex-1 py-2.5 text-xs font-bold cursor-pointer"
                >
                  Save Guest Name
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetGuestName();
                    setCustomName(null);
                    closeGuestModal();
                  }}
                  className="water-drop-button-secondary py-2.5 px-3 text-xs font-bold cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
