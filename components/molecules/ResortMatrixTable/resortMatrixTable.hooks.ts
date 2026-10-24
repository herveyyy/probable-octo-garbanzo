"use client";

import type { ResortHighlight } from "@/lib/entities/resorts.type";

interface UseResortMatrixTableProps {
  onSelectResort: (resort: ResortHighlight) => void;
}

export function useResortMatrixTable({
  onSelectResort,
}: UseResortMatrixTableProps) {
  const handleSelect = (resort: ResortHighlight) => {
    onSelectResort(resort);
    const el = document.getElementById("cottage-pass");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    handleSelect,
  };
}
