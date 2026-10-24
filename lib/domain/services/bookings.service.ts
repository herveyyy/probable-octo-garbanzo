import type { BookingInquiryInput, BookingResult } from "@/lib/entities/resorts.type";

export async function processCottageBooking(
  input: BookingInquiryInput
): Promise<BookingResult> {
  const name = input.guestName.trim();
  if (!name) {
    return { ok: false, error: "Guest name is required." };
  }

  const phone = input.contactPhone?.trim() || "Demo Walk-in Guest";

  // Generate simulated booking confirmation ID
  const inquiryId = `TUK-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    100 + Math.random() * 900
  )}`;

  return {
    ok: true,
    message: `Reservation confirmed for ${input.cottageName} at ${input.resortName} under ${name}. Pass reference #${inquiryId} issued. Contact: ${phone}.`,
    data: { inquiryId },
  };
}
