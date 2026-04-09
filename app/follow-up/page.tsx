import { MessageCircle, Clock, TrendingUp, Zap, CheckCircle } from "lucide-react";

const sequence = [
  {
    step: 1,
    timing: "1 hour",
    timingDetail: "after quote sent",
    message:
      "Hi [Client Name], just checking you received our quote for [Job Type]. Let us know if you have any questions! 👍",
  },
  {
    step: 2,
    timing: "24 hours",
    timingDetail: "after quote sent",
    message:
      "Hi [Client Name], following up on our quote for [Job Type]. We'd love to help — shall we go ahead?",
  },
  {
    step: 3,
    timing: "3 days",
    timingDetail: "after quote sent",
    message:
      "Hi [Client Name], last follow-up on our quote for [Job Type]. Quote valid for 7 days. Ready when you are!",
  },
];

type FollowUpStatus = "Pending" | "Sent" | "Converted" | "No Response";

const mockFollowUps: {
  client: string;
  jobType: string;
  quoteSent: string;
  nextFollowUp: string;
  status: FollowUpStatus;
}[] = [
  { client: "Sipho Dlamini", jobType: "Geyser Replacement", quoteSent: "5 Apr", nextFollowUp: "6 Apr 09:00", status: "Pending" },
  { client: "Priya Naidoo", jobType: "Electrical Fault", quoteSent: "4 Apr", nextFollowUp: "Sent", status: "Sent" },
  { client: "Johan van Wyk", jobType: "Roof Repair", quoteSent: "2 Apr", nextFollowUp: "—", status: "Converted" },
  { client: "Thabo Mokoena", jobType: "Plumbing Leak", quoteSent: "1 Apr", nextFollowUp: "—", status: "No Response" },
  { client: "Fatima Patel", jobType: "Bathroom Retile", quoteSent: "3 Apr", nextFollowUp: "7 Apr 10:00", status: "Pending" },
  { client: "Riaan Botha", jobType: "Gate Motor Install", quoteSent: "31 Mar", nextFollowUp: "—", status: "Converted" },
  { client: "Nomsa Khumalo", jobType: "Painting — Interior", quoteSent: "30 Mar", nextFollowUp: "—", status: "Sent" },
  { client: "Gareth Louw", jobType: "Solar Panel Quote", quoteSent: "28 Mar", nextFollowUp: "—", status: "No Response" },
];

const statusStyle: Record<FollowUpStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Sent: "bg-gray-100 text-gray-600",
  Converted: "bg-green-100 text-green-700",
  "No Response": "bg-red-100 text-red-700",
};

const stats = [
  { icon: <MessageCircle className="w-5 h-5" style={{ color: "#25D366" }} />, label: "Follow-ups Sent This Month", value: "47" },
  { icon: <TrendingUp className="w-5 h-5" style={{ color: "#25D366" }} />, label: "Conversion Rate", value: "34%" },
  { icon: <CheckCircle className="w-5 h-5" style={{ color: "#25D366" }} />, label: "Jobs Won via Follow-up", value: "16" },
  { icon: <Clock className="w-5 h-5" style={{ color: "#25D366" }} />, label: "Average Response Time", value: "6 hours" },
];

export default function FollowUpPage() {
  return (
    <main className="flex-1 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Auto Follow-ups
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Never lose a job to silence. Werkr follows up with clients automatically so you don&apos;t have to.
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

      {/* Sequence builder */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-5 h-5" style={{ color: "#25D366" }} />
            <h2 className="text-2xl font-bold text-gray-900">Follow-up Sequence</h2>
          </div>
          <div className="space-y-4">
            {sequence.map((item, idx) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-start gap-5"
              >
                {/* Step + connector */}
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    {item.step}
                  </div>
                  {idx < sequence.length - 1 && (
                    <div className="hidden sm:block w-px h-6 bg-gray-200 mx-auto" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Timing badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                    >
                      <Clock className="w-3 h-3" />
                      {item.timing}
                    </span>
                    <span className="text-xs text-gray-400">{item.timingDetail}</span>
                  </div>

                  {/* WhatsApp bubble */}
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 leading-relaxed max-w-md"
                    style={{ backgroundColor: "#DCF8C6" }}
                  >
                    {item.message}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex sm:flex-col items-center gap-3 flex-shrink-0">
                  <button
                    disabled
                    className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 cursor-not-allowed opacity-60"
                  >
                    Edit
                  </button>
                  {/* Toggle */}
                  <div
                    className="w-10 h-6 rounded-full flex items-center px-1 cursor-not-allowed"
                    style={{ backgroundColor: "#25D366" }}
                    title="Enabled"
                  >
                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active follow-ups table */}
      <section className="px-6 pb-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Active Follow-ups{" "}
            <span className="text-base font-normal text-gray-400">(Mock Data)</span>
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Client</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Job Type</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Quote Sent</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Next Follow-up</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFollowUps.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">{row.client}</td>
                      <td className="px-5 py-4 text-gray-600">{row.jobType}</td>
                      <td className="px-5 py-4 text-gray-500">{row.quoteSent}</td>
                      <td className="px-5 py-4 text-gray-500">{row.nextFollowUp}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              Follow-ups are sent automatically via WhatsApp the moment a quote is generated. No setup needed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
