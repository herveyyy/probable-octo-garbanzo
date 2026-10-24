import type { Metadata } from "next";
import { Suspense } from "react";
import { BrowseExperience } from "@/components/organisms/BrowseExperience/BrowseExperience";

const projectName =
  process.env.PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE";

export const metadata: Metadata = {
  title: `Browse Beach Resorts & Map | ${projectName}`,
  description:
    "Explore interactive coastal maps and browse available cottages and overnight rooms across Lantau Beach, Donel's Beach Resort, and Sirena Beach Resort in Tukuran, Zamboanga del Sur.",
};

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <p className="text-sm font-semibold text-on-surface-muted">
            Loading Tukuran Coastal Map &amp; Resorts...
          </p>
        </div>
      }
    >
      <BrowseExperience projectName={projectName} />
    </Suspense>
  );
}
