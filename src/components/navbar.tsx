"use client";

import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCartStore } from "../../store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const NavBar = () => {
  const { items } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handelResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
      window.addEventListener("resize", handelResize);
      return () => {
        window.removeEventListener("resize", handelResize);
      };
    };
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600">
          {" "}
          My Ecommerce{" "}
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                {" "}
                Home Page{" "}
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                {" "}
                Products{" "}
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600">
                {" "}
                Checkout{" "}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
