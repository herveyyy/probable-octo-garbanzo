"use client";

import type { ResortHighlight } from "@/lib/entities/resorts.type";

interface UseResortHighlightCardProps {
  resort: ResortHighlight;
  onSelect: (resort: ResortHighlight) => void;
}

export function useResortHighlightCard({
  resort,
  onSelect,
}: UseResortHighlightCardProps) {
  const handleSelect = () => {
    onSelect(resort);
  };

  return {
    handleSelect,
  };
}
