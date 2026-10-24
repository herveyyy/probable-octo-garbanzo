"use client";

import Link from "next/link";
import Image from "next/image";
import { LuMapPin, LuPhone, LuWaves, LuArrowUpRight } from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { useResortHighlightCard } from "./resortHighlightCard.hooks";

interface ResortHighlightCardProps {
  resort: ResortHighlight;
  isSelected: boolean;
  matchesFilter: boolean;
  onSelect: (resort: ResortHighlight) => void;
}

export function ResortHighlightCard({
  resort,
  isSelected,
  matchesFilter,
  onSelect,
}: ResortHighlightCardProps) {
  const { handleSelect } = useResortHighlightCard({ resort, onSelect });

  return (
    <div
      className={`water-drop-surface group flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-primary shadow-xl" : "hover:shadow-lg"
      } ${!matchesFilter ? "opacity-40" : ""}`}
    >
      <div>
        {/* Editorial Resort Photo */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-container-high">
          <Image
            src={resort.image}
            alt={resort.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
            <span className="water-drop-pill rounded-full px-3 py-1 font-mono text-[11px] font-bold text-on-surface shadow-xs">
              {resort.number} · {resort.name}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {resort.hasFunctionHall && (
                <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold text-amber-900 bg-amber-50 border border-amber-200">
                  Function Hall
                </span>
              )}
              {resort.hasOvernightRooms && (
                <span className="water-drop-pill rounded-full px-2.5 py-0.5 text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  Rooms Available
                </span>
              )}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/90 block">
              {resort.barangay}, Tukuran
            </span>
            <h3 className="font-display text-2xl font-black tracking-tight text-white">
              {resort.name}
            </h3>
          </div>
        </div>

        {/* Content Specifications */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-medium leading-relaxed text-on-surface">
            {resort.overview}
          </p>

          {/* Location Box */}
          <div className="water-drop-surface-deep rounded-2xl p-3.5 space-y-1">
            <div className="flex items-start gap-2.5">
              <LuMapPin className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                  Location
                </span>
                <span className="font-mono text-xs font-bold text-on-surface block">
                  {resort.locationCode}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="water-drop-surface-deep rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <LuPhone className="size-4 text-primary shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                    Contact
                  </span>
                  <a
                    href={`tel:${resort.contactNumber}`}
                    className="font-mono text-xs font-black text-primary underline"
                  >
                    {resort.contactNumber}
                  </a>
                </div>
              </div>
              <a
                href={`tel:${resort.contactNumber}`}
                className="water-drop-pill px-3 py-1 text-[11px] font-bold text-on-surface hover:bg-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Call
              </a>
            </div>
          </div>

          {/* Details Box */}
          <div className="water-drop-surface-deep rounded-2xl p-3.5 space-y-1">
            <div className="flex items-start gap-2.5">
              <LuWaves className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
                  Details
                </span>
                <p className="text-xs leading-relaxed text-on-surface-variant font-medium">
                  {resort.details}
                </p>
              </div>
            </div>
          </div>

          {/* Cottages & Rates Preview */}
          <div className="space-y-2 border-t border-outline-variant/30 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted block">
              Available Cottages &amp; Rates
            </span>
            <div className="space-y-1.5">
              {resort.cottages.map((cot) => (
                <div
                  key={cot.name}
                  className="flex items-center justify-between text-xs py-1 border-b border-outline-variant/15 last:border-0"
                >
                  <span className="font-semibold text-on-surface truncate max-w-44">
                    {cot.name}
                  </span>
                  <span className="font-mono font-bold text-primary">
                    {cot.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 pt-0 space-y-2">
        <Link
          href={`/resorts/${resort.id}`}
          className="water-drop-button-primary w-full py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>View Available Units &amp; Profile</span>
          <LuArrowUpRight className="size-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleSelect}
          className="water-drop-button-secondary w-full py-2.5 text-xs font-bold transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSelected
            ? "Selected · Customize Pass Below ↓"
            : `Quick Pass Selector`}
        </button>
      </div>
    </div>
  );
}
