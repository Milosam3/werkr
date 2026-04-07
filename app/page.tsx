import Link from "next/link";
import { Wrench, Zap, ClipboardList, Bell, Check } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6" style={{ color: "#25D366" }} />,
    title: "Instant Quotes",
    desc: "Generate professional quotes in seconds. Send them straight from WhatsApp before you leave the site.",
  },
  {
    icon: <ClipboardList className="w-6 h-6" style={{ color: "#25D366" }} />,
    title: "Job Tracking",
    desc: "See every job — quoted, accepted, in-progress, done — in one clean dashboard. No spreadsheets.",
  },
  {
    icon: <Bell className="w-6 h-6" style={{ color: "#25D366" }} />,
    title: "Auto Follow-ups",
    desc: "Werkr follows up with clients automatically so no lead slips through the cracks.",
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

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#25D366" }}
          >
            <Wrench className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Run your entire business on WhatsApp
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10">
            Quotes, jobs, clients, follow-ups — all from a WhatsApp message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              See Demo
            </Link>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-gray-900 bg-white text-base hover:bg-gray-100 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need, nothing you don&apos;t
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="text-5xl font-serif mb-4"
            style={{ color: "#25D366" }}
            aria-hidden
          >
            &ldquo;
          </div>
          <p className="text-xl text-gray-800 font-medium leading-relaxed mb-6">
            I used to lose jobs because I was slow to quote. Werkr sends the
            quote before I&apos;ve even put down my tools.
          </p>
          <p className="text-sm font-semibold text-gray-500">
            — Sipho M., Electrician, Soweto
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-gray-500 mb-12">
            No setup fees. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 border-2 flex flex-col ${
                  p.highlighted
                    ? "border-[#25D366] shadow-lg"
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
                  <span className="text-3xl font-bold text-gray-900">
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
                  className={`mt-8 block text-center py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
                    p.highlighted ? "text-white" : "text-gray-900 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={p.highlighted ? { backgroundColor: "#25D366" } : {}}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-5 h-5 rounded flex items-center justify-center"
            style={{ backgroundColor: "#25D366" }}
          >
            <Wrench className="w-3 h-3 text-white" />
          </div>
          <span className="text-white font-semibold">Werkr</span>
        </div>
        <p>© 2025 Werkr. Built for South African tradespeople.</p>
      </footer>
    </main>
  );
}
