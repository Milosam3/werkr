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

export const jobs: Job[] = [
  {
    id: "JOB-2041",
    client: "Thabo Molefe",
    jobType: "Geyser replacement",
    value: 3200,
    status: "Quoted",
    detail: "Sent 2h ago",
    phone: "27831234567",
  },
  {
    id: "JOB-2042",
    client: "Karen van der Berg",
    jobType: "DB board upgrade",
    value: 5800,
    status: "Quoted",
    detail: "Sent yesterday",
    phone: "27829876543",
  },
  {
    id: "JOB-2043",
    client: "Anele Dlamini",
    jobType: "Burst pipe repair",
    value: 1400,
    status: "Quoted",
    detail: "Sent 3 days ago",
    phone: "27761112233",
  },
  {
    id: "JOB-2044",
    client: "Marco Stemmet",
    jobType: "Bathroom retile",
    value: 12000,
    status: "Accepted",
    detail: "Starts tomorrow",
    phone: "27825554433",
  },
  {
    id: "JOB-2045",
    client: "Priya Naidoo",
    jobType: "Geyser install",
    value: 4500,
    status: "Accepted",
    detail: "Today 2pm",
    phone: "27836667788",
  },
  {
    id: "JOB-2046",
    client: "David Okafor",
    jobType: "Kitchen rewire",
    value: 8200,
    status: "In Progress",
    detail: "Day 2 of 3",
    phone: "27849990011",
  },
  {
    id: "JOB-2047",
    client: "Fatima Adams",
    jobType: "Roof waterproof",
    value: 6800,
    status: "In Progress",
    detail: "Day 1 of 2",
    phone: "27722223344",
  },
  {
    id: "JOB-2048",
    client: "John Botha",
    jobType: "Toilet replacement",
    value: 2200,
    status: "Done",
    detail: "Invoice sent",
    phone: "27813334455",
  },
];

export const clients: Client[] = [
  {
    id: "C001",
    name: "Thabo Molefe",
    phone: "27831234567",
    lastJob: "Geyser replacement",
    totalSpent: 7400,
    jobsCount: 3,
    followUpStatus: "Pending",
  },
  {
    id: "C002",
    name: "Karen van der Berg",
    phone: "27829876543",
    lastJob: "DB board upgrade",
    totalSpent: 14200,
    jobsCount: 4,
    followUpStatus: "Done",
  },
  {
    id: "C003",
    name: "Anele Dlamini",
    phone: "27761112233",
    lastJob: "Burst pipe repair",
    totalSpent: 3600,
    jobsCount: 2,
    followUpStatus: "Overdue",
  },
  {
    id: "C004",
    name: "Marco Stemmet",
    phone: "27825554433",
    lastJob: "Bathroom retile",
    totalSpent: 21500,
    jobsCount: 5,
    followUpStatus: "Done",
  },
  {
    id: "C005",
    name: "Priya Naidoo",
    phone: "27836667788",
    lastJob: "Geyser install",
    totalSpent: 9800,
    jobsCount: 3,
    followUpStatus: "Pending",
  },
  {
    id: "C006",
    name: "David Okafor",
    phone: "27849990011",
    lastJob: "Kitchen rewire",
    totalSpent: 18400,
    jobsCount: 6,
    followUpStatus: "Done",
  },
  {
    id: "C007",
    name: "Fatima Adams",
    phone: "27722223344",
    lastJob: "Roof waterproof",
    totalSpent: 12600,
    jobsCount: 4,
    followUpStatus: "Overdue",
  },
  {
    id: "C008",
    name: "John Botha",
    phone: "27813334455",
    lastJob: "Toilet replacement",
    totalSpent: 5500,
    jobsCount: 2,
    followUpStatus: "Done",
  },
];
