const waLink =
  "https://wa.me/27828203489?text=Hi%2C%20I%27d%20like%20a%20website%20for%20my%20business";

const problems = [
  "Customer Googles you, finds nothing, calls your competitor instead",
  "Your Google reviews are great but there's nowhere to send people for more info",
  "You look less legit than a newer business that just has a basic site",
  "No way to collect quote requests while you're on the job",
];

const steps = [
  {
    n: "01",
    title: "Send us your Google Business link",
    body: "We pull your business name, reviews, services, and contact info straight from your GBP. Nothing for you to prepare.",
  },
  {
    n: "02",
    title: "We build your site in 3 to 5 days",
    body: "Mobile-first, with your reviews front and centre. A quote request form routes straight to your WhatsApp. We handle all the technical setup.",
  },
  {
    n: "03",
    title: "You approve — and it's yours",
    body: "One round of changes included. Once you're happy, you get full admin access. Edit your own content anytime, no dev needed.",
  },
];

const pricing = [
  {
    label: "Build fee",
    amount: "R999",
    note: "Paid to Fiksr, once-off",
    tag: "You pay us this",
    tagClass: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40",
    highlight: false,
  },
  {
    label: "Domain (.co.za)",
    amount: "~R99",
    note: "Per year, paid direct",
    tag: "You own it",
    tagClass: "bg-green-900/40 text-green-300 border border-green-700/40",
    highlight: false,
  },
  {
    label: "Hosting",
    amount: "~R100",
    note: "Per month, paid direct",
    tag: "You control it",
    tagClass: "bg-green-900/40 text-green-300 border border-green-700/40",
    highlight: false,
  },
  {
    label: "Total ongoing",
    amount: "~R108/mo",
    note: "Domain + hosting combined",
    tag: "No lock-in",
    tagClass: "bg-green-900/40 text-green-300 border border-green-700/40",
    highlight: true,
  },
];

const includes = [
  "Mobile-first WordPress site with your branding",
  "Google reviews section pulled from your GBP",
  "Quote request form, routed to your WhatsApp",
  "Full hosting and domain setup",
  "1 round of revisions before go-live",
  "Full admin handover — edit your content anytime",
];

const faqs = [
  {
    q: "Who hosts the site?",
    a: "We set it up on Xneelo, a reliable South African hosting provider. You register the account directly in your name — we just do the technical setup. Your site stays up regardless of what happens to us.",
  },
  {
    q: "Where do I register my domain?",
    a: "We recommend Domains.co.za. You register the domain yourself (in your own name), and we configure it to point to your hosting. The whole process takes about 10 minutes.",
  },
  {
    q: "What does the ongoing cost actually cover?",
    a: "Domain renewal (~R99/year via Domains.co.za) and hosting (~R100/month via Xneelo). Both are paid directly to the providers — we're not the middleman. You're never locked into us.",
  },
  {
    q: "Can I edit the site myself after launch?",
    a: "Yes. You get full WordPress admin access on go-live. Update your services, add photos, change your number — no developer needed.",
  },
  {
    q: "What if I already have a domain?",
    a: "No problem. We'll configure your existing domain to point to your new site. Just let us know when you WhatsApp us.",
  },
];

export default function WebsitesPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-sm font-medium">Website builds for SA tradespeople</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-[1.08] tracking-tight">
            Your reviews are doing the work.{" "}
            <span style={{ color: "#25D366" }}>Your website isn&apos;t.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            You&apos;ve got 4.8 stars on Google. Customers love you. But when they search your name,
            they land on a competitor&apos;s site instead. We fix that — once-off, no lock-in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-90 text-center"
              style={{ backgroundColor: "#25D366" }}
            >
              WhatsApp us to get started
            </a>
            <span className="text-gray-400 text-sm self-center">R999 once-off. You own it.</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-6">
            Without a website
          </p>
          <ul className="space-y-4">
            {problems.map((item) => (
              <li key={item} className="flex gap-4 text-base text-gray-700">
                <span className="font-bold shrink-0 mt-0.5" style={{ color: "#25D366" }}>✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-500 text-lg mb-16">3 steps. Live in under a week.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.n}>
                <div
                  className="text-6xl font-black leading-none mb-5 select-none"
                  style={{ color: "#25D366", opacity: 0.25 }}
                >
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What&apos;s the cost?</h2>
          <p className="text-gray-600 text-lg mb-12">
            Transparent from day one — you pay us once, everything else goes direct to the providers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {pricing.map((card) => (
              <div
                key={card.label}
                className={`rounded-2xl p-6 border ${
                  card.highlight ? "border-green-600 bg-green-900/10" : "border-gray-200 bg-white"
                }`}
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{card.label}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{card.amount}</p>
                <p className="text-sm text-gray-500 mb-4">{card.note}</p>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${card.tagClass}`}>
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-gray-700 text-base leading-relaxed">
              <span className="font-semibold text-gray-900">Why we do it this way: </span>
              your domain and hosting are registered in your name, paid directly to the providers.
              No middleman. No risk of your site going down because someone forgot to pay a bill.
              You own your site completely — we&apos;re just the builders.
            </p>
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What&apos;s included</h2>
          <p className="text-gray-500 text-lg mb-10">Everything to get you live and generating leads.</p>
          <ul className="space-y-4">
            {includes.map((item) => (
              <li key={item} className="flex gap-4 text-base text-gray-700">
                <span className="font-bold shrink-0 mt-0.5" style={{ color: "#25D366" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Common questions</h2>
          <p className="text-gray-500 text-lg mb-12">Everything you need to know before getting started.</p>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: "#25D366" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your competitors already have websites.
          </h2>
          <p className="text-green-100 text-lg mb-8">R999 once-off. One lost job costs more than that.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-xl font-bold text-green-900 bg-white text-base hover:bg-green-50 transition-colors"
          >
            WhatsApp us now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 text-sm">
          <span className="text-white font-bold text-lg">Fiksr</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/demo" className="hover:text-white transition-colors">Demo</a>
            <a href="/quote" className="hover:text-white transition-colors">Quote Generator</a>
            <a
              href="https://wa.me/27828203489"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp us
            </a>
          </nav>
          <p className="text-gray-500 text-center">Made in South Africa 🇿🇦 · © 2026 Fiksr</p>
        </div>
      </footer>
    </div>
  );
}
