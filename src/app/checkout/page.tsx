/**
 * checkout/page.tsx
 * BREAKOFF — Checkout page.
 * - Customer details form
 * - Order summary
 * - Payment integration placeholder (Stripe when credentials available)
 * - Order confirmation after successful submission
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CreditCard,
  Check,
  Truck,
  Shield,
} from "@/components/icons";
import { useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clear } = useCartStore();
  const router = useRouter();

  // Demo mode: use in-memory order creation
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Payment integration is conditional on available credentials.
  // When Stripe is configured, it will render a secure checkout.
  const hasStripeCredentials =
    typeof window !== "undefined" &&
    (window as any).__STripePublicKey &&
    (window as any).__StripePublishableKey;

  const deliveryFee = items.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    if (orderPlaced) return;

    if (hasStripeCredentials) {
      // In production: integrate Stripe.js payment intent flow.
      // For demo, simulate a success payment and create the order.
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 1500));
      setProcessing(false);

      // Create order in demo store
      const store = (await import("@/lib/supabase")).getDemoStore();
      store.createOrder(items, {
        name: "Demo User",
        email: "customer@example.com",
        phone: "",
        address: "",
        city: "",
        country: "",
        method: "stripe",
      });
      clear();
      setOrderPlaced(true);
    } else {
      // Demo mode: create order directly
      const { getDemoStore } = await import("@/lib/supabase");
      const store = getDemoStore();
      const orderId = store.createOrder(items, {
        name: "Demo User",
        email: "customer@example.com",
        phone: "",
        address: "",
        city: "",
        country: "",
        method: "demo",
      });
      clear();
      setProcessing(false);
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} color="#10b981" />
          </div>
          <h1 className="text-3xl font-bold text-ink-900 mb-3">
            Order Confirmed
          </h1>
          <p className="text-ink-500 mb-8">
            Thank you for your purchase. Your order has been received and is
            being prepared for shipping.
          </p>
          <div className="bg-cream-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-ink-500">Order Summary</p>
            <div className="mt-3 space-y-2">
              {items.map((item) => {
                const product = productById(item.id);
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-ink-700">
                      {product?.name} × {item.qty}
                    </span>
                    <span className="text-ink-900 font-medium">
                      ${(product?.price ?? 0) * item.qty}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-sm font-medium text-ink-700">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-ink-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink-900">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              className="!text-base !px-6"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
            <Link href="/account/orders">
              <Button className="!text-base !px-6">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-ink-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-ink-500 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-ink-900 mb-6">Checkout</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
            className="space-y-6"
          >
            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                    defaultValue="Demo Customer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  defaultValue="demo@example.com"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="123 Main Street"
                  defaultValue="123 Saif Zayed Al Nahyan St"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Abu Dhabi"
                  defaultValue="Abu Dhabi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="UAE"
                  defaultValue="United Arab Emirates"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
                  <input
                    type="tel"
                    className="w-full pl-9 pr-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="border-t border-cream-200 pt-6">
              <h3 className="text-lg font-bold text-ink-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-cream-200 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4"
                    defaultChecked
                  />
                  <CreditCard className="w-5 h-5 text-ink-500" />
                  <span className="text-sm font-medium text-ink-700">
                    Credit / Debit Card
                  </span>
                </label>
                {hasStripeCredentials && (
                  <div
                    id="stripe-payment-element"
                    className="p-4 border border-cream-200 rounded-xl"
                  >
                    <p className="text-xs text-ink-500">
                      Stripe checkout will integrate here when configured.
                    </p>
                  </div>
                )}
                <label className="flex items-center gap-3 p-4 border border-cream-200 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-ink-700">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>

            {/* Order summary */}
            <div className="border-t border-cream-200 pt-6">
              <h3 className="text-lg font-bold text-ink-900 mb-4">Order Summary</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {items.map((item) => {
                  const product = productById(item.id);
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-ink-700">
                        {product.name} × {item.qty}
                      </span>
                      <span className="text-ink-900 font-medium">
                        ${(product.price ?? 0) * item.qty}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between text-sm font-medium text-ink-700">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-ink-700">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-ink-900">
                <span>Total (AED)</span>
                <span>${total}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full !text-base !px-6 !py-3.5 !rounded-full !text-white bg-black hover:bg-neutral-800"
              disabled={processing}
            >
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight size={18} strokeWidth={2} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Delivery preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold text-ink-900 mb-4">Delivery</h3>
            <div className="bg-cream-50 rounded-2xl p-5 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-ink-600">
                <Truck className="w-4 h-4 text-ink-500" />
                <span className="text-ink-700 font-medium">
                  5-7 business days
                </span>
              </div>
              <div className="flex items-center gap-2 text-ink-600">
                <Shield className="w-4 h-4 text-ink-500" />
                <span className="text-ink-700 font-medium">
                  Free returns within 30 days
                </span>
              </div>
              <div className="border-t border-cream-200 pt-3">
                <p className="text-sm font-medium text-ink-900 mb-1">
                  {items.length > 0 ? items.length : 0} items
                </p>
                <p className="text-ink-500">
                  Subtotal {`$${subtotal}`}
                </p>
                <p className="text-sm font-medium text-ink-900">
                  Total ${total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
