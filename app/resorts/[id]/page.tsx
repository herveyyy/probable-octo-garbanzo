import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TUKURAN_RESORTS } from "@/lib/entities/resorts.type";
import { ResortProfile } from "@/components/organisms/ResortProfile/ResortProfile";

const projectName =
  process.env.PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TUKURAN_RESORTS.map((resort) => ({
    id: resort.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resort = TUKURAN_RESORTS.find((r) => r.id === id);

  if (!resort) {
    return {
      title: `Resort Not Found | ${projectName}`,
    };
  }

  return {
    title: `${resort.name} | Available Cottages & Rooms | ${projectName}`,
    description: `Book open-air kubos, beachfront cottages, and overnight rooms at ${resort.name} in ${resort.barangay}, Tukuran, Zamboanga del Sur. Direct phone: ${resort.contactNumber}.`,
  };
}

export default async function ResortDetailPage({ params }: PageProps) {
  const { id } = await params;
  const resort = TUKURAN_RESORTS.find((r) => r.id === id);

  if (!resort) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh w-full items-center justify-center bg-surface safe-pt safe-pb safe-px">
          <p className="text-sm font-semibold text-on-surface-muted">
            Loading Resort Profile &amp; Available Units...
          </p>
        </div>
      }
    >
      <ResortProfile resort={resort} projectName={projectName} />
    </Suspense>
  );
}
