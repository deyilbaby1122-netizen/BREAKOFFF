/**
 * privacy/page.tsx
 * BREAKOFF — Privacy Policy page.
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BREAKOFF",
  description: "Your privacy is important to us. Read our privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-ink-500 mt-3">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
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
              BREAKOFF (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
              BREAKOFF e-commerce website. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our services.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We may collect personal information you provide to us directly,
              such as your name, email address, phone number, and shipping
              address, as well as information collected automatically, such as
              device information and usage data.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We use the information we collect to provide and improve our
              services, process orders, send administrative information, and,
              with your consent, send promotional communications.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              4. Cookies
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              You have the right to access, correct, or delete your personal
              information. You may also withdraw your consent to receive
              promotional communications at any time.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page.
            </p>

            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              8. Contact Us
            </h2>
            <p className="text-ink-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at hello@breakoff.ae.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
