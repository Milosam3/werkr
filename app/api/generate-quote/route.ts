/**
 * app/api/generate-quote/route.ts
 * --------------------------------
 * AI-powered quote suggestion endpoint using the Anthropic SDK.
 *
 * REPLACES the stub that just returned { success: true }.
 *
 * REQUEST (POST JSON):
 * {
 *   jobType: string;        // e.g. "Plumbing"
 *   description: string;   // free-text job description from the tradesperson
 *   location?: string;     // e.g. "Cape Town" — influences regional pricing
 * }
 *
 * RESPONSE (JSON):
 * {
 *   success: true;
 *   suggestion: {
 *     labourHours: number;
 *     labourRate: number;       // ZAR per hour
 *     materialsEstimate: number; // ZAR
 *     notes: string;            // human-readable reasoning / caveats
 *     confidence: "high" | "medium" | "low";
 *   }
 * }
 *
 * SETUP:
 *   Add to .env.local:
 *     ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXX
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface QuoteSuggestion {
  labourHours: number;
  labourRate: number;
  materialsEstimate: number;
  notes: string;
  confidence: "high" | "medium" | "low";
}

const SYSTEM_PROMPT = `You are a pricing assistant for South African tradespeople (plumbers, electricians, tilers, painters, general contractors).

Your job is to analyse a job description and return a JSON object with realistic South African pricing estimates.

Pricing guidelines (2024–2025 South Africa):
- Plumbing labour: R350–R650/hr (standard residential), R700–R1200/hr (emergency/after-hours)
- Electrical labour: R400–R700/hr (licensed), emergency rates ~1.5x
- Tiling: R250–R450/hr or R180–R350/m² for labour
- Painting: R200–R350/hr or R25–R60/m² depending on prep
- General: R250–R450/hr

Always respond with ONLY valid JSON in this exact shape — no markdown, no explanation outside the JSON:
{
  "labourHours": <number>,
  "labourRate": <number>,
  "materialsEstimate": <number>,
  "notes": "<one or two sentences explaining your estimate and any assumptions>",
  "confidence": "<high|medium|low>"
}

Use "low" confidence when the description is vague and a site visit is recommended.
Use "medium" when the scope is mostly clear but some details are missing.
Use "high" when the job scope is well defined.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobType, description, location } = body as {
      jobType?: string;
      description?: string;
      location?: string;
    };

    if (!description || description.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Job description is required." },
        { status: 400 }
      );
    }

    const userMessage = [
      jobType ? `Job type: ${jobType}` : null,
      location ? `Location: ${location}` : null,
      `Job description: ${description.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Fast + cheap — ideal for this kind of structured extraction
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    // Extract text content from the response
    const raw = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("");

    let suggestion: QuoteSuggestion;
    try {
      suggestion = JSON.parse(raw);
    } catch {
      // Claude returned something unexpected — return a safe fallback
      console.error("Failed to parse Claude response:", raw);
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not parse AI response. Please fill in the quote manually.",
        },
        { status: 502 }
      );
    }

    // Validate shape
    if (
      typeof suggestion.labourHours !== "number" ||
      typeof suggestion.labourRate !== "number" ||
      typeof suggestion.materialsEstimate !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "AI returned incomplete data. Please fill in the quote manually.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, suggestion });
  } catch (err) {
    console.error("generate-quote error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
