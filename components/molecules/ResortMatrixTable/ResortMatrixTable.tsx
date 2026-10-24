"use client";

import Image from "next/image";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { TUKURAN_RESORTS } from "@/lib/entities/resorts.type";
import { useResortMatrixTable } from "./resortMatrixTable.hooks";

interface ResortMatrixTableProps {
  onSelectResort: (resort: ResortHighlight) => void;
}

export function ResortMatrixTable({ onSelectResort }: ResortMatrixTableProps) {
  const { handleSelect } = useResortMatrixTable({ onSelectResort });

  return (
    <section id="compare" className="mt-16 sm:mt-24 lg:mt-32 scroll-mt-24">
      <div className="water-drop-surface rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 border-b border-outline-variant/30 pb-4 sm:pb-6">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-muted">
              Quick Evaluation
            </p>
            <h3 className="font-display text-xl sm:text-3xl font-extrabold tracking-tight text-on-surface mt-1">
              Compare All 3 Tukuran Resorts
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant max-w-sm">
            Choose the best location suited for your cottages, grand function hall banquets, and overnight coastal stays with secure online checkout.
          </p>
        </div>

        {/* MOBILE VIEW (< sm): Clean Comparative Cards */}
        <div className="mt-6 space-y-3 sm:hidden">
          {TUKURAN_RESORTS.map((resort) => {
            const hallOption = resort.cottages.find(
              (c) => c.category === "Function Hall"
            );
            const roomOption = resort.cottages.find((c) =>
              c.category.includes("Room")
            );

            return (
              <div
                key={resort.id}
                className="water-drop-surface-deep rounded-2xl p-4 space-y-3 border border-outline-variant/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={resort.image}
                      alt={resort.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-bold text-on-surface text-sm truncate">{resort.name}</p>
                      <span className="water-drop-pill rounded-full px-2 py-0.5 text-[9px] font-bold text-primary shrink-0">
                        0{resort.number}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-muted font-mono">{resort.locationCode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white/60 rounded-xl p-2.5">
                    <span className="text-[10px] text-on-surface-muted uppercase font-bold block">Day Cottages</span>
                    <span className="font-mono font-bold text-primary block mt-0.5">
                      From {resort.cottages[0].rate.split("/")[0]}
                    </span>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2.5">
                    <span className="text-[10px] text-on-surface-muted uppercase font-bold block">Function Hall</span>
                    <span className="font-bold block mt-0.5 text-[11px]">
                      {hallOption ? (
                        <span className="text-amber-900 font-bold">{hallOption.rate.split("/")[0]}</span>
                      ) : (
                        <span className="text-on-surface-muted font-mono">None</span>
                      )}
                    </span>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2.5">
                    <span className="text-[10px] text-on-surface-muted uppercase font-bold block">Overnight Rooms</span>
                    <span className="font-bold block mt-0.5 text-[11px]">
                      {roomOption ? (
                        <span className="text-emerald-800 font-bold">{roomOption.rate.split("/")[0]}</span>
                      ) : (
                        <span className="text-on-surface-muted">Day Only</span>
                      )}
                    </span>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2.5">
                    <span className="text-[10px] text-on-surface-muted uppercase font-bold block">Payment</span>
                    <span className="font-semibold text-sky-800 block mt-0.5 text-[10px]">
                      GCash · Maya
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(resort)}
                  className="water-drop-button-primary w-full py-2.5 text-center text-xs font-bold transition-all"
                >
                  Select {resort.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (sm+): Full 7-Column Matrix Table */}
        <div className="mt-8 overflow-x-auto hidden sm:block">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-muted font-mono uppercase text-[10px]">
                <th className="py-3 pr-4">Resort</th>
                <th className="py-3 px-4">Location Plus Code</th>
                <th className="py-3 px-4">Day Cottages</th>
                <th className="py-3 px-4">Function Hall</th>
                <th className="py-3 px-4">Overnight Rooms</th>
                <th className="py-3 px-4">Pay Online</th>
                <th className="py-3 pl-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {TUKURAN_RESORTS.map((resort) => {
                const hallOption = resort.cottages.find(
                  (c) => c.category === "Function Hall"
                );
                const roomOption = resort.cottages.find((c) =>
                  c.category.includes("Room")
                );

                return (
                  <tr
                    key={resort.id}
                    className="hover:bg-white/40 transition-colors duration-150 ease-in-out"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={resort.image}
                            alt={resort.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{resort.name}</p>
                          <p className="text-[10px] text-on-surface-muted">{resort.badge}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-on-surface-variant">
                      {resort.locationCode}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-on-surface">
                      From {resort.cottages[0].rate}
                    </td>
                    <td className="py-4 px-4">
                      {hallOption ? (
                        <span className="water-drop-pill rounded-full px-2.5 py-1 text-[10px] font-bold text-amber-900 bg-amber-50">
                          {hallOption.rate}
                        </span>
                      ) : (
                        <span className="text-[10px] text-on-surface-muted font-mono">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {roomOption ? (
                        <span className="water-drop-pill rounded-full px-2.5 py-1 text-[10px] font-bold text-emerald-800 bg-emerald-50">
                          From {roomOption.rate}
                        </span>
                      ) : (
                        <span className="water-drop-pill rounded-full px-2.5 py-1 text-[10px] font-bold text-on-surface-muted">
                          Day-Use Only
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="water-drop-pill rounded-full px-2.5 py-1 text-[10px] font-bold text-sky-800 bg-sky-50">
                        GCash · Maya · Card
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <button
                        type="button"
                        onClick={() => handleSelect(resort)}
                        className="water-drop-button-primary px-3.5 py-1.5 text-[11px] font-bold cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
