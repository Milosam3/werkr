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
import { Copy, MessageCircle } from "lucide-react";

const JOB_TYPES = [
  "Plumbing",
  "Electrical",
  "Tiling",
  "Painting",
  "General",
  "Other",
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface QuoteMeta {
  quoteNumber: string;
  dateIssued: string;
  validUntil: string;
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
  const [quoteMeta, setQuoteMeta] = useState<QuoteMeta | null>(null);
  const [copied, setCopied] = useState(false);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const labourHoursNum = parseFloat(form.labourHours || "0");
  const labourRateNum = parseFloat(form.labourRate || "0");
  const labourTotal = labourHoursNum * labourRateNum;
  const materialsCostNum = parseFloat(form.materialsCost || "0");
  const subtotal = labourTotal + materialsCostNum;
  const vatAmount = form.includeVat ? subtotal * 0.15 : 0;
  const total = subtotal + vatAmount;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const quoteNumber = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const validUntilDate = new Date(now);
    validUntilDate.setDate(validUntilDate.getDate() + 7);
    setQuoteMeta({
      quoteNumber,
      dateIssued: formatDate(now),
      validUntil: formatDate(validUntilDate),
    });
  }

  function getPlainText(): string {
    if (!quoteMeta) return "";
    return [
      `WERKR — Professional Quote`,
      `Quote No: ${quoteMeta.quoteNumber}`,
      `Date Issued: ${quoteMeta.dateIssued}`,
      `Valid Until: ${quoteMeta.validUntil}`,
      ``,
      `Client: ${form.clientName}`,
      `Phone: ${form.clientPhone}`,
      `Job Type: ${form.jobType}`,
      `Description: ${form.jobDescription}`,
      ``,
      `ITEMISED BREAKDOWN`,
      `Labour: ${form.labourHours} hrs @ R${form.labourRate}/hr = R${labourTotal.toFixed(2)}`,
      `Materials: R${materialsCostNum.toFixed(2)}`,
      `Subtotal: R${subtotal.toFixed(2)}`,
      ...(form.includeVat ? [`VAT (15%): R${vatAmount.toFixed(2)}`] : []),
      `TOTAL: R${total.toFixed(2)}`,
      ``,
      `Payment Terms: 50% upfront, balance on completion.`,
      `Thank you for your business. This quote is valid for 7 days.`,
      ...(form.notes ? [``, `Notes: ${form.notes}`] : []),
    ].join("\n");
  }

  function handleCopy() {
    navigator.clipboard.writeText(getPlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappText = encodeURIComponent(
    `Hi ${form.clientName || "there"}, please find your quote summary below.\n\nQuote: ${quoteMeta?.quoteNumber ?? ""}\nJob: ${form.jobType} — ${form.jobDescription}\nTotal: R${total.toFixed(2)}${form.includeVat ? " (incl. VAT)" : ""}\n\nPayment terms: 50% upfront, balance on completion.\nValid until: ${quoteMeta?.validUntil ?? ""}\n\nThank you for your business!`
  );

  return (
    <main className="flex-1 bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Quote Generator
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Fill in the job details to generate a professional quote instantly.
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
                    <span>R{materialsCostNum.toFixed(2)}</span>
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
                  className="w-full text-white font-semibold"
                  style={{ backgroundColor: "#25D366" }}
                >
                  Generate Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quote card */}
          <div>
            {quoteMeta ? (
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-7 pt-7 pb-5 border-b border-gray-100">
                  <p className="text-[9px] font-bold tracking-[0.18em] text-gray-400 uppercase mb-4">
                    WERKR
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Quote
                      </h2>
                      <p className="text-sm font-medium text-gray-400 mt-0.5">
                        {quoteMeta.quoteNumber}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500 space-y-1 pt-1">
                      <p>
                        Issued:{" "}
                        <span className="text-gray-800 font-medium">
                          {quoteMeta.dateIssued}
                        </span>
                      </p>
                      <p>
                        Valid until:{" "}
                        <span className="text-gray-800 font-medium">
                          {quoteMeta.validUntil}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Client + job type */}
                <div className="px-7 py-5 border-b border-gray-100 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                      Prepared For
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {form.clientName}
                    </p>
                    <p className="text-sm text-gray-500">{form.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                      Job Type
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {form.jobType}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="px-7 py-5 border-b border-gray-100">
                  <p className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                    Description of Work
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {form.jobDescription}
                  </p>
                </div>

                {/* Itemised table */}
                <div className="px-7 py-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase pb-3">
                          Item
                        </th>
                        <th className="text-right text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase pb-3">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-50">
                        <td className="py-2.5 text-gray-700">
                          Labour — {form.labourHours} hrs @ R{form.labourRate}
                          /hr
                        </td>
                        <td className="py-2.5 text-right text-gray-700 tabular-nums">
                          R{labourTotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-50">
                        <td className="py-2.5 text-gray-700">Materials</td>
                        <td className="py-2.5 text-right text-gray-700 tabular-nums">
                          R{materialsCostNum.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2.5 text-gray-500">Subtotal</td>
                        <td className="py-2.5 text-right text-gray-500 tabular-nums">
                          R{subtotal.toFixed(2)}
                        </td>
                      </tr>
                      {form.includeVat && (
                        <tr className="border-b border-gray-200">
                          <td className="py-2.5 text-gray-500">VAT (15%)</td>
                          <td className="py-2.5 text-right text-gray-500 tabular-nums">
                            R{vatAmount.toFixed(2)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr
                        style={{
                          borderTop: "2px solid #25D366",
                        }}
                      >
                        <td className="pt-4 pb-1 font-bold text-base text-gray-900 tracking-wide">
                          TOTAL
                        </td>
                        <td
                          className="pt-4 pb-1 text-right font-bold text-xl tabular-nums"
                          style={{ color: "#25D366" }}
                        >
                          R{total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Notes */}
                {form.notes && (
                  <div className="px-7 pb-5">
                    <p className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                      Notes
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {form.notes}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="px-7 py-5 bg-gray-50 border-t border-gray-100 space-y-1">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Payment Terms:
                    </span>{" "}
                    50% upfront, balance on completion.
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    Thank you for your business. This quote is valid for 7 days.
                  </p>
                </div>

                {/* Actions */}
                <div className="px-7 py-5 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex-1 text-xs h-9"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    {copied ? "Copied!" : "Copy Quote"}
                  </Button>
                  <a
                    href={`https://wa.me/${form.clientPhone.replace(/\D/g, "")}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full text-xs h-9 text-white font-semibold"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                      Send via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
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
                  <strong>Generate Quote</strong> to create a professional quote
                  instantly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
