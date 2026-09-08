"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Pill, User, LogOut, Package, Leaf, Anchor } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useTheme } from "@/lib/ThemeProvider";

interface NavUser {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserOpen(false);
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Products" },
    { href: "/reviews", label: "Reviews" },
    { href: "/#about", label: "About Us" },
  ];

  const userInitial = (user?.name || user?.email || "U").charAt(0).toUpperCase();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-110 transition-transform duration-300 animate-float">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-800 leading-tight">
                Arcure
              </h1>
              <p className="text-[10px] text-green-600 -mt-1 tracking-widest uppercase">
                Pharma
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors"
              >
                {link.label}
                <span className="absolute left-4 right-4 bottom-0 h-0.5 bg-teal-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "green" ? "Switch to Navy Blue" : "Switch to Leaf Green"}
              suppressHydrationWarning
              className="flex items-center gap-1.5 px-3 py-2 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
            >
              {theme === "green" ? (
                <Leaf className="w-4 h-4 text-teal-700" />
              ) : (
                <Anchor className="w-4 h-4 text-teal-700" />
              )}
              <span className="text-xs font-semibold text-teal-700 hidden sm:inline">
                {theme === "green" ? "Green" : "Navy"}
              </span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-2.5 py-2 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
                >
                  <div className="w-7 h-7 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {userInitial}
                  </div>
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {user.name || "My Account"}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      <Package className="w-4 h-4 text-teal-600" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-teal-600/25 active:scale-95"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <Link
              href="/checkout"
              className="relative p-2.5 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-teal-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3">
            {!user && (
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 mb-3 px-4 py-3 bg-teal-600 text-white rounded-xl font-medium"
              >
                <User className="w-5 h-5" />
                Sign In / Register
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
