/** 
 * shipping/page.tsx 
 * BREAKOFF — Shipping page. 
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping | BREAKOFF",
  description: "Learn about BREAKOFF shipping policies and delivery times.",
};

export default function ShippingPage() {
  return (
    <>
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Shipping
            </h1>
            <p className="text-ink-500 mt-3 text-base">
              We deliver worldwide with care and precision.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              Delivery Times
            </h2>
            <ul className="space-y-4 text-ink-700 leading-relaxed">
              <li>
                 <p className="font-medium text-ink-900">
                  Domestic (UAE): 2-4 business days.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink-900">
                International: 5-7 business days.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">
              Shipping Costs
            </h2>
            <ul className="list-decimal list-inside space-y-3 text-ink-700 leading-relaxed">
              <li>
                <p className="font-medium text-ink-900">
                  Free shipping on orders over AED 200.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink-900">
                Standard shipping: AED 25 flat rate.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">
              Returns & Exchanges
            </h2>
            <p className="text-ink-700 mb-4">
              Free return shipping for defective or incorrect items. Please
              contact hello@breakoff.ae to initiate a return.
            </p>

            <h3 className="text-base font-medium text-ink-900 mb-3">
              Tracking Your Order
            </h3>
            <p className="text-ink-500">
              Once your order ships, you will receive a tracking number via
              email. You can monitor your delivery status in real-time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}