import { Inbox, Clock, TrendingUp, Users, Wrench, Bell } from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Quoted" | "Converted" | "Lost";

const mockLeads: {
  name: string;
  phone: string;
  jobType: string;
  urgency: string;
  received: string;
  status: LeadStatus;
}[] = [
  { name: "Thabo Mokoena",   phone: "071 234 5678", jobType: "Electrical",  urgency: "Same day",       received: "Today, 08:14",    status: "New" },
  { name: "Priya Naidoo",    phone: "082 345 6789", jobType: "Plumbing",    urgency: "This week",      received: "Today, 07:52",    status: "Contacted" },
  { name: "Johan van Wyk",   phone: "083 456 7890", jobType: "Painting",    urgency: "Just a quote",   received: "Yesterday",       status: "Quoted" },
  { name: "Fatima Patel",    phone: "072 567 8901", jobType: "Tiling",      urgency: "This week",      received: "Yesterday",       status: "Converted" },
  { name: "Sipho Dlamini",   phone: "061 678 9012", jobType: "General",     urgency: "Same day",       received: "6 Apr, 15:30",   status: "New" },
  { name: "Riaan Botha",     phone: "084 789 0123", jobType: "Electrical",  urgency: "This week",      received: "5 Apr, 11:05",   status: "Lost" },
  { name: "Nomsa Khumalo",   phone: "073 890 1234", jobType: "Plumbing",    urgency: "Same day",       received: "5 Apr, 09:41",   status: "Converted" },
  { name: "Gareth Louw",     phone: "082 901 2345", jobType: "Painting",    urgency: "Just a quote",   received: "4 Apr, 14:22",   status: "Quoted" },
  { name: "Ayesha Davids",   phone: "071 012 3456", jobType: "Tiling",      urgency: "This week",      received: "3 Apr, 10:00",   status: "Contacted" },
  { name: "Bongani Zulu",    phone: "063 123 4567", jobType: "General",     urgency: "Same day",       received: "2 Apr, 16:55",   status: "Converted" },
];

const statusStyle: Record<LeadStatus, string> = {
  New:        "bg-blue-100 text-blue-700",
  Contacted:  "bg-yellow-100 text-yellow-800",
  Quoted:     "bg-purple-100 text-purple-700",
  Converted:  "bg-green-100 text-green-700",
  Lost:       "bg-red-100 text-red-600",
};

const stats = [
  { icon: <Inbox className="w-5 h-5" style={{ color: "#25D366" }} />,      label: "Leads This Month",      value: "34" },
  { icon: <Clock className="w-5 h-5" style={{ color: "#25D366" }} />,      label: "Average Response Time", value: "18 min" },
  { icon: <Users className="w-5 h-5" style={{ color: "#25D366" }} />,      label: "Leads Converted",       value: "22" },
  { icon: <TrendingUp className="w-5 h-5" style={{ color: "#25D366" }} />, label: "Conversion Rate",       value: "65%" },
];

export default function LeadsPage() {
  return (
    <main className="flex-1 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#25D366" }}
          >
            <Inbox className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Inbound Leads
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Every WhatsApp enquiry captured automatically. No lead falls through the cracks.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="px-6 py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                {s.icon}
                <span>{s.label}</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead capture form demo */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your customers see this</h2>
          <p className="text-gray-500 text-sm mb-8">
            This form is embedded on your website or shared as a WhatsApp link. Every submission
            lands directly in your dashboard.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-md">
            {/* Form header bar */}
            <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#25D366" }}
              >
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Werkr Enquiry</p>
                <p className="text-green-300 text-xs mt-0.5">We&apos;ll respond within minutes</p>
              </div>
            </div>
            {/* Form fields */}
            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name</label>
                <input
                  disabled
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                <input
                  disabled
                  placeholder="e.g. 082 000 0000"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Job Type</label>
                <select
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Tiling</option>
                  <option>Painting</option>
                  <option>General</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                <textarea
                  disabled
                  placeholder="Describe the job..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Urgency</label>
                <div className="space-y-2">
                  {["Same day", "This week", "Just getting a quote"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 cursor-not-allowed">
                      <input
                        type="radio"
                        disabled
                        name="urgency"
                        className="accent-[#25D366] cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-500">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                disabled
                className="w-full py-3 rounded-lg text-white text-sm font-semibold cursor-not-allowed opacity-80 transition-opacity"
                style={{ backgroundColor: "#25D366" }}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent leads table */}
      <section className="px-6 pb-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Leads{" "}
            <span className="text-base font-normal text-gray-400">(Mock Data)</span>
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Phone</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Job Type</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Urgency</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Received</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((row, i) => {
                    const firstName = row.name.split(" ")[0];
                    const waText = encodeURIComponent(
                      `Hi ${firstName}, thanks for your enquiry about ${row.jobType}. We'll be in touch shortly!`
                    );
                    const phone = row.phone.replace(/\s/g, "");
                    const waLink = `https://wa.me/27${phone.replace(/^0/, "")}?text=${waText}`;
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">{row.name}</td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.phone}</td>
                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{row.jobType}</td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.urgency}</td>
                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{row.received}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[row.status]}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                            style={{ backgroundColor: "#25D366" }}
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Notification preview */}
      <section className="px-6 pb-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-5 h-5" style={{ color: "#25D366" }} />
            <h2 className="text-2xl font-bold text-gray-900">You get notified instantly</h2>
          </div>
          <div className="max-w-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Notification bar */}
              <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">9:41 AM</span>
                <span className="text-xs text-gray-400">now</span>
              </div>
              {/* Notification body */}
              <div className="px-4 py-4 flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      New Lead — Werkr
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">Just now</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">
                    Thabo M. needs an electrician in Soweto. Urgent.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Push notifications sent to your phone in real time
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl px-8 py-10 text-center text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            <p className="text-lg sm:text-xl font-semibold leading-relaxed max-w-2xl mx-auto">
              Every enquiry captured. Every lead followed up. Automatically.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
