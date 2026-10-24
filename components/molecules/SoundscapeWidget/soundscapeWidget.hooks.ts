"use client";

import { useState } from "react";

export function useSoundscapeWidget() {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    isPlaying,
    togglePlaying,
  };
}
