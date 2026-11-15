/** 
 * about/page.tsx 
 * BREAKOFF — About Us page. 
 */
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | BREAKOFF",
  description: "Learn about BREAKOFF — timeless clothing for the modern individual.",
};

export default function AboutPage() {
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
              About Us
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 mb-4">
                Our Story
              </h2>
              <p className="text-ink-700 leading-relaxed mb-4">
                BREAKOFF was born from a simple idea: that clothing should be
                more than just fabric. It should be a statement of who you are,
                a reflection of your values, and a tool that helps you move
                through the world with confidence.
              </p>
              <p className="text-ink-700 leading-relaxed mb-4">
                We believe in timeless clothing — pieces that don't follow
                fleeting trends but instead endure, becoming the foundation of
                every great wardrobe. Our collections are designed in-house,
                made in small batches, and crafted with the highest standards
                of quality and sustainability.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink-900 mb-4">
                Our Philosophy
              </h2>
              <ul className="space-y-3 text-ink-700 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-black font-bold mt-1">01</span>
                  <p>
                    <strong className="text-ink-900">Timeless design.</strong>
                    {" "}Every piece is designed to transcend seasons,
                    staying relevant and wearable for years.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold mt-1">02</span>
                  <p>
                    <strong className="text-ink-900">Premium materials.</strong>
                    {" "}We source the finest fabrics and produce
                    responsibly.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold mt-1">03</span>
                  <p>
                    <strong className="text-ink-900">Conscious production.</strong>
                    {" "}Ethical manufacturing with a commitment to
                    sustainability.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-black font-bold mt-1">04</span>
                  <p>
                    <strong className="text-ink-900">Everyday essentials.</strong>
                    {" "}Clothing that integrates seamlessly into your
                    life, from the office to the weekend.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink-900 mb-4">
                The BREAKOFF Promise
              </h2>
              <p className="text-ink-700 leading-relaxed mb-4">
                We're not just a clothing brand. We're a community of
                individuals who value quality, craftsmanship, and the power of
                style to express identity. Every time you wear a BREAKOFF
                piece, you're wearing a piece of that belief.
              </p>
              <p className="text-ink-700 leading-relaxed">
                Thank you for being part of the BREAKOFF story.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}