"use client";

import { useState, useMemo } from "react";
import { TUKURAN_RESORTS, type ResortHighlight } from "@/lib/entities/resorts.type";

export type FilterCategory = "all" | "day" | "functionhall" | "overnight" | "budget";

export function useBrowseExperience() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [selectedResort, setSelectedResort] = useState<ResortHighlight | null>(
    TUKURAN_RESORTS[0]
  );
  const [mobileView, setMobileView] = useState<"split" | "map" | "list">("split");

  const filteredResorts = useMemo(() => {
    return TUKURAN_RESORTS.filter((r) => {
      // Search matching
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.barangay.toLowerCase().includes(q) ||
        r.locationCode.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Category matching
      if (filterCategory === "day") {
        return r.cottages.some((c) => c.category === "Day Cottage");
      }
      if (filterCategory === "functionhall") {
        return (
          r.hasFunctionHall ||
          r.cottages.some((c) => c.category === "Function Hall")
        );
      }
      if (filterCategory === "overnight") {
        return r.hasOvernightRooms;
      }
      if (filterCategory === "budget") {
        return r.cottages.some((c) => c.priceNumber <= 800);
      }

      return true;
    });
  }, [searchQuery, filterCategory]);

  const handleSelectResort = (resort: ResortHighlight) => {
    setSelectedResort(resort);
  };

  return {
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    selectedResort,
    handleSelectResort,
    filteredResorts,
    mobileView,
    setMobileView,
  };
}
