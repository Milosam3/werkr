import Link from "next/link";
import { Wrench, Zap, ClipboardList, Bell, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "Quote in 30 seconds",
    title: "Instant Quotes",
    desc: "Type the job. Fiksr generates a professional quote. Send it to your client before you even leave the site.",
  },
  {
    icon: <ClipboardList className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "Zero admin",
    title: "Job Tracker",
    desc: "Every job — quoted, accepted, in progress, done — tracked in one place. No spreadsheets. No WhatsApp scrolling.",
  },
  {
    icon: <Bell className="w-7 h-7" style={{ color: "#25D366" }} />,
    stat: "Never lose a lead",
    title: "Auto Follow-ups",
    desc: "No reply in 48 hours? Fiksr follows up automatically. You stay focused on the job. Fiksr chases the money.",
  },
];

const steps = [
  {
    number: "01",
    title: "Client WhatsApps your number",
    desc: "No app download. No form to fill in. They send one message and Fiksr captures it instantly.",
  },
  {
    number: "02",
    title: "You get notified immediately",
    desc: "Lead logged, categorised, and in your dashboard. You're first to know — and first to respond.",
  },
  {
    number: "03",
    title: "Quote sent before the competition answers",
    desc: "Tap to review the AI-generated quote. Send it via WhatsApp. Job done before your competitor picks up.",
  },
];

const painPoints = [
  "Losing quotes in WhatsApp threads",
  "Forgetting to follow up with clients",
  "Spending evenings on admin instead of rest",
  "Looking unprofessional with hand-written quotes",
  "Missing jobs because you responded too slowly",
];

function WhatsAppMock() {
  return (
    <div className="w-full max-w-[300px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
      <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#075E54" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#25D366" }}>
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-none mb-0.5">Fiksr</p>
          <p className="text-green-300 text-xs">online</p>
        </div>
      </div>
      <div className="px-4 py-5 space-y-3" style={{ backgroundColor: "#ECE5DD" }}>
        <div className="flex justify-start">
          <div className="bg-white rounded-[16px] rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-gray-800 text-sm leading-snug">Need a quote for burst geyser replacement 🔧</p>
            <p className="text-gray-400 text-[10px] text-right mt-1">09:14</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-[16px] rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-sm" style={{ backgroundColor: "#DCF8C6" }}>
            <p className="text-gray-800 text-sm font-medium">Quote sent ✅</p>
            <p className="text-gray-700 text-sm mt-0.5">R3,200 — valid 7 days</p>
            <p className="text-gray-400 text-[10px] text-right mt-1">09:14</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white rounded-[16px] rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-gray-800 text-sm">Perfect, when can you come? 👍</p>
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
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/50 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-sm font-medium">Now live for SA tradespeople</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 leading-[1.08] tracking-tight">
              Stop losing jobs to <span style={{ color: "#25D366" }}>slow admin</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
              Fiksr handles your quotes, leads, and follow-ups — automatically. You focus on the work. Fiksr closes the deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/27828203489?text=Hi%20Fiksr%2C%20I%27d%20like%20to%20find%20out%20more" target="_blank" className="inline-block px-8 py-3.5 rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-90 text-center" style={{ backgroundColor: "#25D366" }}>
                Get Early Access
              </a>
              <Link href="/demo" className="inline-block px-8 py-3.5 rounded-lg font-semibold text-gray-900 bg-white text-base hover:bg-gray-100 transition-colors text-center">
                See How It Works
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-5">No contracts. No setup fees. Cancel anytime.</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <WhatsAppMock />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-6">Sound familiar?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {painPoints.map((p) => (
              <span key={p} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 shadow-sm">
                😩 {p}
              </span>
            ))}
          </div>
          <p className="text-gray-900 font-bold text-xl mt-8">Fiksr fixes all of this. From WhatsApp.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-center text-gray-500 mb-14 text-lg">Built for tradespeople who are busy doing the actual work.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-5">{f.icon}</div>
                <p className="text-2xl font-extrabold mb-2 tracking-tight" style={{ color: "#25D366" }}>{f.stat}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">How Fiksr Works</h2>
          <p className="text-center text-gray-500 mb-16 text-lg">Set up in under 10 minutes. No tech skills needed.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden" style={{ backgroundColor: "#bbf7d0" }} />
            {steps.map((step) => (
              <div key={step.number} className="relative text-center md:text-left">
                <div className="text-6xl font-black leading-none mb-5 select-none" style={{ color: "#25D366", opacity: 0.25 }}>{step.number}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple. Fair. Coming soon.</h2>
          <p className="text-gray-500 text-lg mb-8">Finalising pricing tiers. Early access members get a special rate locked in for life.</p>
          <a href="https://wa.me/27828203489?text=Hi%20Fiksr%2C%20I%27d%20like%20to%20find%20out%20more" target="_blank" className="inline-block px-8 py-3.5 rounded-lg font-semibold text-white" style={{ backgroundColor: "#25D366" }}>Get Early Access Pricing →</a>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#25D366" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to stop losing jobs to admin?</h2>
          <p className="text-green-100 text-lg mb-8">Join South African tradespeople already on the waitlist.</p>
          <a href="https://wa.me/27828203489?text=Hi%20Fiksr%2C%20I%27d%20like%20to%20find%20out%20more" target="_blank" className="inline-block px-10 py-4 rounded-xl font-bold text-green-900 bg-white text-base hover:bg-green-50 transition-colors">
            Get Early Access →
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: "#25D366" }}>
              <Wrench className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Fiksr</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
            <Link href="/quote" className="hover:text-white transition-colors">Quote Generator</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
          <div className="text-sm text-gray-500 text-center space-y-1">
            <p>Made in South Africa 🇿🇦</p>
            <p>© 2026 Fiksr. Built for South African tradespeople.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
