"use client";

import Link from "next/link";
import { Shield, Truck } from "@/components/icons";

const footerLinks = {
  shop: [
    { label: "New In", href: "/new-in" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Essentials", href: "/essentials" },
    { label: "Sale", href: "/sale" },
    { label: "Accessories", href: "/accessories" },
  ],
  help: [
    { label: "Search", href: "/search" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Customer Care", href: "/customer-care" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              BREAKOFF
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Timeless clothing, redefined. Premium minimalist fashion for the
              modern individual.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                  key="instagram"
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                >
                  <Shield size={14} />
                </a>
                <a
                  key="facebook"
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                >
                  <Shield size={14} />
                </a>
                <a
                  key="twitter"
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                >
                  <Shield size={14} />
                </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {footerLinks.shop.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">
              Help
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {footerLinks.help.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {footerLinks.company.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} BREAKOFF. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
