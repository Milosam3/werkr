"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

type Message = {
  from: "customer" | "bot" | "owner-notification";
  text: string;
  delay: number;
};

const FLOW_A: Message[] = [
  {
    from: "customer",
    text: "Hi I need a plumber, my geyser is leaking",
    delay: 500,
  },
  {
    from: "bot",
    text: "Hi! 👋 I'm the Werkr assistant for Cape Plumbing Co. Let me get some details. What area are you in?",
    delay: 1500,
  },
  { from: "customer", text: "Brackenfell", delay: 3000 },
  {
    from: "bot",
    text: "Got it. Is this urgent (same day) or can it wait a day or two?",
    delay: 4000,
  },
  { from: "customer", text: "Same day please", delay: 5500 },
  {
    from: "bot",
    text: "Perfect. Our plumber will be in touch within 30 minutes to confirm. Your reference is #JOB-2047 ✅",
    delay: 6500,
  },
  {
    from: "owner-notification",
    text: "🔔 New lead: Geyser repair | Brackenfell | Urgent | #JOB-2047",
    delay: 7000,
  },
];

const FLOW_B: Message[] = [
  {
    from: "customer",
    text: "Quote for bathroom retile, 10sqm, 2 days labour, materials R2800",
    delay: 500,
  },
  { from: "bot", text: "Generating quote... ⚙️", delay: 1500 },
  {
    from: "bot",
    text: "Quote ready! Sent to client. Reference #QT-0091 📄",
    delay: 3200,
  },
  {
    from: "owner-notification",
    text: "QUOTE_PREVIEW",
    delay: 3800,
  },
];

function QuoteCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-xs text-gray-800 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-bold text-sm text-gray-900">Cape Plumbing Co.</div>
          <div className="text-gray-400 text-[10px]">Professional Trade Services</div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-gray-600">#QT-0091</div>
          <div className="text-gray-400 text-[10px]">07 Apr 2025</div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-3 mb-3">
        <div className="font-semibold mb-1">Bathroom Retile — 10sqm</div>
        <table className="w-full text-[11px]">
          <tbody>
            <tr>
              <td className="py-0.5 text-gray-600">Labour (16hrs @ R350/hr)</td>
              <td className="py-0.5 text-right font-medium">R5,600</td>
            </tr>
            <tr>
              <td className="py-0.5 text-gray-600">Materials</td>
              <td className="py-0.5 text-right font-medium">R2,800</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="py-1 text-gray-600">Subtotal</td>
              <td className="py-1 text-right">R8,400</td>
            </tr>
            <tr>
              <td className="py-0.5 text-gray-600">VAT (15%)</td>
              <td className="py-0.5 text-right">R1,260</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-1 font-bold text-gray-900">TOTAL</td>
              <td className="py-1 text-right font-bold text-gray-900">R9,660</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[10px] text-gray-400 border-t border-gray-100 pt-2">
        Payment: 50% upfront · Balance on completion · Valid 7 days
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [flow, setFlow] = useState<"A" | "B">("A");
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [running, setRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const messages = flow === "A" ? FLOW_A : FLOW_B;

  function startFlow() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleMessages([]);
    setRunning(true);
    messages.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
        if (msg === messages[messages.length - 1]) setRunning(false);
      }, msg.delay);
      timersRef.current.push(t);
    });
  }

  function replay() {
    startFlow();
  }

  useEffect(() => {
    startFlow();
    return () => timersRef.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  return (
    <main className="flex-1 bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          WhatsApp Demo
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          See how Werkr handles real conversations — automatically.
        </p>

        {/* Flow toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setFlow("A")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
              flow === "A"
                ? "text-white border-transparent"
                : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
            }`}
            style={flow === "A" ? { backgroundColor: "#25D366" } : {}}
          >
            Flow A — Inbound Lead
          </button>
          <button
            onClick={() => setFlow("B")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
              flow === "B"
                ? "text-white border-transparent"
                : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
            }`}
            style={flow === "B" ? { backgroundColor: "#25D366" } : {}}
          >
            Flow B — Quote Request
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Chat window */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col min-h-[480px]">
            {/* WhatsApp header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ backgroundColor: "#075E54" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#25D366" }}
              >
                W
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  {flow === "A" ? "Cape Plumbing Co." : "Werkr Bot"}
                </div>
                <div className="text-green-300 text-xs">online</div>
              </div>
            </div>

            {/* Chat body */}
            <div
              className="flex-1 px-4 py-4 space-y-3 overflow-y-auto"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dcf8c6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundColor: "#e5ddd5",
                minHeight: "320px",
              }}
            >
              {visibleMessages
                .filter((m) => m.from !== "owner-notification")
                .map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "customer" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm shadow-sm ${
                        msg.from === "customer"
                          ? "rounded-tr-none text-gray-900"
                          : "rounded-tl-none text-gray-900"
                      }`}
                      style={{
                        backgroundColor:
                          msg.from === "customer" ? "#dcf8c6" : "#ffffff",
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              {running && (
                <div className="flex justify-start">
                  <div
                    className="px-3 py-2 rounded-xl rounded-tl-none text-gray-500 text-sm"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Owner notification panel */}
          <div className="md:w-64 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Owner Notifications
            </div>
            {visibleMessages
              .filter((m) => m.from === "owner-notification")
              .map((msg, i) =>
                msg.text === "QUOTE_PREVIEW" ? (
                  <QuoteCard key={i} />
                ) : (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 shadow p-3 text-sm text-gray-800 animate-in fade-in slide-in-from-right-4"
                  >
                    {msg.text}
                  </div>
                )
              )}
            {visibleMessages.filter((m) => m.from === "owner-notification")
              .length === 0 && (
              <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-4 text-xs text-gray-400 text-center">
                Notifications will appear here
              </div>
            )}
          </div>
        </div>

        {/* Replay button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={replay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>
        </div>
      </div>
    </main>
  );
}
