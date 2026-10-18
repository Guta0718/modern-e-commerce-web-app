
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/features/cart/store";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Demo only: no order is sent to a server or payment provider.
      await new Promise((resolve) => setTimeout(resolve, 800));

      alert(
        `Checkout form completed!\nCustomer: ${form.fullName}\nTotal: ETB ${total.toLocaleString()}\nPayment: ${paymentMethod === "cash" ? "Cash on Delivery" : "Bank Transfer"}`
      );

      // Keep the cart intact until you implement real order creation.
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Your cart is empty
        </h1>

        <p className="mt-3 text-foreground">
          Add some products before proceeding to checkout.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-10 lg:grid-cols-3"
      >
        {/* Shipping information */}
        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 p-6">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Shipping Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Phone number"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-2 block text-sm font-medium">
                  Delivery Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  autoComplete="street-address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Street, building, or neighborhood"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="city" className="mb-2 block text-sm font-medium">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level2"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="e.g. Addis Ababa"
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-xl border border-gray-200 p-6">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Payment Method
            </h2>

            <label className="mb-3 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 accent-blue-600"
              />
              <div>
                <p className="font-medium text-gray-900">
                  Cash on Delivery
                </p>
                <p className="text-sm text-gray-500">
                  Pay when your order arrives.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 accent-blue-600"
              />
              <div>
                <p className="font-medium text-gray-900">
                  Bank Transfer
                </p>
                <p className="text-sm text-gray-500">
                  Transfer instructions must be provided by the store.
                </p>
              </div>
            </label>
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-xl border border-gray-200 p-6">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Order Summary
          </h2>

          <div className="max-h-80 space-y-5 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                {item.images?.[0] ? (
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="rounded-lg object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    ETB {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
            <div className="flex justify-between text-sm text-foreground">
              <span>Subtotal</span>
              <span>ETB {total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm text-foreground">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-foreground">
              <span>Order Total</span>
              <span>ETB {total.toLocaleString()}</span>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>

          <Link
            href="/cart"
            className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800"
          >
            Return to Cart
          </Link>
        </aside>
      </form>
    </div>
  );
}
