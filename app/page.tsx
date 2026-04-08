import Link from "next/link";
import { Wrench, Zap, ClipboardList, Bell, Check } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "Quoted in 30 seconds",
    title: "Instant Quotes",
    desc: "Generate professional quotes in seconds. Send them straight from WhatsApp before you leave the site.",
  },
  {
    icon: <ClipboardList className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "Zero spreadsheets",
    title: "Job Tracking",
    desc: "See every job — quoted, accepted, in-progress, done — in one clean dashboard.",
  },
  {
    icon: <Bell className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "40% more conversions",
    title: "Auto Follow-ups",
    desc: "Werkr follows up with clients automatically so no lead slips through the cracks.",
  },
];

const steps = [
  {
    number: "01",
    title: "Customer WhatsApps your number",
    desc: "They send a message describing the job — no app download, no forms. Just a WhatsApp.",
  },
  {
    number: "02",
    title: "Werkr captures the lead instantly",
    desc: "The lead is logged, categorised, and you get notified in real time — wherever you are.",
  },
  {
    number: "03",
    title: "You send a professional quote in one tap",
    desc: "Review the auto-generated quote and send it back via WhatsApp before your competitor even picks up the phone.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "R349",
    features: [
      "Up to 20 quotes/mo",
      "Basic job tracking",
      "WhatsApp bot",
      "1 user",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "R699",
    features: [
      "Unlimited quotes",
      "Full job pipeline",
      "Auto follow-ups",
      "3 users",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "R1,199",
    features: [
      "Everything in Growth",
      "CRM + client history",
      "Priority support",
      "Unlimited users",
    ],
    highlighted: false,
  },
];

function WhatsAppMock() {
  return (
    <div className="w-full max-w-[320px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#075E54" }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#25D366" }}
        >
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-none mb-0.5">Werkr Bot</p>
          <p className="text-green-300 text-xs">online</p>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Chat body */}
      <div className="px-4 py-5 space-y-3" style={{ backgroundColor: "#ECE5DD" }}>
        {/* Customer message */}
        <div className="flex justify-start">
          <div className="bg-white rounded-[16px] rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-gray-800 text-sm leading-snug">
              Need a quote for geyser replacement 🔧
            </p>
            <p className="text-gray-400 text-[10px] text-right mt-1">09:14</p>
          </div>
        </div>

        {/* Bot typing indicator then reply */}
        <div className="flex justify-end">
          <div
            className="rounded-[16px] rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-sm"
            style={{ backgroundColor: "#DCF8C6" }}
          >
            <p className="text-gray-800 text-sm leading-snug font-medium">
              Quote sent ✅
            </p>
            <p className="text-gray-700 text-sm leading-snug mt-0.5">
              R3,200 — valid 7 days
            </p>
            <p className="text-gray-400 text-[10px] text-right mt-1 flex items-center justify-end gap-1">
              09:14
              <svg viewBox="0 0 18 11" width="14" height="9" fill="none" className="text-blue-500">
                <path d="M17 1L7 10L2 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 1L7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </p>
          </div>
        </div>

        {/* Customer reply */}
        <div className="flex justify-start">
          <div className="bg-white rounded-[16px] rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-gray-800 text-sm leading-snug">
              Perfect, I accept 👍
            </p>
            <p className="text-gray-400 text-[10px] text-right mt-1">09:15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
              style={{ backgroundColor: "#25D366" }}
            >
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-[1.08] tracking-tight">
              Run your entire business on WhatsApp
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
              Quotes, jobs, clients, follow-ups — all from a WhatsApp message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="inline-block px-8 py-3.5 rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-90 text-center"
                style={{ backgroundColor: "#25D366" }}
              >
                See Demo
              </Link>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3.5 rounded-lg font-semibold text-gray-900 bg-white text-base hover:bg-gray-100 transition-colors text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right: WhatsApp mock */}
          <div className="flex justify-center lg:justify-end">
            <WhatsAppMock />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14">
            Everything you need, nothing you don&apos;t
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-5">{f.icon}</div>
                <p
                  className="text-2xl font-extrabold mb-2 tracking-tight"
                  style={{ color: "#25D366" }}
                >
                  {f.stat}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Werkr Works */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            How Werkr Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line on desktop */}
            <div
              className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
              style={{ backgroundColor: "#bbf7d0" }}
            />
            {steps.map((step) => (
              <div key={step.number} className="relative text-center md:text-left">
                <div
                  className="text-6xl font-black leading-none mb-5 select-none"
                  style={{ color: "#25D366", opacity: 0.25 }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-center text-sm font-semibold mb-3 tracking-wide"
            style={{ color: "#25D366" }}
          >
            Join 200+ South African tradespeople
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-gray-500 mb-14">
            No setup fees. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 border-2 flex flex-col ${
                  p.highlighted
                    ? "border-[#25D366] shadow-xl shadow-green-100"
                    : "border-gray-200"
                }`}
              >
                {p.highlighted && (
                  <span
                    className="text-xs font-semibold uppercase tracking-wide text-white px-3 py-1 rounded-full self-start mb-4"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <div className="mt-2 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {p.price}
                  </span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {p.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Check
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "#25D366" }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block text-center py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
                    p.highlighted
                      ? "text-white"
                      : "text-gray-900 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={p.highlighted ? { backgroundColor: "#25D366" } : {}}
                >
                  Start Free Trial
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">
                  No credit card required
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: "#25D366" }}
            >
              <Wrench className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Werkr</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
            <Link href="/quote" className="hover:text-white transition-colors">Quote Generator</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
          <div className="text-sm text-gray-500 text-center space-y-1">
            <p>Made in South Africa 🇿🇦</p>
            <p>© 2025 Werkr. Built for South African tradespeople.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
