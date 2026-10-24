import Link from "next/link";
import { Suspense } from "react";
import { LuTreePalm, LuMapPin, LuCalendar, LuMap, LuUser } from "react-icons/lu";
import { signOutAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";

import type { Metadata } from "next";

const projectName =
  process.env.PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME || "PROJECT ONE";

export const metadata: Metadata = {
  title: `${projectName} | Beach Resorts & Cottage Bookings`,
  description: `Book seaside cottages, overnight rooms, and open air kubos at Lantau Beach, Donel's Beach Resort, and Sirena Beach Resort in Tukuran, Zamboanga del Sur.`,
};

function HomeFallback() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-surface font-(family-name:--font-inter)">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-16 py-32 text-center">
        <h1 className="font-display mb-6 text-5xl font-semibold tracking-tight text-on-surface">
          {projectName}
        </h1>
        <p className="text-lg text-on-surface-muted">Loading...</p>
      </main>
    </div>
  );
}

async function HomeContent() {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-surface font-(family-name:--font-inter) px-6 py-16">
      <main className="water-drop-surface-deep w-full max-w-3xl rounded-3xl p-8 sm:p-12 text-center">
        <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-on-surface mb-6">
          <span className="size-2 rounded-full bg-emerald-600" />
          <span>Tukuran Beach Resort &amp; Cottage Booking</span>
        </div>

        <h1 className="font-display mb-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-on-surface">
          {projectName}
        </h1>

        <p className="mb-6 text-sm sm:text-base leading-relaxed text-on-surface-variant max-w-xl mx-auto font-normal">
          Reserve beachfront cottages, open-air kubos, and coastal overnight rooms across
          Tukuran, Zamboanga del Sur. Direct hotlines and verified spots for Lantau Beach,
          Donel&apos;s Beach Resort, and Sirena Beach Resort.
        </p>

        {session ? (
          <div className="water-drop-pill rounded-full inline-block px-5 py-2 mb-6 text-xs font-medium text-on-surface">
            Active Member: <span className="font-bold text-primary">{session.user.name}</span>
          </div>
        ) : (
          <div className="water-drop-pill rounded-full inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-medium text-on-surface">
            <span className="size-2 rounded-full bg-emerald-600" />
            <span>Demo Guest Account Active · <strong className="text-primary font-bold">No Login Required</strong></span>
          </div>
        )}

        {/* 3 Quick Featured Highlights Mini Grid */}
        <div className="grid gap-3 sm:grid-cols-3 mb-8 text-left">
          <Link
            href="/landing#highlights"
            className="water-drop-surface p-4 rounded-2xl block hover:bg-white transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] group"
          >
            <p className="text-[10px] font-bold text-on-surface-muted uppercase">01 · Open-Air</p>
            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              Lantau Beach
            </p>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Cottages from ₱500/day
            </p>
            <p className="text-[10px] font-mono text-on-surface-muted mt-2 flex items-center gap-1">
              <LuMapPin className="size-3 text-outline" /> RGXW+HWV, Tukuran
            </p>
          </Link>

          <Link
            href="/landing#highlights"
            className="water-drop-surface p-4 rounded-2xl block hover:bg-white transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] group"
          >
            <p className="text-[10px] font-bold text-on-surface-muted uppercase">02 · Shoreline</p>
            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              Donel&apos;s Resort
            </p>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              From ₱600 · Rooms ₱1,800
            </p>
            <p className="text-[10px] font-mono text-on-surface-muted mt-2 flex items-center gap-1">
              <LuMapPin className="size-3 text-outline" /> RGXV+8JF, Tukuran
            </p>
          </Link>

          <Link
            href="/landing#highlights"
            className="water-drop-surface p-4 rounded-2xl block hover:bg-white transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] group"
          >
            <p className="text-[10px] font-bold text-on-surface-muted uppercase">03 · Waterfront</p>
            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              Sirena Beach
            </p>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Stilt Kubos from ₱750/day
            </p>
            <p className="text-[10px] font-mono text-on-surface-muted mt-2 flex items-center gap-1">
              <LuMapPin className="size-3 text-outline" /> RHMX+JC7, Dalahikan
            </p>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/browse"
            className="water-drop-button-primary px-6 py-3 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
          >
            <LuMap className="size-3.5" />
            <span>Browse Resorts on Map</span>
          </Link>
          <Link
            href="/landing#highlights"
            className="water-drop-button-secondary px-6 py-3 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
          >
            <LuTreePalm className="size-3.5" />
            <span>3 Resort Highlights</span>
          </Link>
          <Link
            href="/landing#cottage-pass"
            className="water-drop-button-secondary px-6 py-3 text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
          >
            <LuCalendar className="size-3.5" />
            <span>Book Cottage Pass</span>
          </Link>
          {session ? (
            <form action={signOutAction} className="inline-block">
              <button
                type="submit"
                className="water-drop-pill rounded-full px-5 py-3 text-xs font-bold text-error hover:bg-error-container/20 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/browse"
              className="water-drop-pill rounded-full px-4 py-3 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 inline-flex items-center gap-1"
            >
              <LuUser className="size-3 text-primary" />
              <span>Guest Demo Mode</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeContent />
    </Suspense>
  );
}
