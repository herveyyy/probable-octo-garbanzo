"use client";

import { useState } from "react";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { TUKURAN_RESORTS } from "@/lib/entities/resorts.type";

export type GuestFilter = "all" | "day" | "functionhall" | "overnight";

export function useInstallLanding() {
  const [activeResort, setActiveResort] = useState<ResortHighlight>(
    TUKURAN_RESORTS[0]
  );
  const [guestFilter, setGuestFilter] = useState<GuestFilter>("all");

  const handleSelectResort = (
    resort: ResortHighlight,
    scrollTarget = false
  ) => {
    setActiveResort(resort);
    if (scrollTarget) {
      const el = document.getElementById("cottage-pass");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return {
    resorts: TUKURAN_RESORTS,
    activeResort,
    guestFilter,
    setGuestFilter,
    handleSelectResort,
  };
}
