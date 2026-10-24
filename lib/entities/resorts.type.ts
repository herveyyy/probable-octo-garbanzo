export type CottageCategory =
  | "Day Cottage"
  | "Gathering Kubo"
  | "Group Pavilion"
  | "Overnight Room";

export interface CottageOption {
  id: string;
  name: string;
  category: CottageCategory;
  rate: string;
  priceNumber: number;
  capacity: string;
  features: string;
  availableCount: number;
  image?: string;
}

export interface ResortHighlight {
  id: "lantau" | "donels" | "sirena";
  number: string;
  badge: string;
  name: string;
  tagline: string;
  barangay: string;
  municipality: string;
  province: string;
  locationCode: string;
  contactNumber: string;
  image: string;
  gallery?: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  overview: string;
  details: string;
  cottages: CottageOption[];
  highlights: string[];
  soundscape: string;
  openHours: string;
  idealFor: string;
  beachType: string;
  hasOvernightRooms: boolean;
}

export interface BookingInquiryInput {
  resortId: string;
  resortName: string;
  cottageName: string;
  guestName: string;
  contactPhone?: string;
  guestCount: string;
}

export interface CartItem {
  id: string;
  resortId: string;
  resortName: string;
  resortImage: string;
  itemName: string;
  itemCategory: CottageCategory;
  rate: string;
  priceNumber: number;
  bookingDate: string;
  timeSlot: string;
  guestCount: number;
  quantity: number;
}

export const DEFAULT_GUEST_NAME = "Guest Explorer";

export interface GuestAccount {
  name: string;
  isDefault: boolean;
}

export interface BookingOrder {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  guestName: string;
  contactPhone?: string;
  notes?: string;
  bookingDate: string;
  createdAt: string;
  status: "confirmed";
}

export type BookingResult =
  | { ok: true; message: string; data?: { inquiryId: string } }
  | { ok: false; error: string };

export const TUKURAN_RESORTS: ResortHighlight[] = [
  {
    id: "lantau",
    number: "01",
    badge: "Open-Air Water Spaces",
    name: "Lantau Beach",
    tagline: "Open-air spaces by the water for day trips & casual hangouts",
    barangay: "Tukuran Shoreline",
    municipality: "Tukuran",
    province: "Zamboanga del Sur",
    locationCode: "RGXW+HWV, Tukuran, Zamboanga del Sur",
    contactNumber: "+63 951 824 0846",
    image: "/images/lantau.jpg",
    gallery: ["/images/lantau.jpg", "/images/amalfi.jpg", "/images/kyoto.jpg"],
    coordinates: {
      latitude: 7.84888,
      longitude: 123.54725,
    },
    overview:
      "A coastal spot situated directly in Tukuran, Zamboanga del Sur, featuring open-air spaces by the water for day trips and casual hangouts.",
    details:
      "Offers a relaxed coastal environment suitable for seaside relaxation and local gatherings.",
    cottages: [
      {
        id: "lantau-cot-1",
        name: "Waterside Open-Air Cottage",
        category: "Day Cottage",
        rate: "₱500 / Day",
        priceNumber: 500,
        capacity: "6–8 Guests",
        features: "Direct shoreline position, native bamboo benches, palm shade canopy",
        availableCount: 4,
        image: "/images/lantau.jpg",
      },
      {
        id: "lantau-cot-2",
        name: "Sunset Bamboo Kubo",
        category: "Gathering Kubo",
        rate: "₱800 / Day",
        priceNumber: 800,
        capacity: "10–12 Guests",
        features: "Spacious wooden dining table, barbecue grilling station, hammock posts",
        availableCount: 2,
        image: "/images/amalfi.jpg",
      },
      {
        id: "lantau-cot-3",
        name: "Family Beachfront Pavilion",
        category: "Group Pavilion",
        rate: "₱1,500 / Day",
        priceNumber: 1500,
        capacity: "15–20 Guests",
        features: "Full group banquet tables, power outlets, food preparation counter",
        availableCount: 1,
        image: "/images/kyoto.jpg",
      },
    ],
    highlights: [
      "Open-air spaces located right by the tidal water",
      "Offers relaxed beachside environment for gatherings",
      "Ideal for weekend day trips and seaside relaxation",
      "Gentle ocean breeze and swimmable coastal shoreline",
    ],
    soundscape: "Lantau Shoreline Tidal Swell & Palm Breeze",
    openHours: "06:00 AM – 06:00 PM (Daily)",
    idealFor: "Day trips, casual hangouts, seaside picnics, swim days",
    beachType: "Natural coastal shoreline with calm tidal waters",
    hasOvernightRooms: false,
  },
  {
    id: "donels",
    number: "02",
    badge: "Family & Group Shoreline Outings",
    name: "Donel's Beach Resort",
    tagline: "Casual setting for family or group outings near the shore",
    barangay: "Tukuran Coastline",
    municipality: "Tukuran",
    province: "Zamboanga del Sur",
    locationCode: "RGXV+8JF, Unnamed Road, Tukuran, Zamboanga del Sur",
    contactNumber: "+63 906 472 1228",
    image: "/images/donels.jpg",
    gallery: ["/images/donels.jpg", "/images/nordic.jpg", "/images/amalfi.jpg"],
    coordinates: {
      latitude: 7.84825,
      longitude: 123.544,
    },
    overview:
      "A local beach resort situated within Tukuran, providing a casual setting for family or group outings near the shore.",
    details:
      "Features beach access and outdoor spots ideal for weekend recreation and relaxation.",
    cottages: [
      {
        id: "donels-cot-1",
        name: "Shoreline Family Cottage",
        category: "Day Cottage",
        rate: "₱600 / Day",
        priceNumber: 600,
        capacity: "8–10 Guests",
        features: "Direct sand access, solid wooden benches, food prep table",
        availableCount: 3,
        image: "/images/donels.jpg",
      },
      {
        id: "donels-cot-2",
        name: "Group Recreation Gazebo",
        category: "Group Pavilion",
        rate: "₱900 / Day",
        priceNumber: 900,
        capacity: "12–15 Guests",
        features: "Sheltered recreation area, outdoor grill spot, electricity access",
        availableCount: 2,
        image: "/images/nordic.jpg",
      },
      {
        id: "donels-room-1",
        name: "Coastal Air-Con Room",
        category: "Overnight Room",
        rate: "₱1,800 / Night",
        priceNumber: 1800,
        capacity: "4 Guests",
        features: "Private bathroom, queen bed, air conditioning, shaded front porch",
        availableCount: 2,
        image: "/images/amalfi.jpg",
      },
    ],
    highlights: [
      "Direct beach access with expansive outdoor recreation spots",
      "Casual setting perfect for family and group gatherings",
      "Ideal for weekend relaxation near the shore",
      "Both day-use cottages and air-con overnight rooms available",
    ],
    soundscape: "Donel's Gentle Shoreline Waves & Sunset Breeze",
    openHours: "06:00 AM – 09:00 PM (Day & Overnight)",
    idealFor: "Family outings, group reunions, weekend getaways, overnight stays",
    beachType: "Wide sandy beach with direct water access",
    hasOvernightRooms: true,
  },
  {
    id: "sirena",
    number: "03",
    badge: "Waterfront Destination in Dalahikan",
    name: "Sirena Beach Resort",
    tagline: "Waterfront destination in Dalahikan for unwinding by the coast",
    barangay: "Dalahikan",
    municipality: "Tukuran",
    province: "7019 Zamboanga del Sur",
    locationCode: "RHMX+JC7 Dalahikan, 1, Tukuran, 7019 Zamboanga del Sur",
    contactNumber: "+63 909 373 5328",
    image: "/images/sirena.jpg",
    gallery: ["/images/sirena.jpg", "/images/kyoto.jpg", "/images/nordic.jpg"],
    coordinates: {
      latitude: 7.834,
      longitude: 123.5985,
    },
    overview:
      "Located in Dalahikan, Tukuran, offering a waterfront destination for visitors looking to unwind by the coast.",
    details:
      "Positioned right in the coastal barangay, making it accessible for local beach days and cottage getaways.",
    cottages: [
      {
        id: "sirena-cot-1",
        name: "Dalahikan Over-Water Stilt Kubo",
        category: "Day Cottage",
        rate: "₱750 / Day",
        priceNumber: 750,
        capacity: "8 Guests",
        features: "Elevated above tidal water, wooden swim ladder, panoramic horizon deck",
        availableCount: 3,
        image: "/images/sirena.jpg",
      },
      {
        id: "sirena-cot-2",
        name: "Boardwalk Panoramic Gazebo",
        category: "Gathering Kubo",
        rate: "₱1,000 / Day",
        priceNumber: 1000,
        capacity: "12 Guests",
        features: "Direct boardwalk location, fresh sea breezes, full shade canopy",
        availableCount: 2,
        image: "/images/kyoto.jpg",
      },
      {
        id: "sirena-room-1",
        name: "Waterfront Overnight Suite",
        category: "Overnight Room",
        rate: "₱1,600 / Night",
        priceNumber: 1600,
        capacity: "4 Guests",
        features: "Private water-view terrace, air conditioning, private bathroom",
        availableCount: 2,
        image: "/images/nordic.jpg",
      },
    ],
    highlights: [
      "Positioned right in the coastal barangay of Dalahikan",
      "Waterfront destination for visitors looking to unwind by the coast",
      "Highly accessible for local beach days and cottage getaways",
      "Wooden boardwalk and stilt cottages suspended over tidal water",
    ],
    soundscape: "Dalahikan Tidal Swell & Coastal Boardwalk Ambience",
    openHours: "06:00 AM – 08:00 PM (Day & Overnight)",
    idealFor: "Waterfront chilling, quiet seaside getaways, boardwalk strolls",
    beachType: "Waterfront tidal shoreline with wooden boardwalk walkways",
    hasOvernightRooms: true,
  },
];
