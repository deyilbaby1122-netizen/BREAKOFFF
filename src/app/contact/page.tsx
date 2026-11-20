/**
 * contact/page.tsx
 * BREAKOFF — Contact Us page.
 */
import { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  MessageCircle,
  Shield,
} from "@/components/icons";
import { ContactForm } from "@/app/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | BREAKOFF",
  description: "Get in touch with BREAKOFF. We&apos;d love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Contact Us
            </h1>
            <p className="text-ink-500 mt-3 text-base">
              Have a question or a thought to share? We&apos;d love to hear from
              you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-ink-900 mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact details */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink-900">Email</p>
                    <p className="text-sm text-ink-500">
                      hello@breakoff.ae
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink-900">Phone</p>
                    <p className="text-sm text-ink-500">+971 50 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink-900">Visit us</p>
                    <p className="text-sm text-ink-500">
                      123 Saif Zayed Al Nahyan St
                      <br />
                      Abu Dhabi, United Arab Emirates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink-900">Live chat</p>
                    <p className="text-sm text-ink-500">
                      Mon–Fri, 9am–6pm GST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-ink-900 mb-3">
                  Social
                </h3>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "X"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600 hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="text-xs font-bold">{label[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
