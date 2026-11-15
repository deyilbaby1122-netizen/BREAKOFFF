/**
 * account/page.tsx
 * BREAKOFF — Account Dashboard.
 * - Order history
 * - Wishlist
 * - Profile
 * - Logout
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Heart,
  User,
  Mail,
  Wallet,
  Shield,
  ShoppingBag,
  LogOut,
  CreditCard,
  FileText,
  Truck,
  RefreshCw,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { getDemoStore } from "@/lib/supabase";

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const demoStore = getDemoStore();
  const orderHistory = demoStore.orders;
  const wishlistItems = demoStore.wishlist;

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Top bar */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-black">
              BREAKOFF
            </Link>
            <div className="flex items-center gap-2">
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span className="ml-1 hidden sm:inline">Logout</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-cream-200 p-5 space-y-1">
              <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-black text-white">
                <LayoutDashboard size={18} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/account/orders" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <ClipboardList size={18} />
                <span className="font-medium">Order History</span>
                {orderHistory.length > 0 && (
                  <span className="ml-auto text-xs bg-cream-200 text-ink-600 px-2 py-0.5 rounded-full">
                    {orderHistory.length}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <Heart size={18} />
                <span className="font-medium">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="ml-auto text-xs bg-cream-200 text-ink-600 px-2 py-0.5 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <ShoppingBag size={18} />
                <span className="font-medium">Cart</span>
              </Link>
              <hr />
              <Link href="/account/profile" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <User size={18} />
                <span className="font-medium">Profile</span>
              </Link>
              <Link href="/account/orders" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <FileText size={18} />
                <span className="font-medium">Orders</span>
              </Link>
              <a href="/account/privacy" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <Shield size={18} />
                <span className="font-medium">Privacy</span>
              </a>
              <a href="/account/contact" className="flex items-center gap-3 px-3 py-2.5 text-ink-700 hover:bg-cream-100">
                <Mail size={18} />
                <span className="font-medium">Support</span>
              </a>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-ink-900 mb-2">
              {user?.email ?? "Welcome"}
            </h1>
            <p className="text-sm text-ink-500 mb-6">
              {user?.user_metadata?.full_name
                ? `Hello ${user.user_metadata.full_name}`
                : "Manage your account"}
            </p>

            {user ? (
              <div className="space-y-6">
                {/* Welcome card */}
                <div className="bg-white rounded-2xl border border-cream-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-ink-500">Member since</p>
                      <p className="font-medium text-ink-900">
                        {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order history */}
                <div className="bg-white rounded-2xl border border-cream-200 p-6">
                  <h2 className="text-lg font-bold text-ink-900 mb-4">
                    Order History
                  </h2>
                  {orderHistory.length === 0 ? (
                    <p className="text-sm text-ink-500">
                      No orders yet. Start shopping to see your order history here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {orderHistory.map((order, idx) => (
                        <div key={idx} className="border border-cream-200 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-ink-900">
                              Order #{order.orderId.slice(0, 8).toUpperCase()}
                            </span>
                            <span className="text-xs text-ink-500">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-ink-500 mb-2">
                            {order.qty} × {order.name}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-ink-700">
                              ${order.price * order.qty}
                            </span>
                            <span className="text-ink-900 font-medium">
                              ${order.price * order.qty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/account/orders">
                    <div className="bg-white rounded-2xl border border-cream-200 p-5 text-center">
                      <FileText className="w-8 h-8 text-ink-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-ink-900">View Orders</p>
                    </div>
                  </Link>
                  <Link href="/wishlist">
                    <div className="bg-white rounded-2xl border border-cream-200 p-5 text-center">
                      <Heart className="w-8 h-8 text-ink-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-ink-900">My Wishlist</p>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl font-bold text-ink-900 mb-4">
                  Sign in to your account
                </p>
                <p className="text-sm text-ink-500 mb-6">
                  Track orders, manage your account, and more.
                </p>
                <Link href="/login">
                  <Button>Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
