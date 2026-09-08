"use client";

import Link from "next/link";
import { Pill, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Your Trusted Online Pharmacy
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Arcure Pharma is dedicated to providing high-quality Medicated
              products with the convenience of online ordering and fast doorstep
              delivery. With years of experience in the healthcare industry, we
              ensure every product meets rigorous quality standards. Our mission
              is to make essential medications and health products accessible to
              everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Arcure</h3>
                  <p className="text-[10px] text-green-400 tracking-widest uppercase">
                    Pharma
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner in health. Quality products, delivered with care.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/#products", label: "Products" },
                  { href: "/reviews", label: "Testimonials" },
                  { href: "/#about", label: "About Us" },
                  { href: "/checkout", label: "Checkout" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-teal-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                  Plot No. E99/B, Site Super Highway, Karachi, Pakistan
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  +92 334 116 9999
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  info@arcurepharma.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                  { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-xl flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={social.path} /></svg>
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-teal-400 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Arcure Pharma. All rights reserved. Created by{" "}
              <span className="text-teal-400 font-semibold">Muhammad Ayan</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
