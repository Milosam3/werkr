"use client";

/**
 * app/quote/page.tsx
 * -------------------
 * Quote generator page — updated to call the real /api/generate-quote endpoint.
 *
 * CHANGES vs original:
 *  - Added "Get AI Estimate" button that calls /api/generate-quote
 *  - AI suggestion pre-fills labourHours, labourRate, materialsEstimate
 *  - Shows AI confidence badge + notes below the form
 *  - Loading / error states on the AI button
 *  - All existing manual editing still works exactly as before
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, MessageCircle, Sparkles, Loader2 } from "lucide-react";

interface FormState {
  clientName: string;
  clientPhone: string;
  jobType: string;
  description: string;
  labourHours: string;
  labourRate: string;
  materialsCost: string;
  includeVat: boolean;
  notes: string;
}

interface AiSuggestion {
  labourHours: number;
  labourRate: number;
  materialsEstimate: number;
  notes: string;
  confidence: "high" | "medium" | "low";
}

const confidenceColour: Record<AiSuggestion["confidence"], string> = {
  high: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-red-100 text-red-800",
};

export default function QuotePage() {
  const [form, setForm] = useState<FormState>({
    clientName: "",
    clientPhone: "",
    jobType: "",
    description: "",
    labourHours: "",
    labourRate: "350",
    materialsCost: "",
    includeVat: false,
    notes: "",
  });

  const [generated, setGenerated] = useState(false);
  const [quoteNumber] = useState(
    `QT-${Math.floor(1000 + Math.random() * 9000)}`
  );

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ── AI estimate ────────────────────────────────────────────────────────────

  async function handleAiEstimate() {
    if (!form.description.trim()) {
      setAiError("Add a job description first so the AI has something to work with.");
      return;
    }
    setAiLoading(true);
    setAiError(null);
    setAiSuggestion(null);
    try {
      const res = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobType: form.jobType,
          description: form.description,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setAiError(data.error ?? "AI estimate failed. Fill in manually.");
      } else {
        const s: AiSuggestion = data.suggestion;
        setAiSuggestion(s);
        // Pre-fill the form with the AI suggestion
        setForm((prev) => ({
          ...prev,
          labourHours: String(s.labourHours),
          labourRate: String(s.labourRate),
          materialsCost: String(s.materialsEstimate),
        }));
      }
    } catch {
      setAiError("Network error — please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  // ── Calculations ───────────────────────────────────────────────────────────

  const labourTotal =
    parseFloat(form.labourHours || "0") * parseFloat(form.labourRate || "0");
  const materialsTotal = parseFloat(form.materialsCost || "0");
  const subtotal = labourTotal + materialsTotal;
  const vat = form.includeVat ? subtotal * 0.15 : 0;
  const total = subtotal + vat;

  const issueDate = new Date().toLocaleDateString("en-ZA");
  const validUntil = new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-ZA");

  // ── Quote text (for clipboard / WhatsApp) ─────────────────────────────────

  function buildQuoteText() {
    return `*WERKR QUOTE — ${quoteNumber}*
Issued: ${issueDate} | Valid until: ${validUntil}

Client: ${form.clientName}
Job type: ${form.jobType}
Description: ${form.description}

---
Labour: ${form.labourHours} hrs @ R${form.labourRate}/hr = R${labourTotal.toFixed(2)}
Materials: R${materialsTotal.toFixed(2)}
Subtotal: R${subtotal.toFixed(2)}${form.includeVat ? `\nVAT (15%): R${vat.toFixed(2)}` : ""}
*TOTAL: R${total.toFixed(2)}*
---

Payment: 50% upfront, balance on completion.
${form.notes ? `\nNotes: ${form.notes}` : ""}

Sent via Werkr`;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(buildQuoteText());
  }

  function sendViaWhatsApp() {
    const phone = form.clientPhone.replace(/\D/g, "");
    const encoded = encodeURIComponent(buildQuoteText());
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Quote Generator</h1>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details — or let AI estimate labour &amp; materials for you.
      </p>

      {!generated ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Client */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Client name</Label>
                <Input
                  placeholder="Sipho Ndlovu"
                  value={form.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Phone (with country code)</Label>
                <Input
                  placeholder="27821234567"
                  value={form.clientPhone}
                  onChange={(e) => set("clientPhone", e.target.value)}
                />
              </div>
            </div>

            {/* Job type */}
            <div className="space-y-1">
              <Label>Job type</Label>
              <Select
                value={form.jobType}
                onValueChange={(v) => set("jobType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {["Plumbing", "Electrical", "Tiling", "Painting", "General", "Other"].map(
                    (t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Description + AI button */}
            <div className="space-y-1">
              <Label>Job description</Label>
              <Textarea
                placeholder="e.g. Replace burst geyser in ceiling, install new 150L unit, re-connect pipes and check for leaks"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                onClick={handleAiEstimate}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {aiLoading ? "Estimating…" : "Get AI Estimate"}
              </Button>

              {/* AI result banner */}
              {aiSuggestion && (
                <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-green-800">AI estimate applied</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${confidenceColour[aiSuggestion.confidence]}`}
                    >
                      {aiSuggestion.confidence} confidence
                    </span>
                  </div>
                  <p className="text-green-700">{aiSuggestion.notes}</p>
                  <p className="text-green-600 mt-1 text-xs">
                    You can edit the numbers below before generating the quote.
                  </p>
                </div>
              )}

              {aiError && (
                <p className="mt-2 text-sm text-red-600">{aiError}</p>
              )}
            </div>

            {/* Labour */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Labour hours</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="3"
                  value={form.labourHours}
                  onChange={(e) => set("labourHours", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Hourly rate (R)</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="350"
                  value={form.labourRate}
                  onChange={(e) => set("labourRate", e.target.value)}
                />
              </div>
            </div>

            {/* Materials */}
            <div className="space-y-1">
              <Label>Materials cost (R)</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={form.materialsCost}
                onChange={(e) => set("materialsCost", e.target.value)}
              />
            </div>

            {/* VAT */}
            <div className="flex items-center gap-2">
              <input
                id="vat"
                type="checkbox"
                checked={form.includeVat}
                onChange={(e) => set("includeVat", e.target.checked)}
                className="h-4 w-4 accent-[#25D366]"
              />
              <Label htmlFor="vat">Include VAT (15%)</Label>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label>Notes (optional)</Label>
              <Textarea
                placeholder="e.g. Price valid for 7 days. Call-out fee included."
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={2}
              />
            </div>

            {/* Live subtotal preview */}
            {(labourTotal > 0 || materialsTotal > 0) && (
              <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Labour</span>
                  <span>R{labourTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Materials</span>
                  <span>R{materialsTotal.toFixed(2)}</span>
                </div>
                {form.includeVat && (
                  <div className="flex justify-between text-gray-500">
                    <span>VAT (15%)</span>
                    <span>R{vat.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 border-t pt-1">
                  <span>Total</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button
              className="w-full text-white font-semibold"
              style={{ backgroundColor: "#25D366" }}
              onClick={() => setGenerated(true)}
              disabled={!form.clientName || !form.jobType || total === 0}
            >
              Generate Quote
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* ── Generated quote view ─────────────────────────────────────────── */
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">{quoteNumber}</CardTitle>
              <p className="text-sm text-gray-500">
                Issued {issueDate} · Valid until {validUntil}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGenerated(false)}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{form.clientName}</p>
              <p className="text-sm text-gray-500">{form.clientPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-1">
                {form.jobType}
              </p>
              <p className="text-sm text-gray-600">{form.description}</p>
            </div>

            {/* Line items */}
            <div className="rounded-lg border divide-y text-sm">
              <div className="flex justify-between px-4 py-2">
                <span>Labour — {form.labourHours} hrs @ R{form.labourRate}/hr</span>
                <span>R{labourTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span>Materials</span>
                <span>R{materialsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              {form.includeVat && (
                <div className="flex justify-between px-4 py-2 text-gray-500">
                  <span>VAT (15%)</span>
                  <span>R{vat.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-2 font-bold text-gray-900 bg-gray-50">
                <span>TOTAL</span>
                <span>R{total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Payment terms: 50% upfront, balance on completion.
            </p>
            {form.notes && (
              <p className="text-xs text-gray-500">Notes: {form.notes}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button
                className="flex-1 gap-2 text-white"
                style={{ backgroundColor: "#25D366" }}
                onClick={sendViaWhatsApp}
              >
                <MessageCircle className="w-4 h-4" />
                Send via WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
