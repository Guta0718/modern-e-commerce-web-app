"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Gebeya
        </Link>

        <button
          type="button"
          className="rounded p-2 hover:bg-gray-800 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 top-[60px] z-50 w-full flex-col space-y-4 bg-gray-900 p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:space-x-4 md:space-y-0 md:p-0`}
        >
          <Link
            href="/"
            className="font-semibold hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-semibold hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            href="/about"
            className="font-semibold hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            href="/cart"
            className="font-semibold hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          <Link
            href="/checkout"
            className="font-semibold hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Checkout
          </Link>

          {user ? (
            <>
              <Link
                href="/account"
                className="font-semibold hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                My Account
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="font-semibold hover:text-gray-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                className="text-left font-semibold hover:text-gray-300"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  router.replace("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-semibold hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="font-semibold hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
