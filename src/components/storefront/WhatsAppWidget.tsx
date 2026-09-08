"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const DEFAULT_NUMBER = "923001234567";

function normalizeNumber(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("0")) return "92" + digits.slice(1);
  if (!digits.startsWith("92")) return "92" + digits;
  return digits;
}

export default function WhatsAppWidget() {
  const [number, setNumber] = useState(DEFAULT_NUMBER);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.whatsapp_number) {
          setNumber(normalizeNumber(data.whatsapp_number));
        }
      })
      .catch(() => {});
  }, []);

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hello Arcure Pharma! I have a question about your products."
  )}`;

  const close = () => setOpen(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden animate-fade-in">
          <div className="bg-teal-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </div>
            <div className="text-white">
              <p className="font-semibold text-sm">Arcure Pharma</p>
              <p className="text-xs text-white/80">Online now — reply within minutes</p>
            </div>
            <button
              onClick={close}
              className="ml-auto p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="p-5">
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4 mb-4">
              <p className="text-gray-700 text-sm">
                👋 Hi! Have a question or want to place an order? Chat with us on WhatsApp.
              </p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-2 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt=""
                className="w-5 h-5"
              />
              Start Chat
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center shadow-xl shadow-teal-600/40 transition-all hover:scale-110 active:scale-95"
        aria-label="WhatsApp chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-7 h-7"
          />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}
