"use client";

import { useState } from "react";
import type { ResortHighlight, CottageOption } from "@/lib/entities/resorts.type";
import { useCart } from "@/lib/context/cart.context";

interface UseResortProfileProps {
  resort: ResortHighlight;
}

export function useResortProfile({ resort }: UseResortProfileProps) {
  const { addToCart, openCart } = useCart();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedGuests, setSelectedGuests] = useState("4–6 Guests");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const images = resort.gallery && resort.gallery.length > 0
    ? resort.gallery
    : [resort.image];

  const filteredCottages = resort.cottages.filter((cot) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "day") return cot.category.includes("Day") || cot.category.includes("Kubo") || cot.category.includes("Pavilion");
    if (selectedCategory === "room") return cot.category.includes("Room");
    return true;
  });

  const handleAddToCart = (cottage: CottageOption) => {
    const isRoom = cottage.category.includes("Room");
    addToCart({
      resortId: resort.id,
      resortName: resort.name,
      resortImage: cottage.image || resort.image,
      itemName: cottage.name,
      itemCategory: cottage.category,
      rate: cottage.rate,
      priceNumber: cottage.priceNumber,
      bookingDate,
      timeSlot: isRoom ? "Overnight (2:00 PM Check-in)" : "Day Use (8:00 AM – 5:00 PM)",
      guestCount: parseInt(selectedGuests) || 4,
      quantity: 1,
    });

    setAddedItemName(cottage.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2500);
  };

  return {
    images,
    selectedGalleryIdx,
    setSelectedGalleryIdx,
    selectedCategory,
    setSelectedCategory,
    bookingDate,
    setBookingDate,
    selectedGuests,
    setSelectedGuests,
    filteredCottages,
    addedItemName,
    handleAddToCart,
    openCart,
  };
}
