import type { Metadata } from "next";
import { Suspense } from "react";
import {
  InstallLanding,
  InstallLandingFallback,
} from "@/components/organisms/InstallLanding/InstallLanding";

const projectName = process.env.PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE";

export const metadata: Metadata = {
  title: `${projectName} | Beach Resorts & Cottage Bookings`,
  description: `Book seaside cottages, overnight rooms, and open air kubos at Lantau Beach, Donel's Beach Resort, and Sirena Beach Resort in Tukuran, Zamboanga del Sur.`,
};

export default function LandingPage() {
  return (
    <Suspense fallback={<InstallLandingFallback />}>
      <InstallLanding projectName={projectName} />
    </Suspense>
  );
}
