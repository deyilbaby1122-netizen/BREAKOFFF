/** 
 * customer-care/page.tsx 
 * BREAKOFF — Customer Care page. 
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Care | BREAKOFF",
  description: "Need help? Our customer care team is here for you.",
};

export default function CustomerCarePage() {
  return (
    <>
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Customer Care
            </h1>
            <p className="text-ink-500 mt-3 text-base">
              Our team is here to help with any questions about your order,
              sizing, returns, or anything else.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  "How long does shipping take?",
                  "What is your return policy?",
                  "How do I track my order?",
                  "What size should I order?",
                  "Can I change or cancel my order?",
                ].map((q, i) => (
                  <div key={i} className="border-b border-cream-200 py-3">
                    <p className="font-medium text-ink-900">{q}</p>
                    <p className="text-sm text-ink-500 mt-1">
                      Answer text for {q.toLowerCase()}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-sm text-ink-700">
                <p>
                  <strong className="text-ink-900">Email:</strong> {" "}hello@breakoff.ae
                </p>
                <p>
                  <strong className="text-ink-900">Phone:</strong> {" "}+971 50 000 0000
                </p>
                <p>
                  <strong className="text-ink-900">Office:</strong> {" "}123 Saif Zayed Al Nahyan St, Abu Dhabi, UAE
                </p>
                <p>
                  <strong className="text-ink-900">Hours:</strong> {" "}Mon–Fri, 9am–6pm GST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}