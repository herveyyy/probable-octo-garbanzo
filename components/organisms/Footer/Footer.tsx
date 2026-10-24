import Link from "next/link";
import { LuTreePalm, LuArrowUpRight } from "react-icons/lu";

interface FooterProps {
  projectName?: string;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterNavCol {
  title: string;
  links: FooterLink[];
}

export function Footer({ projectName = "PROJECT ONE" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerNav: FooterNavCol[] = [
    {
      title: "RESORTS",
      links: [
        { label: "Lantau Beach", href: "#highlights" },
        { label: "Donel's Resort", href: "#highlights" },
        { label: "Sirena Beach", href: "#highlights" },
      ],
    },
    {
      title: "COTTAGES",
      links: [
        { label: "Open-Air Kubos", href: "#cottage-pass" },
        { label: "Family Gazebos", href: "#cottage-pass" },
        { label: "Overnight Rooms", href: "#cottage-pass" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
    {
      title: "SOCIAL",
      links: [
        { label: "Facebook", href: "https://facebook.com", external: true },
        { label: "Instagram", href: "https://instagram.com", external: true },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { label: "+63 951 824 0846", href: "tel:+639518240846", external: true },
        { label: "+63 906 472 1228", href: "tel:+639064721228", external: true },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "SECURITY",
      links: [
        { label: "Compliance", href: "#" },
        { label: "Report Issue", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full mt-16 sm:mt-24">
      {/* Dark Monolithic Card with Rounded Top Corners */}
      <div className="mx-auto w-full max-w-340 rounded-t-3xl bg-[#161618] px-4 pt-12 pb-10 sm:px-12 sm:pt-20 sm:pb-16 text-white shadow-2xl border-t border-white/10">
        {/* Top Header with Icon Squircle & Brand Title */}
        <div className="flex flex-col items-center text-center">
          {/* White Squircle Logo Icon */}
          <div className="flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-white shadow-lg text-[#161618] transition-all duration-300 ease-in-out hover:scale-105">
            <LuTreePalm className="size-6 sm:size-7 text-[#161618]" />
          </div>

          {/* Large Bold Brand Name */}
          <h2 className="mt-4 sm:mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            {projectName}
          </h2>

          {/* Subtitle */}
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#8c8c91] font-normal tracking-wide">
            Tukuran Beach Resorts &amp; Cottage Bookings · Zamboanga del Sur
          </p>
        </div>

        {/* 7 Navigation Columns Grid */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-6 border-t border-white/10 pt-10 sm:pt-12">
          {footerNav.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="font-display text-xs font-extrabold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-[#8c8c91]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 transition-all duration-200 ease-in-out hover:text-white"
                      >
                        <span>{link.label}</span>
                        <LuArrowUpRight className="size-3 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-all duration-200 ease-in-out hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#8c8c91]">
            © {currentYear} {projectName}. Tukuran Beach Resorts &amp; Cottage Bookings.
          </p>

          {/* Operational Status Pill (Calm solid dot, zero blinking lights) */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/90 border border-white/10 backdrop-blur-xs">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-white/80">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
