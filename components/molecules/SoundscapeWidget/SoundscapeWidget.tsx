"use client";

import { LuWaves, LuPlay, LuPause, LuVolume2, LuVolumeX } from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { useSoundscapeWidget } from "./soundscapeWidget.hooks";

interface SoundscapeWidgetProps {
  resort: ResortHighlight;
}

export function SoundscapeWidget({ resort }: SoundscapeWidgetProps) {
  const { isPlaying, togglePlaying } = useSoundscapeWidget();

  return (
    <section id="soundscape" className="mt-24 scroll-mt-24 lg:mt-32">
      <div className="water-drop-surface rounded-3xl p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold text-on-surface">
              <LuWaves className="size-3.5 text-primary" />
              <span>Tukuran Coast Audio Landscape</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Listen to the seaside breeze.
            </h3>
            <p className="text-sm leading-relaxed text-on-surface-variant max-w-xl">
              Hear the gentle tidal waves and refreshing coastal breeze recorded right
              along the beaches of Tukuran, Zamboanga del Sur.
            </p>
          </div>

          <div className="water-drop-surface-deep lg:col-span-5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-muted">
                  {resort.name} Coastal Ambience
                </p>
                <p className="text-xs font-bold text-on-surface truncate max-w-50">
                  {resort.soundscape}
                </p>
              </div>

              <button
                type="button"
                onClick={togglePlaying}
                className="water-drop-button-primary flex size-10 cursor-pointer items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
                aria-label={isPlaying ? "Pause sound" : "Play sound"}
              >
                {isPlaying ? (
                  <LuPause className="size-4" />
                ) : (
                  <LuPlay className="size-4 ml-0.5" />
                )}
              </button>
            </div>

            {/* Calm, Static, Clean Audio Waveform (Zero Blinking, Zero Erratic Animations) */}
            <div className="mt-5 flex items-center justify-between px-2 pt-2 border-t border-outline-variant/20">
              <div className="flex items-end gap-1.5 h-6">
                {[4, 10, 6, 14, 8, 16, 12, 6, 15, 8, 12, 5, 14, 7, 10, 4].map(
                  (h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-on-surface/70 transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h}px` : "3px",
                        opacity: isPlaying ? 0.9 : 0.3,
                      }}
                    />
                  )
                )}
              </div>
              <span className="font-mono text-[10px] font-bold text-on-surface-muted flex items-center gap-1.5">
                {isPlaying ? (
                  <>
                    <LuVolume2 className="size-3.5 text-primary" /> Active Audio
                  </>
                ) : (
                  <>
                    <LuVolumeX className="size-3.5 text-outline" /> Muted
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
