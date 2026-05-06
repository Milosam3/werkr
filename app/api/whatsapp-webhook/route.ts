import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const META_TOKEN = process.env.META_WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID;
const OWNER_PHONE = "27828203489";

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Leads`;
const WA_URL = `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`;

async function sendMessage(to: string, body: string) {
  await fetch(WA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${META_TOKEN}` },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body } }),
  });
}

async function findLead(phone: string) {
  const res = await fetch(`${AIRTABLE_URL}?filterByFormula={Phone}="${phone}"`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });
  const data = await res.json();
  return data.records?.[0] || null;
}

async function createLead(name: string, phone: string) {
  await fetch(AIRTABLE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: { Name: name, Phone: phone, Status: "New", Created: new Date().toISOString().split("T")[0] } }),
  });
}

async function updateLeadStatus(recordId: string, status: string) {
  await fetch(`${AIRTABLE_URL}/${recordId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: { Status: status } }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0]?.value;
    const message = change?.messages?.[0];
    const contact = change?.contacts?.[0];

    if (!message || message.type !== "text") return NextResponse.json({ status: "ignored" });

    const phone = message.from;
    const text = message.text.body.trim();
    const name = contact?.profile?.name || "Customer";

    if (text.toLowerCase() === "#takeover") {
      const lead = await findLead(phone);
      if (lead) await updateLeadStatus(lead.id, "Human");
      return NextResponse.json({ status: "handoff" });
    }

    if (text.toLowerCase() === "#bot") {
      const lead = await findLead(phone);
      if (lead) await updateLeadStatus(lead.id, "Contacted");
      return NextResponse.json({ status: "bot_restored" });
    }

    const existingLead = await findLead(phone);

    if (existingLead?.fields?.Status === "Human") {
      await sendMessage(OWNER_PHONE, `💬 ${name} (${phone}) replied:\n"${text}"`);
      return NextResponse.json({ status: "human_mode" });
    }

    if (existingLead) {
      await sendMessage(phone, `Welcome back ${name}! 👋 What can we help you with today?\n\nDescribe the job and we'll get you a quote quickly.`);
      await sendMessage(OWNER_PHONE, `🔄 Returning: ${name} (${phone})\n"${text}"`);
      return NextResponse.json({ status: "returning" });
    }

    await createLead(name, phone);
    await sendMessage(phone, `Hi ${name}! 👋 Thanks for reaching out to Fiksr.\n\nTo get you a quote:\n1️⃣ What's the job?\n2️⃣ Where are you located?\n3️⃣ When do you need it done?`);
    await sendMessage(OWNER_PHONE, `🔔 New lead!\nName: ${name}\nPhone: ${phone}\nMessage: "${text}"\n\nReply #takeover to handle manually.`);

    return NextResponse.json({ status: "new_lead" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === "fiksr_webhook_verify") {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
