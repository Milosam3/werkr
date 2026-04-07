import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientName,
      clientPhone,
      jobType,
      jobDescription,
      labourHours,
      labourRate,
      materialsCost,
      includeVat,
      notes,
    } = body;

    const labourTotal = labourHours * labourRate;
    const subtotal = labourTotal + parseFloat(materialsCost || 0);
    const vat = includeVat ? subtotal * 0.15 : 0;
    const total = subtotal + vat;

    const userPrompt = `Generate a professional trade quote for:
- Client: ${clientName}
- Phone: ${clientPhone}
- Job Type: ${jobType}
- Description: ${jobDescription}
- Labour: ${labourHours} hours @ R${labourRate}/hr = R${labourTotal.toFixed(2)}
- Materials: R${parseFloat(materialsCost || 0).toFixed(2)}
- Subtotal: R${subtotal.toFixed(2)}
${includeVat ? `- VAT (15%): R${vat.toFixed(2)}` : "- VAT: Not applicable"}
- TOTAL: R${total.toFixed(2)}
${notes ? `- Additional notes: ${notes}` : ""}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are a professional quote generator for South African tradespeople.
Generate a formal, professional trade quote based on the job details provided.
Include: quote number (random 4 digits), date, itemised breakdown of labour
and materials, subtotal, VAT if applicable, total, payment terms (50% upfront,
balance on completion), validity (7 days), and a professional sign-off.
Format it cleanly using markdown. South African Rand (R) currency.`,
      messages: [{ role: "user", content: userPrompt }],
    });

    const quoteText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ quote: quoteText });
  } catch (error) {
    console.error("Quote generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}
