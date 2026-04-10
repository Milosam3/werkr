/**
 * lib/airtable.ts
 * ---------------
 * Airtable service layer for Werkr.
 *
 * DROP-IN REPLACEMENT for lib/mockData.ts
 *
 * SETUP:
 *  1. Create an Airtable base with three tables: "Jobs", "Clients", "Leads"
 *  2. Add to .env.local:
 *       AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
 *       AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
 *  3. Table field names must match the Field maps below (or adjust them here).
 *
 * USAGE (replaces mockData imports):
 *   import { getJobs, getClients, getLeads, createJob, updateJobStatus } from "@/lib/airtable";
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type JobStatus = "Quoted" | "Accepted" | "In Progress" | "Done";

export interface Job {
  id: string;
  client: string;
  jobType: string;
  value: number;
  status: JobStatus;
  detail: string;
  phone: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  lastJob: string;
  totalSpent: number;
  jobsCount: number;
  followUpStatus: "Pending" | "Done" | "Overdue";
}

export type LeadStatus = "New" | "Contacted" | "Quoted" | "Converted" | "Lost";
export type LeadUrgency = "Emergency" | "This week" | "Flexible";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  jobType: string;
  description: string;
  urgency: LeadUrgency;
  status: LeadStatus;
  createdAt: string;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const BASE_URL = "https://api.airtable.com/v0";

function getConfig() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) {
    throw new Error(
      "Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID in environment variables."
    );
  }
  return { apiKey, baseId };
}

async function airtableFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const { apiKey, baseId } = getConfig();
  const url = `${BASE_URL}/${baseId}/${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    // Next.js: revalidate every 60 s so dashboard stays fresh without SSR on every request
    next: { revalidate: 60 },
  });
}

// ─── Field maps (Airtable column name → our type key) ────────────────────────
// Adjust these if your Airtable column names differ.

const JOB_FIELDS = {
  client: "Client",
  jobType: "Job Type",
  value: "Value",
  status: "Status",
  detail: "Detail",
  phone: "Phone",
};

const CLIENT_FIELDS = {
  name: "Name",
  phone: "Phone",
  lastJob: "Last Job",
  totalSpent: "Total Spent",
  jobsCount: "Jobs Count",
  followUpStatus: "Follow Up Status",
};

const LEAD_FIELDS = {
  name: "Name",
  phone: "Phone",
  jobType: "Job Type",
  description: "Description",
  urgency: "Urgency",
  status: "Status",
  createdAt: "Created At",
};

// ─── Jobs ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recordToJob(record: any): Job {
  const f = record.fields;
  return {
    id: record.id,
    client: f[JOB_FIELDS.client] ?? "",
    jobType: f[JOB_FIELDS.jobType] ?? "",
    value: Number(f[JOB_FIELDS.value] ?? 0),
    status: (f[JOB_FIELDS.status] as JobStatus) ?? "Quoted",
    detail: f[JOB_FIELDS.detail] ?? "",
    phone: f[JOB_FIELDS.phone] ?? "",
  };
}

export async function getJobs(): Promise<Job[]> {
  const res = await airtableFetch(
    `Jobs?sort%5B0%5D%5Bfield%5D=Status&sort%5B0%5D%5Bdirection%5D=asc`
  );
  if (!res.ok) throw new Error(`Airtable getJobs failed: ${res.statusText}`);
  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.records ?? []).map((r: any) => recordToJob(r));
}

export async function createJob(
  job: Omit<Job, "id">
): Promise<Job> {
  const res = await airtableFetch("Jobs", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        [JOB_FIELDS.client]: job.client,
        [JOB_FIELDS.jobType]: job.jobType,
        [JOB_FIELDS.value]: job.value,
        [JOB_FIELDS.status]: job.status,
        [JOB_FIELDS.detail]: job.detail,
        [JOB_FIELDS.phone]: job.phone,
      },
    }),
  });
  if (!res.ok) throw new Error(`Airtable createJob failed: ${res.statusText}`);
  const data = await res.json();
  return recordToJob(data);
}

export async function updateJobStatus(
  id: string,
  status: JobStatus
): Promise<Job> {
  const res = await airtableFetch(`Jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      fields: { [JOB_FIELDS.status]: status },
    }),
  });
  if (!res.ok)
    throw new Error(`Airtable updateJobStatus failed: ${res.statusText}`);
  const data = await res.json();
  return recordToJob(data);
}

// ─── Clients ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recordToClient(record: any): Client {
  const f = record.fields;
  return {
    id: record.id,
    name: f[CLIENT_FIELDS.name] ?? "",
    phone: f[CLIENT_FIELDS.phone] ?? "",
    lastJob: f[CLIENT_FIELDS.lastJob] ?? "",
    totalSpent: Number(f[CLIENT_FIELDS.totalSpent] ?? 0),
    jobsCount: Number(f[CLIENT_FIELDS.jobsCount] ?? 0),
    followUpStatus:
      (f[CLIENT_FIELDS.followUpStatus] as Client["followUpStatus"]) ??
      "Pending",
  };
}

export async function getClients(): Promise<Client[]> {
  const res = await airtableFetch(
    `Clients?sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=asc`
  );
  if (!res.ok)
    throw new Error(`Airtable getClients failed: ${res.statusText}`);
  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.records ?? []).map((r: any) => recordToClient(r));
}

export async function updateFollowUpStatus(
  id: string,
  status: Client["followUpStatus"]
): Promise<Client> {
  const res = await airtableFetch(`Clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      fields: { [CLIENT_FIELDS.followUpStatus]: status },
    }),
  });
  if (!res.ok)
    throw new Error(
      `Airtable updateFollowUpStatus failed: ${res.statusText}`
    );
  const data = await res.json();
  return recordToClient(data);
}

// ─── Leads ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recordToLead(record: any): Lead {
  const f = record.fields;
  return {
    id: record.id,
    name: f[LEAD_FIELDS.name] ?? "",
    phone: f[LEAD_FIELDS.phone] ?? "",
    jobType: f[LEAD_FIELDS.jobType] ?? "",
    description: f[LEAD_FIELDS.description] ?? "",
    urgency: (f[LEAD_FIELDS.urgency] as LeadUrgency) ?? "Flexible",
    status: (f[LEAD_FIELDS.status] as LeadStatus) ?? "New",
    createdAt: f[LEAD_FIELDS.createdAt] ?? new Date().toISOString(),
  };
}

export async function getLeads(): Promise<Lead[]> {
  const res = await airtableFetch(
    `Leads?sort%5B0%5D%5Bfield%5D=Created+At&sort%5B0%5D%5Bdirection%5D=desc`
  );
  if (!res.ok) throw new Error(`Airtable getLeads failed: ${res.statusText}`);
  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.records ?? []).map((r: any) => recordToLead(r));
}

export async function createLead(
  lead: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const res = await airtableFetch("Leads", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        [LEAD_FIELDS.name]: lead.name,
        [LEAD_FIELDS.phone]: lead.phone,
        [LEAD_FIELDS.jobType]: lead.jobType,
        [LEAD_FIELDS.description]: lead.description,
        [LEAD_FIELDS.urgency]: lead.urgency,
        [LEAD_FIELDS.status]: lead.status,
        [LEAD_FIELDS.createdAt]: new Date().toISOString(),
      },
    }),
  });
  if (!res.ok)
    throw new Error(`Airtable createLead failed: ${res.statusText}`);
  const data = await res.json();
  return recordToLead(data);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead> {
  const res = await airtableFetch(`Leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      fields: { [LEAD_FIELDS.status]: status },
    }),
  });
  if (!res.ok)
    throw new Error(`Airtable updateLeadStatus failed: ${res.statusText}`);
  const data = await res.json();
  return recordToLead(data);
}
