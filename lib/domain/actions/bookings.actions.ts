"use server";

import type { BookingResult } from "@/lib/entities/resorts.type";
import { processCottageBooking } from "@/lib/domain/services/bookings.service";

export async function requestCottageBookingAction(
  formData: FormData
): Promise<BookingResult> {
  const resortId = String(formData.get("resortId") || "lantau");
  const resortName = String(formData.get("resortName") || "Lantau Beach");
  const cottageName = String(
    formData.get("cottageName") || "Waterside Open-Air Cottage"
  );
  const guestName = String(formData.get("guestName") || "").trim();
  const contactPhone = String(formData.get("contactPhone") || "").trim();
  const guestCount = String(formData.get("guestCount") || "4-6 Guests");

  try {
    return await processCottageBooking({
      resortId,
      resortName,
      cottageName,
      guestName,
      contactPhone,
      guestCount,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to process booking.";
    return { ok: false, error: message };
  }
}
