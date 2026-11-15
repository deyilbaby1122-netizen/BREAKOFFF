/**
 * contact/page.tsx
 * BREAKOFF — Contact Us page.
 */
import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, HelpCircle } from "@/components/icons";

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
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <div>
                  <textarea
                    placeholder="Message"
                    rows={5}
                    className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                <Button className="!text-base !px-6 !py-3 !rounded-full">
                  Send Message
                </Button>
              </form>
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
                  <a
                  key="instagram"
                  href="#"
                  className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600 hover:bg-black hover:text-white transition-colors"
                >
                  <Shield size={14} />
                </a>
                <a
                  key="facebook"
                  href="#"
                  className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600 hover:bg-black hover:text-white transition-colors"
                >
                  <Shield size={14} />
                </a>
                <a
                  key="twitter"
                  href="#"
                  className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center text-ink-600 hover:bg-black hover:text-white transition-colors"
                >
                  <Shield size={14} />
                  <span className="text-xs font-bold">{label[0]}</span>
                </a>
                ))
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
