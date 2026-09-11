"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  // Initialize session
  useEffect(() => {
    const storedSession = localStorage.getItem("whatsapp_session");
    if (storedSession) {
      setSessionId(storedSession);
      loadChatHistory(storedSession);
    } else {
      const newSession = uuidv4();
      setSessionId(newSession);
      localStorage.setItem("whatsapp_session", newSession);
      loadInitialMessage();
    }
  }, []);

  const loadInitialMessage = () => {
    const greeting: Message = {
      role: "bot",
      content: `👋 Welcome to Arcure Pharma Support!

I'm here to help you with:
1️⃣ Product Information
2️⃣ Order Tracking
3️⃣ Payment Options
4️⃣ General Questions

How can I assist you today?`,
      timestamp: new Date().toISOString(),
    };
    setMessages([greeting]);
  };

  const loadChatHistory = async (id: string) => {
    try {
      const response = await fetch(`/api/whatsapp/chat?sessionId=${id}`);
      const data = await response.json();
      if (data.messages.length > 0) {
        setMessages(data.messages);
        setUserPhone(data.sessionInfo?.userPhone || "");
      } else {
        loadInitialMessage();
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      loadInitialMessage();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user message
    const userMsg: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/whatsapp/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          userMessage: userInput,
          userName: localStorage.getItem("user_name") || "Guest",
          userEmail: localStorage.getItem("user_email") || "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMsg: Message = {
          role: "bot",
          content: data.response,
          timestamp: data.timestamp,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShiftToWhatsApp = async () => {
    if (!userPhone) {
      setShowPhoneInput(true);
      return;
    }

    try {
      // Send conversation link via WhatsApp
      const message = `Hi! I'm from Arcure Pharma Support. Your chat session ID is: ${sessionId}. Continue your conversation with us via WhatsApp. Type 'help' for options.`;

      await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: userPhone,
          message,
          sessionId,
        }),
      });

      // Mark conversation as transferred
      await fetch("/api/whatsapp/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: "shiftToWhatsApp",
        }),
      });

      alert("✅ Conversation shifted to WhatsApp!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error shifting to WhatsApp:", error);
      alert("Failed to shift to WhatsApp. Please try again.");
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPhone) {
      handleShiftToWhatsApp();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-pulse"
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageCircle className="w-8 h-8" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Arcure Pharma Support</h3>
                <p className="text-teal-100 text-sm">Usually replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-96">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-teal-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.role === "user"
                        ? "text-teal-100"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-lg rounded-bl-none border border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phone Input Section */}
          {showPhoneInput && (
            <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
              <form onSubmit={handlePhoneSubmit} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Enter your WhatsApp number:
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="03001234567"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!userPhone}
                    className="px-3 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    OK
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleShiftToWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => setShowPhoneInput(!showPhoneInput)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold text-sm transition-colors"
              >
                {showPhoneInput ? "Cancel" : "Update Phone"}
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
