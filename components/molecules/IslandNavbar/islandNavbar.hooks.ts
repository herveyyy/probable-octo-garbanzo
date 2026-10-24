"use client";

import { useState, useEffect } from "react";
import type { ResortHighlight } from "@/lib/entities/resorts.type";

interface UseIslandNavbarProps {
  activeResort: ResortHighlight;
  onSelectResort: (resort: ResortHighlight) => void;
}

export function useIslandNavbar({
  onSelectResort,
}: UseIslandNavbarProps) {
  const [isTopHudOpen, setIsTopHudOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCircleIslandOpen, setIsCircleIslandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setIsCircleIslandOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTopHud = () => setIsTopHudOpen((prev) => !prev);
  const closeTopHud = () => setIsTopHudOpen(false);

  const toggleCircleIsland = () => setIsCircleIslandOpen((prev) => !prev);
  const closeCircleIsland = () => setIsCircleIslandOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openGuestModal = () => setIsGuestModalOpen(true);
  const closeGuestModal = () => setIsGuestModalOpen(false);

  const handleSelectAndClose = (resort: ResortHighlight) => {
    onSelectResort(resort);
    setIsCircleIslandOpen(false);
    setIsMobileMenuOpen(false);
    setIsTopHudOpen(false);
  };

  return {
    isTopHudOpen,
    isScrolled,
    isCircleIslandOpen,
    isMobileMenuOpen,
    isGuestModalOpen,
    toggleTopHud,
    closeTopHud,
    toggleCircleIsland,
    closeCircleIsland,
    toggleMobileMenu,
    closeMobileMenu,
    openGuestModal,
    closeGuestModal,
    handleSelectAndClose,
  };
}
