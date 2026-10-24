export type CottageCategory =
  | "Day Cottage"
  | "Gathering Kubo"
  | "Group Pavilion"
  | "Function Hall"
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
  hasFunctionHall: boolean;
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

export type PaymentMethod = "gcash" | "maya" | "card" | "qrph";
export type PaymentPlan = "full" | "deposit";

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
  paymentMethod: PaymentMethod;
  paymentPlan: PaymentPlan;
  amountPaid: number;
  balanceDue: number;
  transactionRef: string;
  accountReference?: string;
}

export type BookingResult =
  | { ok: true; message: string; data?: { inquiryId: string } }
  | { ok: false; error: string };

export const TUKURAN_RESORTS: ResortHighlight[] = [
  {
    id: "lantau",
    number: "01",
    badge: "Open-Air Water Spaces & Seaside Events",
    name: "Lantau Beach",
    tagline: "Open-air spaces by the water for day trips, events & casual hangouts",
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
      "A coastal spot situated directly in Tukuran, Zamboanga del Sur, featuring open-air spaces by the water for day trips, group gatherings, and private seaside celebrations.",
    details:
      "Offers a relaxed coastal environment with day cottages, an open-air event function hall, and overnight casitas suitable for seaside relaxation and celebrations.",
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
        id: "lantau-hall-1",
        name: "Lantau Coastal Event Function Hall",
        category: "Function Hall",
        rate: "₱4,500 / Day",
        priceNumber: 4500,
        capacity: "60–80 Guests",
        features: "Covered coastal event pavilion, elevated staging, sound system with wireless mics, banquet tables & chairs, buffet station",
        availableCount: 1,
        image: "/images/kyoto.jpg",
      },
      {
        id: "lantau-room-1",
        name: "Seaside Breeze Air-Con Room",
        category: "Overnight Room",
        rate: "₱1,500 / Night",
        priceNumber: 1500,
        capacity: "4 Guests",
        features: "Split air-conditioning, queen bed, private hot/cold shower, shaded front veranda",
        availableCount: 2,
        image: "/images/nordic.jpg",
      },
    ],
    highlights: [
      "Open-air spaces located right by the tidal water",
      "Event Function Hall available for birthdays, weddings & gatherings",
      "Overnight air-conditioned rooms & seaside kubos",
      "Gentle ocean breeze and swimmable coastal shoreline",
    ],
    soundscape: "Lantau Shoreline Tidal Swell & Palm Breeze",
    openHours: "06:00 AM – 09:00 PM (Day & Overnight)",
    idealFor: "Day trips, event celebrations, function gatherings, seaside overnights",
    beachType: "Natural coastal shoreline with calm tidal waters",
    hasOvernightRooms: true,
    hasFunctionHall: true,
  },
  {
    id: "donels",
    number: "02",
    badge: "Family Outings, Rooms & Grand Function Hall",
    name: "Donel's Beach Resort",
    tagline: "Casual setting for family, reunions, functions & group outings",
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
      "A local beach resort situated within Tukuran, providing a casual setting for family or group outings near the shore, with full event function facilities and overnight rooms.",
    details:
      "Features beach access, a grand oceanview banquet function hall, shaded kubos, and overnight suites ideal for weekend recreation and banquets.",
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
        category: "Gathering Kubo",
        rate: "₱900 / Day",
        priceNumber: 900,
        capacity: "12–15 Guests",
        features: "Sheltered recreation area, outdoor grill spot, electricity access",
        availableCount: 2,
        image: "/images/nordic.jpg",
      },
      {
        id: "donels-hall-1",
        name: "Donel's Grand Oceanview Function Hall",
        category: "Function Hall",
        rate: "₱5,500 / Day",
        priceNumber: 5500,
        capacity: "80–120 Guests",
        features: "Enclosed air-conditioned hall with ocean panorama, professional PA sound system, projector screen, banquet dining tables, caterer prep pantry",
        availableCount: 1,
        image: "/images/amalfi.jpg",
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
        image: "/images/kyoto.jpg",
      },
      {
        id: "donels-room-2",
        name: "Deluxe Family Barkada Suite",
        category: "Overnight Room",
        rate: "₱2,600 / Night",
        priceNumber: 2600,
        capacity: "8 Guests",
        features: "Two queen beds + daybed, split air-con, mini-refrigerator, oceanfront balcony",
        availableCount: 1,
        image: "/images/donels.jpg",
      },
    ],
    highlights: [
      "Direct beach access with expansive outdoor recreation spots",
      "Grand 120-guest oceanview function hall for seminars & weddings",
      "Air-conditioned overnight rooms & barkada family suites",
      "Ideal for weekend relaxation near the shore and large banquets",
    ],
    soundscape: "Donel's Gentle Shoreline Waves & Sunset Breeze",
    openHours: "06:00 AM – 10:00 PM (Day & Overnight)",
    idealFor: "Family outings, group reunions, wedding receptions, seminars, overnight stays",
    beachType: "Wide sandy beach with direct water access",
    hasOvernightRooms: true,
    hasFunctionHall: true,
  },
  {
    id: "sirena",
    number: "03",
    badge: "Waterfront Dalahikan, Stilt Kubos & Ocean Pavilion",
    name: "Sirena Beach Resort",
    tagline: "Waterfront destination in Dalahikan for unwinding, functions & stilt getaways",
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
      "Located in Dalahikan, Tukuran, offering a waterfront destination with stilt cottages suspended above the tidal water, a panoramic event pavilion, and overnight seaside suites.",
    details:
      "Positioned right in the coastal barangay, making it accessible for local beach days, over-water function banquets, and serene cottage getaways.",
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
        id: "sirena-hall-1",
        name: "Sirena Dalahikan Waterfront Function Hall",
        category: "Function Hall",
        rate: "₱5,000 / Day",
        priceNumber: 5000,
        capacity: "70–100 Guests",
        features: "Elevated timber event pavilion extending over tidal water, 360-degree Illana Bay views, built-in sound system, banquet seating",
        availableCount: 1,
        image: "/images/amalfi.jpg",
      },
      {
        id: "sirena-room-1",
        name: "Waterfront Overnight Suite",
        category: "Overnight Room",
        rate: "₱1,600 / Night",
        priceNumber: 1600,
        capacity: "4 Guests",
        features: "Private water-view terrace, air conditioning, private bathroom, sunset facing",
        availableCount: 2,
        image: "/images/nordic.jpg",
      },
      {
        id: "sirena-room-2",
        name: "Deluxe Over-Water Casita",
        category: "Overnight Room",
        rate: "₱2,200 / Night",
        priceNumber: 2200,
        capacity: "4–6 Guests",
        features: "Stilt casita over tidal sea, glass viewing floor panel, queen bed, private shower",
        availableCount: 1,
        image: "/images/sirena.jpg",
      },
    ],
    highlights: [
      "Positioned right in the coastal barangay of Dalahikan",
      "Over-water Function Hall with panoramic Illana Bay vistas",
      "Iconic stilt kubos with direct swimming ladders into tidal waters",
      "Overnight waterfront suites and sunset boardwalk strolls",
    ],
    soundscape: "Dalahikan Tidal Swell & Coastal Boardwalk Ambience",
    openHours: "06:00 AM – 09:00 PM (Day & Overnight)",
    idealFor: "Waterfront chilling, over-water events, quiet seaside getaways, boardwalk strolls",
    beachType: "Waterfront tidal shoreline with wooden boardwalk walkways",
    hasOvernightRooms: true,
    hasFunctionHall: true,
  },
];
