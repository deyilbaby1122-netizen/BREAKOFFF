/**
 * terms/page.tsx
 * BREAKOFF — Terms and Conditions page.
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | BREAKOFF",
  description: "Terms and conditions of use for BREAKOFF.",
};

export default function TermsPage() {
  return (
    <>
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Terms & Conditions
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              Welcome to BREAKOFF. These Terms and Conditions govern your use
              of our website and services.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              2. Use of the Website
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              By accessing our website, you agree to use it in compliance with
              all applicable laws and regulations. You may not use the website
              for any illegal or unauthorized purpose.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              3. Products and Pricing
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              All product descriptions, prices, and availability are subject to
              change without notice. We reserve the right to withdraw or
              modify products at any time.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              4. Orders and Acceptance
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We do not warrant that the availability of the products will be
              uninterrupted or error-free. Any orders you place are subject to
              our confirmation.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              5. Payment and Taxes
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              All payments are processed in AED. Prices are inclusive of any
              applicable taxes unless otherwise indicated.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              6. Shipping and Delivery
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              Shipping times and costs are calculated at checkout based on
              delivery location and are subject to change.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              All content on this website, including logos, images, and
              designs, is the property of BREAKOFF and is protected by
              international copyright laws.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              BREAKOFF shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the website.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We may update these terms at any time. Continued use of the
              website constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              10. Governing Law
            </h2>
            <p className="text-ink-700 leading-relaxed">
              These terms are governed by the laws of the United Arab Emirates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
