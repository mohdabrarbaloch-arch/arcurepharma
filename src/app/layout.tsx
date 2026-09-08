import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/storefront/CustomCursor";
import WhatsAppWidget from "@/components/storefront/WhatsAppWidget";
import ChatBot from "@/components/storefront/ChatBot";
import { ThemeProvider } from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "Arcure Pharma - Your Trusted Online Pharmacy",
  description:
    "Quality Medicated products delivered to your doorstep with care and reliability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("arcure_theme");document.documentElement.setAttribute("data-theme",t==="navy"?"navy":"green");}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          <WhatsAppWidget />
          <ChatBot />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--color-teal-600)",
                color: "#fff",
                borderRadius: "12px",
              },
            }}
          />
          {children}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden select-none"
            style={{ mixBlendMode: "multiply" }}
          >
            <div className="watermark-layer">
              {"ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • "}
            </div>
            <div className="watermark-layer watermark-layer--2">
              {"ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • ONLY FOR TEST USE • "}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
