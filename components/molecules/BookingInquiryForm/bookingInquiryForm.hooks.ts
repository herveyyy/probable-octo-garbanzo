"use client";

import { useState } from "react";
import type { ResortHighlight } from "@/lib/entities/resorts.type";
import { requestCottageBookingAction } from "@/lib/domain/actions/bookings.actions";
import { useCart } from "@/lib/context/cart.context";

interface UseBookingInquiryFormProps {
  activeResort: ResortHighlight;
  onSelectResort: (resort: ResortHighlight) => void;
}

export function useBookingInquiryForm({
  activeResort,
}: UseBookingInquiryFormProps) {
  const { guestName: defaultGuestName, setGuestName: setGlobalGuestName } = useCart();
  const [customGuestName, setCustomGuestName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState("");
  const [guestCount, setGuestCount] = useState("4-8 Guests (Day Kubo)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const guestName = customGuestName ?? defaultGuestName ?? "Guest Explorer";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalName = guestName.trim() || defaultGuestName || "Guest Explorer";
    if (!finalName) return;

    setIsSubmitting(true);
    setFeedback(null);
    setGlobalGuestName(finalName);

    const formData = new FormData();
    formData.append("resortId", activeResort.id);
    formData.append("resortName", activeResort.name);
    formData.append(
      "cottageName",
      activeResort.cottages[0]?.name || "Waterside Open-Air Cottage"
    );
    formData.append("guestName", finalName);
    formData.append("contactPhone", contactPhone.trim() || "Walk-in Demo Guest");
    formData.append("guestCount", guestCount);

    try {
      const result = await requestCottageBookingAction(formData);
      if (result.ok) {
        setFeedback({
          type: "success",
          message: result.message,
        });
        setContactPhone("");
        setTimeout(() => {
          setFeedback(null);
        }, 6000);
      } else {
        setFeedback({
          type: "error",
          message: result.error,
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to send reservation request. Please try calling directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    guestName,
    setGuestName: setCustomGuestName,
    contactPhone,
    setContactPhone,
    guestCount,
    setGuestCount,
    isSubmitting,
    feedback,
    handleSubmit,
  };
}
