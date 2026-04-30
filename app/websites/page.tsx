export default function WebsitesPage() {
  const waLink =
    "https://wa.me/27686249387?text=Hi%20Fiksr%2C%20I%20want%20a%20website%20for%20my%20business";

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <a href="/" className="font-bold text-lg tracking-tight">
          Fiksr
        </a>
        <div className="flex items-center gap-3">
          <span className="bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Website builds
          </span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Get a website
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        {/* Hero */}
        <section>
          <p className="text-xs font-semibold text-orange-600 tracking-widest uppercase mb-4">
            Websites for tradespeople
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Your reviews are doing the work.{" "}
            <span className="text-orange-600">Your website isn&apos;t.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-8">
            You&apos;ve got 4.8 stars on Google. Customers love you. But when
            they search your name, they land on a competitor&apos;s site
            instead. We fix that — once-off, no lock-in.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              WhatsApp us to get started
            </a>
            <span className="text-sm text-gray-400">
              R999 once-off. You own it.
            </span>
          </div>
        </section>

        {/* Problem */}
        <section className="border-l-4 border-orange-600 bg-gray-50 rounded-r-xl pl-6 pr-6 py-7">
          <h2 className="text-lg font-bold mb-4">
            What happens without a website
          </h2>
          <ul className="space-y-3">
            {[
              "Customer Googles you, finds nothing, calls your competitor instead",
              "Your GBP reviews are great but there's nowhere to send people for more info",
              "You look less legit than a newer business that just has a basic site",
              "No way to collect quote requests while you're on the job",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-gray-500">
                <span className="text-orange-600 font-bold shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold mb-1">How it works</h2>
          <p className="text-gray-500 text-sm mb-8">
            3 steps. Live in under a week.
          </p>
          <div className="divide-y divide-gray-100">
            {[
              {
                n: "1",
                title: "Send us your Google Business link",
                body: "We pull your business name, reviews, services, and contact info straight from your GBP. Nothing for you to prepare.",
              },
              {
                n: "2",
                title: "We build your WordPress site in 3 to 5 days",
                body: "Mobile-first, with your reviews front and centre. Quote request form routes straight to your WhatsApp. We handle the setup on Xneelo — you register the domain on Domains.co.za in your own name.",
              },
              {
                n: "3",
                title: "You approve, it goes live — and it's yours",
                body: "One round of changes included. Once you're happy, you get full WordPress admin access. Edit your own content anytime, no dev needed.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-5 py-6">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-medium text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing breakdown */}
        <section>
          <h2 className="text-2xl font-bold mb-1">What&apos;s the cost breakdown</h2>
          <p className="text-gray-500 text-sm mb-6">
            Transparent from day one — you pay us once, everything else goes
            direct to the providers.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                label: "Build fee",
                amount: "R999",
                note: "Paid to Fiksr, once-off",
                tag: "You pay us this",
                tagClass: "bg-amber-100 text-amber-800",
                highlight: false,
              },
              {
                label: "Domain (.co.za)",
                amount: "~R99",
                note: "Per year, via Domains.co.za",
                tag: "Paid direct by you",
                tagClass: "bg-green-100 text-green-800",
                highlight: false,
              },
              {
                label: "Hosting",
                amount: "~R100",
                note: "Per month, via Xneelo",
                tag: "Paid direct by you",
                tagClass: "bg-green-100 text-green-800",
                highlight: false,
              },
              {
                label: "Total ongoing",
                amount: "~R108/mo",
                note: "Domain + hosting combined",
                tag: "You control it all",
                tagClass: "bg-green-100 text-green-800",
                highlight: true,
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-xl p-5 border ${
                  card.highlight
                    ? "border-orange-500"
                    : "border-gray-100"
                } bg-white`}
              >
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-extrabold mb-0.5">{card.amount}</p>
                <p className="text-xs text-gray-400 mb-3">{card.note}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${card.tagClass}`}
                >
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="text-gray-700 font-medium">
                Why we do it this way:
              </span>{" "}
              your domain and hosting are registered in your name, paid directly
              to the providers. No middleman. No risk of your site going down
              because someone forgot to pay a bill. You own your site completely
              — we&apos;re just the builders.
            </p>
          </div>
        </section>

        {/* Includes */}
        <section>
          <h2 className="text-2xl font-bold mb-1">What&apos;s included</h2>
          <p className="text-gray-500 text-sm mb-6">
            Everything to get you live and generating leads.
          </p>
          <ul className="space-y-3">
            {[
              "Mobile-first WordPress site with your branding",
              "Google reviews section pulled from your GBP",
              "Quote request form, routed to your WhatsApp",
              "Xneelo hosting setup with WordPress installed",
              "Domain configuration on Domains.co.za",
              "1 round of revisions before go-live",
              "Full WordPress admin handover so you can edit anytime",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-gray-500">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="border border-gray-100 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Your competitors already have websites.
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            R999 once-off. One lost job costs more than that.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            WhatsApp us now
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-6 border-t border-gray-100 flex justify-between items-center flex-wrap gap-3">
        <a href="/" className="font-bold text-sm">
          Fiksr
        </a>
        <div className="flex gap-4">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600">
            Back to Fiksr
          </a>
          <a
            href="https://wa.me/27686249387"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            WhatsApp us
          </a>
        </div>
      </footer>
    </div>
  );
}
