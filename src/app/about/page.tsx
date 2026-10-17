import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      <section className="bg-gray-50 px-6 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          About Gebeya E-commerce
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Making Online Shopping Simple and Easy
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          We believe shopping should be easy, convenient, and accessible.
          Our goal is to help customers discover quality products and enjoy
          a smooth shopping experience from browsing to checkout.
        </p>

        <div className="mt-8">
          <Button className="rounded-lg px-6">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Our Goal
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Our store was created with a simple idea: make it easier for
              people to find products they need in one convenient place.
              We want to provide a welcoming online shopping experience
              where customers can explore different products and make
              informed choices.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We continue to focus on simplicity, usability, and customer
              satisfaction as we improve our store and expand our
              collection.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-gray-900">
              Shopping Made Better
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              From discovering products to learning more about each item,
              our goal is to make every step straightforward and convenient.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              What Matters to Us
            </h2>

            <p className="mt-3 text-gray-600">
              The principles behind our shopping experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Quality
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                We aim to help customers discover products that suit
                their needs and preferences.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Convenience
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                We focus on clear product information and simple
                navigation to make browsing easier.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Customer Focus
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                We want every customer to feel confident while exploring
                our products and making purchasing decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Find Something You Like?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
          Browse our collection and discover products that fit your needs.
        </p>

        <div className="mt-7">
          <Button className="rounded-lg px-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
