"use client";

import {
  LuTent,
  LuPhone,
  LuPhoneCall,
  LuClock,
  LuUsers,
  LuCheck,
  LuMapPin,
} from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { useCottagePass } from "./cottagePass.hooks";

interface CottagePassProps {
  resort: ResortHighlight;
}

export function CottagePass({ resort }: CottagePassProps) {
  const { selectedIdx, activeCottage, handleSelectCottage } = useCottagePass({
    resort,
  });

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
      {/* Left: Active Resort Photographic Showcase */}
      <div className="water-drop-surface lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-3xl">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-3xl group">
          <img
            src={resort.image}
            alt={resort.name}
            className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="water-drop-pill rounded-full px-3.5 py-1 font-mono text-[11px] font-bold text-on-surface shadow-xs flex items-center gap-1.5">
              <LuMapPin className="size-3 text-primary" /> {resort.locationCode}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                {resort.barangay}, {resort.municipality}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                {resort.name}
              </h3>
            </div>
            <span className="water-drop-pill rounded-full px-3.5 py-1 text-xs font-bold text-on-surface shadow-xs">
              {resort.badge}
            </span>
          </div>
        </div>

        {/* Exact Description & Inclusions */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant font-normal">
              {resort.overview}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-on-surface font-semibold">
              {resort.details}
            </p>
          </div>

          {/* Direct Contact Banner */}
          <div className="water-drop-surface-deep flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                Direct Resort Phone Hotline
              </p>
              <p className="font-mono text-base font-extrabold text-primary flex items-center gap-1.5">
                <LuPhoneCall className="size-4" />
                {resort.contactNumber}
              </p>
            </div>
            <a
              href={`tel:${resort.contactNumber}`}
              className="water-drop-button-primary px-5 py-2 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
            >
              Call to Inquire
            </a>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2 border-t border-outline-variant/30 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted">
              Key Resort Highlights
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {resort.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-on-surface"
                >
                  <span className="water-drop-pill flex size-4 items-center justify-center rounded-full text-emerald-700">
                    <LuCheck className="size-2.5 stroke-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Tactile Reservation Pass */}
      <div className="water-drop-surface-deep lg:col-span-5 flex flex-col justify-between rounded-3xl p-6 sm:p-8">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-outline-variant/50 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-on-primary">
                <LuTent className="size-3.5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                  TUKURAN COTTAGE PASS
                </p>
                <p className="font-mono text-xs font-extrabold text-on-surface">
                  {resort.name.toUpperCase()} // RES-0{resort.number}
                </p>
              </div>
            </div>
            <span className="water-drop-pill rounded-full px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-700">
              AVAILABLE
            </span>
          </div>

          {/* Cottage Option Selector */}
          <div className="my-5 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-muted">
              Select Cottage or Room Type
            </p>
            <div className="flex flex-col gap-2">
              {resort.cottages.map((cot, idx) => {
                const isCotSelected = selectedIdx === idx;
                return (
                  <button
                    key={cot.name}
                    type="button"
                    onClick={() => handleSelectCottage(idx)}
                    className={`text-left p-3.5 rounded-2xl transition-all duration-200 ease-in-out cursor-pointer border ${isCotSelected
                        ? "bg-white border-primary shadow-sm scale-[1.01]"
                        : "bg-surface-container-low/60 border-transparent hover:bg-white/80 hover:scale-[1.005]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">
                        {cot.name}
                      </span>
                      <span className="font-mono text-xs font-black text-primary">
                        {cot.rate}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-on-surface-muted">
                      <span className="flex items-center gap-1">
                        <LuUsers className="size-3" /> {cot.capacity}
                      </span>
                      <span className="text-[10px] font-medium">{cot.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Perforated Pass Ticket Details */}
          <div className="ticket-notch-left ticket-notch-right relative my-4 rounded-2xl bg-surface-container-low/80 p-5 border border-white/80">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Cottage Choice</span>
                <span className="font-bold text-on-surface text-right truncate max-w-44">
                  {activeCottage.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Guest Capacity</span>
                <span className="font-mono font-semibold text-on-surface flex items-center gap-1">
                  <LuUsers className="size-3 text-outline" />
                  {activeCottage.capacity}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Schedule</span>
                <span className="font-mono font-semibold text-on-surface flex items-center gap-1">
                  <LuClock className="size-3 text-outline" />
                  {resort.openHours}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-muted">Direct Hotline</span>
                <a
                  href={`tel:${resort.contactNumber}`}
                  className="font-mono font-bold text-primary underline flex items-center gap-1"
                >
                  <LuPhone className="size-3" />
                  {resort.contactNumber}
                </a>
              </div>
            </div>

            <div className="mt-3 border-t border-outline-variant/30 pt-2 text-[10px] text-on-surface-variant italic">
              Includes: {activeCottage.features}
            </div>
          </div>

          {/* Barcode Graphic */}
          <div className="mt-4 flex flex-col items-center justify-center space-y-1 rounded-2xl bg-white/70 py-2.5 border border-white/80">
            <div className="flex h-7 items-end gap-1 opacity-80" aria-hidden>
              {[2, 4, 1, 3, 2, 5, 2, 4, 1, 3, 5, 2, 1, 4, 3, 2, 4, 1, 5, 2, 3].map(
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
              TUKURAN-PASS-{resort.id.toUpperCase()}-2026
            </p>
          </div>
        </div>

        {/* Price & Action Triggers */}
        <div className="mt-5 space-y-3 border-t border-dashed border-outline-variant/50 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-on-surface-muted uppercase">
                Cottage Rate
              </p>
              <p className="font-display text-2xl font-black text-on-surface">
                {activeCottage.rate}
              </p>
            </div>
            <a
              href={`tel:${resort.contactNumber}`}
              className="water-drop-button-secondary px-4 py-2 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <LuPhoneCall className="size-3.5" />
              <span>Call Directly</span>
            </a>
          </div>

          <a
            href="#booking"
            className="water-drop-button-primary block w-full py-3.5 text-center text-xs font-bold transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.99]"
          >
            Book This Cottage at {resort.name}
          </a>
        </div>
      </div>
    </div>
  );
}
