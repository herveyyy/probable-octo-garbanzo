"use client";

import { useState } from "react";
import type { CottageOption, ResortHighlight } from "@/lib/entities/resorts.type";

interface UseCottagePassProps {
  resort: ResortHighlight;
  initialIndex?: number;
}

export function useCottagePass({ resort, initialIndex = 0 }: UseCottagePassProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(initialIndex);

  const activeCottage: CottageOption =
    resort.cottages[selectedIdx] || resort.cottages[0];

  const handleSelectCottage = (idx: number) => {
    setSelectedIdx(idx);
  };

  return {
    selectedIdx,
    activeCottage,
    handleSelectCottage,
  };
}
