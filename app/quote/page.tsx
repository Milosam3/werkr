"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, MessageCircle, Loader2 } from "lucide-react";

const JOB_TYPES = [
  "Plumbing",
  "Electrical",
  "Tiling",
  "Painting",
  "General",
  "Other",
];

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-6 mb-2">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^---$/gm, '<hr class="my-3 border-gray-200" />')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '<br class="my-2" />')
    .replace(/\n/g, "<br />");
}

export default function QuotePage() {
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    jobType: "",
    jobDescription: "",
    labourHours: "",
    labourRate: "350",
    materialsCost: "",
    includeVat: false,
    notes: "",
  });
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuote("");
    try {
      const res = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate quote");
      setQuote(data.quote);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const labourTotal =
    parseFloat(form.labourHours || "0") * parseFloat(form.labourRate || "0");
  const subtotal = labourTotal + parseFloat(form.materialsCost || "0");
  const vatAmount = form.includeVat ? subtotal * 0.15 : 0;
  const total = subtotal + vatAmount;

  const whatsappText = encodeURIComponent(
    `Hi ${form.clientName || "there"}, please find your quote attached.\n\nJob: ${form.jobType} — ${form.jobDescription}\nTotal: R${total.toFixed(2)}${form.includeVat ? " (incl. VAT)" : ""}\n\nPayment terms: 50% upfront, balance on completion.\nValid for 7 days.\n\nThank you!`
  );

  return (
    <main className="flex-1 bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Quote Generator
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Fill in the job details — Werkr generates a professional quote via AI.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={form.clientName}
                      onChange={(e) => set("clientName", e.target.value)}
                      placeholder="Thabo Molefe"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="clientPhone">Client Phone</Label>
                    <Input
                      id="clientPhone"
                      value={form.clientPhone}
                      onChange={(e) => set("clientPhone", e.target.value)}
                      placeholder="082 555 1234"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Job Type</Label>
                  <Select
                    value={form.jobType}
                    onValueChange={(v) => set("jobType", v ?? "")}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={form.jobDescription}
                    onChange={(e) => set("jobDescription", e.target.value)}
                    placeholder="Describe the work to be done..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="labourHours">Labour Hours</Label>
                    <Input
                      id="labourHours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={form.labourHours}
                      onChange={(e) => set("labourHours", e.target.value)}
                      placeholder="4"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="labourRate">Rate per Hour (R)</Label>
                    <Input
                      id="labourRate"
                      type="number"
                      min="0"
                      value={form.labourRate}
                      onChange={(e) => set("labourRate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="materialsCost">Materials Cost (R)</Label>
                  <Input
                    id="materialsCost"
                    type="number"
                    min="0"
                    value={form.materialsCost}
                    onChange={(e) => set("materialsCost", e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="includeVat"
                    className="w-4 h-4 accent-[#25D366]"
                    checked={form.includeVat}
                    onChange={(e) => set("includeVat", e.target.checked)}
                  />
                  <Label htmlFor="includeVat" className="cursor-pointer">
                    Include VAT (15%)
                  </Label>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Any additional notes..."
                    rows={2}
                  />
                </div>

                {/* Live cost preview */}
                <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1 border border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Labour</span>
                    <span>R{labourTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Materials</span>
                    <span>R{parseFloat(form.materialsCost || "0").toFixed(2)}</span>
                  </div>
                  {form.includeVat && (
                    <div className="flex justify-between text-gray-600">
                      <span>VAT (15%)</span>
                      <span>R{vatAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-1 mt-1">
                    <span>Total</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold"
                  style={{ backgroundColor: "#25D366" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Quote"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quote preview */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {quote ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Generated Quote</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="text-xs"
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <a
                        href={`https://wa.me/${form.clientPhone.replace(/\D/g, "")}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="text-xs text-white"
                          style={{ backgroundColor: "#25D366" }}
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1" />
                          Send via WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm max-w-none text-gray-800 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(quote) }}
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="flex-1 bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  <MessageCircle
                    className="w-6 h-6"
                    style={{ color: "#25D366" }}
                  />
                </div>
                <p className="text-gray-500 text-sm">
                  Fill in the form and click{" "}
                  <strong>Generate Quote</strong> to create a professional
                  quote powered by Claude AI.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
