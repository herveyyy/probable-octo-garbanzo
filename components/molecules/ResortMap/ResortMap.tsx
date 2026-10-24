"use client";

import Link from "next/link";
import Image from "next/image";
import { Map, Marker, Popup, NavigationControl } from "@vis.gl/react-maplibre";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  LuMapPin,
  LuTreePalm,
  LuCompass,
  LuArrowUpRight,
  LuLayers,
} from "react-icons/lu";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { useResortMap } from "./resortMap.hooks";

// Ensure MapLibre points to our self-hosted static worker bundle in public/maplibre/
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
}

interface ResortMapProps {
  resorts: ResortHighlight[];
  selectedResort: ResortHighlight | null;
  onSelectResort: (resort: ResortHighlight) => void;
  className?: string;
}

const MAP_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export function ResortMap({
  resorts,
  selectedResort,
  onSelectResort,
  className = "",
}: ResortMapProps) {
  const {
    mapRef,
    isMounted,
    activePopupResort,
    handleMarkerClick,
    handleClosePopup,
    handleResetView,
  } = useResortMap({ selectedResort, onSelectResort });

  if (!isMounted) {
    return (
      <div
        className={`water-drop-surface flex items-center justify-center rounded-3xl min-h-105 ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-center text-xs text-on-surface-muted">
          <LuCompass className="size-6 text-primary animate-spin" />
          <span>Loading Tukuran Coastal Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl water-drop-surface border border-white/80 shadow-lg ${className}`}
    >
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: 123.571,
          latitude: 7.842,
          zoom: 12.5,
        }}
        mapStyle={MAP_STYLE_URL}
        style={{ width: "100%", height: "100%", minHeight: "420px" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass showZoom />

        {/* Custom Interactive Markers for each Tukuran Resort */}
        {resorts.map((resort) => {
          const isSelected = selectedResort?.id === resort.id;
          return (
            <Marker
              key={resort.id}
              longitude={resort.coordinates.longitude}
              latitude={resort.coordinates.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(resort);
              }}
            >
              <button
                type="button"
                className={`group cursor-pointer flex flex-col items-center transition-all duration-300 ease-in-out ${isSelected ? "scale-110 z-30" : "hover:scale-105 z-10"
                  }`}
                aria-label={`Select ${resort.name}`}
              >
                {/* Custom Marker Pill */}
                <div
                  className={`water-drop-pill rounded-full flex items-center gap-1.5 px-3 py-1 text-xs font-bold shadow-md transition-all duration-200 ${isSelected
                      ? "bg-primary text-on-primary ring-2 ring-primary"
                      : "bg-white text-on-surface hover:bg-white"
                    }`}
                >
                  <LuTreePalm
                    className={`size-3.5 ${isSelected ? "text-white" : "text-primary"
                      }`}
                  />
                  <span>{resort.name}</span>
                  <span
                    className={`text-[10px] font-mono ${isSelected ? "text-white/80" : "text-emerald-700"
                      }`}
                  >
                    From {resort.cottages[0].rate.split(" ")[0]}
                  </span>
                </div>

                {/* Pin Tip Triangle */}
                <div
                  className={`w-0 h-0 border-x-4 border-x-transparent border-t-6 transition-colors ${isSelected ? "border-t-primary" : "border-t-white"
                    }`}
                />
              </button>
            </Marker>
          );
        })}

        {/* Active Selected Resort Popup */}
        {activePopupResort && (
          <Popup
            longitude={activePopupResort.coordinates.longitude}
            latitude={activePopupResort.coordinates.latitude}
            anchor="top"
            onClose={handleClosePopup}
            closeOnClick={false}
            offset={14}
            className="custom-map-popup"
          >
            <div className="water-drop-surface-deep rounded-2xl p-3 w-64 space-y-2 text-xs">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={activePopupResort.image}
                  alt={activePopupResort.name}
                  fill
                  sizes="256px"
                  className="size-full object-cover"
                />
                <span className="water-drop-pill rounded-full absolute top-1.5 left-1.5 px-2 py-0.5 text-[9px] font-bold text-on-surface">
                  {activePopupResort.badge}
                </span>
              </div>

              <div>
                <h4 className="font-display font-extrabold text-sm text-on-surface">
                  {activePopupResort.name}
                </h4>
                <p className="text-[11px] font-mono text-on-surface-muted flex items-center gap-1 mt-0.5">
                  <LuMapPin className="size-3 text-outline" />
                  {activePopupResort.locationCode}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-[11px]">
                <span className="font-bold text-primary font-mono">
                  From {activePopupResort.cottages[0].rate}
                </span>
                <Link
                  href={`/resorts/${activePopupResort.id}`}
                  className="water-drop-button-primary px-3 py-1 font-bold text-[10px] inline-flex items-center gap-1 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>View Details</span>
                  <LuArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Map HUD Controls */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleResetView}
          className="water-drop-pill rounded-full px-3.5 py-1.5 text-xs font-bold text-on-surface flex items-center gap-1.5 shadow-md hover:bg-white transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <LuCompass className="size-3.5 text-primary" />
          <span>Reset Tukuran View</span>
        </button>

        <span className="water-drop-pill rounded-full px-3 py-1 text-[10px] font-mono font-medium text-on-surface-muted hidden sm:inline-flex items-center gap-1">
          <LuLayers className="size-3" /> Positron Vector Basemap · 3 Tukuran Spots
        </span>
      </div>
    </div>
  );
}
