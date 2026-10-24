import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const projectName =
  process.env.PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0066e2",
};

export const metadata: Metadata = {
  title: `${projectName} | Beach Resorts & Cottage Bookings`,
  description: `Book seaside cottages, overnight rooms, and open air kubos at Lantau Beach, Donel's Beach Resort, and Sirena Beach Resort in Tukuran, Zamboanga del Sur.`,
  appleWebApp: {
    capable: true,
    title: projectName,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

import { CartProvider } from "@/lib/context/cart.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-(family-name:--font-inter)">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
