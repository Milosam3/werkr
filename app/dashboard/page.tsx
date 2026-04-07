import { jobs, clients, type JobStatus } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  FileText,
  TrendingUp,
  DollarSign,
  MessageCircle,
} from "lucide-react";

const COLUMNS: { status: JobStatus; label: string }[] = [
  { status: "Quoted", label: "Quoted" },
  { status: "Accepted", label: "Accepted" },
  { status: "In Progress", label: "In Progress" },
  { status: "Done", label: "Done / Invoice" },
];

const statusColors: Record<JobStatus, string> = {
  Quoted: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Done: "bg-green-100 text-green-800",
};

const followUpColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Done: "bg-green-100 text-green-800",
  Overdue: "bg-red-100 text-red-800",
};

const stats = [
  {
    label: "Active Jobs",
    value: "8",
    icon: <Briefcase className="w-5 h-5 text-gray-500" />,
  },
  {
    label: "Quotes Sent This Week",
    value: "12",
    icon: <FileText className="w-5 h-5 text-gray-500" />,
  },
  {
    label: "Conversion Rate",
    value: "67%",
    icon: <TrendingUp className="w-5 h-5 text-gray-500" />,
  },
  {
    label: "Outstanding Revenue",
    value: "R24,500",
    icon: <DollarSign className="w-5 h-5 text-gray-500" />,
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Cape Plumbing Co. — Live overview
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">
                    {s.label}
                  </span>
                  {s.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job pipeline */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Job Pipeline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {COLUMNS.map((col) => {
              const colJobs = jobs.filter((j) => j.status === col.status);
              return (
                <div key={col.status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      {col.label}
                    </span>
                    <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                      {colJobs.length}
                    </span>
                  </div>
                  {colJobs.map((job) => (
                    <Card key={job.id} className="shadow-sm">
                      <CardContent className="pt-4 pb-3 px-4">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className="text-sm font-semibold text-gray-900 leading-tight">
                            {job.jobType}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColors[job.status]}`}
                          >
                            {job.status === "Done" ? "✅ Done" : job.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {job.client}
                        </p>
                        <p className="text-sm font-bold text-gray-900 mb-1">
                          R{job.value.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mb-3">
                          {job.detail}
                        </p>
                        <a
                          href={`https://wa.me/${job.phone}?text=${encodeURIComponent(`Hi ${job.client.split(" ")[0]}, following up on your ${job.jobType} job (${job.id}). Let me know if you have any questions!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md text-white transition-opacity hover:opacity-90 w-full justify-center"
                          style={{ backgroundColor: "#25D366" }}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp Client
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* CRM Table */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Client CRM
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Last Job</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead className="text-center">Jobs</TableHead>
                      <TableHead>Follow-up</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          +{c.phone}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {c.lastJob}
                        </TableCell>
                        <TableCell className="font-semibold text-sm">
                          R{c.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {c.jobsCount}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${followUpColors[c.followUpStatus]}`}
                          >
                            {c.followUpStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/${c.phone}?text=${encodeURIComponent(`Hi ${c.name.split(" ")[0]}, just checking in. Hope everything is still working well after your ${c.lastJob}. Let us know if you need anything!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md text-white font-medium transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "#25D366" }}
                          >
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
