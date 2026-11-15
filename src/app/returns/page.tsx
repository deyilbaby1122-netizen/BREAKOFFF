/** 
 * returns/page.tsx 
 * BREAKOFF — Returns page. 
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns | BREAKOFF",
  description: "View BREAKOFF's return policy and process.",
};

export default function ReturnsPage() {
  return (
    <>
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Returns
            </h1>
            <p className="text-ink-500 mt-3 text-base">
              Not satisfied with your purchase? Please review our return policy
              below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-ink-900 mb-4">
              Our Return Policy
            </h2>
            <ul className="space-y-4 text-ink-700 leading-relaxed">
              <li>
                <p className="font-medium text-ink-900">
                  30-day return window from delivery date.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink-900">
                  Items must be unworn, unwashed, and in their original condition.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink-900">
                  Original receipt or proof of purchase is required.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink-900">
                  Return shipping costs are the responsibility of the customer,
                  unless the return is due to a defective or incorrect item.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-ink-900 mt-8 mb-4">
              How to Initiate a Return
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-ink-700 leading-relaxed">
              <li>
                Contact our customer care team at hello@breakoff.ae with your
                order number.
              </li>
              <li>
                Receive a prepaid return shipping label via email.
              </li>
              <li>
                Pack the item securely in its original packaging if possible.
              </li>
              <li>
                Ship the item within 14 days of receiving the return label.
              </li>
              <li>
                Once we receive and inspect the item, your refund will be
                processed within 5-7 business days.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}