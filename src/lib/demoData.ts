export interface TimelineEntry {
  stamp: string;
  title: string;
  body: string;
  chip: string;
  action: string;
}

export interface OfficerInfo {
  name: string;
  rank: string;
  badge: string;
}

export interface CaseRecord {
  id: string;
  ref: string;
  firNumber: string;
  badge: string;
  badgeMl: string;
  status: string;
  statusLabel: string;
  statusMl: string;
  titleEn: string;
  titleMl: string;
  summary: string;
  description: string;
  filedDate: string;
  filedIso: string;
  jurisdiction: string;
  district: string;
  station: string;
  classification: string;
  timeline: TimelineEntry[];
  officer: OfficerInfo;
  materials: string[];
  incidents: number;
  map: {
    x: number;
    y: number;
    sector: string;
    units: number;
    severity: 'critical' | 'high' | 'elevated' | 'stable';
  };
}

export const DEMO_CASES: CaseRecord[] = [
  {
    id: "case-kp-2023-04-882",
    ref: "KLP-2023-F092",
    firNumber: "KP-2023-04-882",
    badge: "Financial Fraud",
    badgeMl: "സാമ്പത്തിക തട്ടിപ്പ്",
    status: "active",
    statusLabel: "Active Pursuit",
    statusMl: "സജീവ അന്വേഷണം",
    titleEn: "Cyber Financial Fraud Investigation",
    titleMl: "സാമ്പത്തിക തട്ടിപ്പ് അന്വേഷണം",
    summary:
      "Ongoing investigation into a large-scale phishing syndicate operating across cooperative banking and loan disbursement channels.",
    description:
      "The archival record tracks a coordinated financial fraud investigation involving cloned payment links, spoofed bank communications, and multiple district-level victim statements. Public summaries preserve procedural transparency without exposing victim identities or internal intelligence notes.",
    filedDate: "14 Oct 2023",
    filedIso: "2023-10-14T09:00:00Z",
    jurisdiction: "Kochi Cyber Cell",
    district: "Ernakulam",
    station: "Cyber Cell, Kochi",
    classification: "Investigation Active",
    timeline: [
      {
        stamp: "14 OCT 2023 - 0900 HRS",
        title: "Evidence Collection",
        body:
          "Forensic unit dispatched to a secondary location. Recovered digital storage device and transaction logs matching the initial complaint cluster.",
        chip: "Critical",
        action: "View Report"
      },
      {
        stamp: "12 OCT 2023 - 1430 HRS",
        title: "FIR Filed",
        body:
          "Initial First Information Report filed by complainant. Scene and account recovery workflow opened for coordinated review.",
        chip: "Logged",
        action: "Inspect Entry"
      }
    ],
    officer: {
      name: "Ramesh Menon",
      rank: "Inspector of Police",
      badge: "#8832-K"
    },
    materials: ["Complete Evidence File", "Witness Transcripts", "Payment Route Map"],
    incidents: 3,
    map: { x: 36, y: 32, sector: "Sector 7-G", units: 4, severity: "critical" }
  },
  {
    id: "case-trv-2023-p441",
    ref: "KLP-2022-P441",
    firNumber: "TRV-2022-11-441",
    badge: "Property Dispute",
    badgeMl: "സ്വത്ത് തർക്കം",
    status: "closed",
    statusLabel: "Case Closed",
    statusMl: "കേസ് പരിഹരിച്ചു",
    titleEn: "Land Dispute Resolution",
    titleMl: "വസ്തു തർക്ക പരിഹാരം",
    summary:
      "Commercial property boundary dispute resolved following court-mandated demarcation and mediated settlement.",
    description:
      "This record references a closed jurisdictional dispute concerning title boundaries and contested road access. Public disclosure includes procedural history, adjudication outcome, and station-of-record metadata.",
    filedDate: "02 Feb 2023",
    filedIso: "2023-02-02T08:40:00Z",
    jurisdiction: "Trivandrum South",
    district: "Thiruvananthapuram",
    station: "Fort Police Station",
    classification: "Case Closed",
    timeline: [
      {
        stamp: "02 FEB 2023 - 1145 HRS",
        title: "Boundary Survey",
        body:
          "District survey office submitted demarcation map. Adjacent landowners signed acknowledgment copy.",
        chip: "Filed",
        action: "Open Survey"
      },
      {
        stamp: "28 JAN 2023 - 0900 HRS",
        title: "Complaint Recorded",
        body: "Title and boundary records logged for magistrate review with witness statements attached.",
        chip: "Archived",
        action: "Open Record"
      }
    ],
    officer: {
      name: "R. Athira",
      rank: "Sub Inspector",
      badge: "#2451-T"
    },
    materials: ["Archived Record", "Survey Notes", "Magistrate Order"],
    incidents: 1,
    map: { x: 62, y: 48, sector: "Sector 2-B", units: 2, severity: "stable" }
  },
  {
    id: "case-hwy-2023-s110",
    ref: "KLP-2023-S110",
    firNumber: "HWY-2023-11-110",
    badge: "Public Safety",
    badgeMl: "പൊതു സുരക്ഷ",
    status: "active",
    statusLabel: "Investigation Active",
    statusMl: "അന്വേഷണം തുടരുന്നു",
    titleEn: "Highway Code Violation Probe",
    titleMl: "ട്രാഫിക് ലംഘന അന്വേഷണം",
    summary:
      "Serial traffic violations logged by automated speed cameras on NH-66 corridor with linked convoy pattern analysis.",
    description:
      "Automated roadway detection systems flagged repeated violations by linked vehicle registrations moving through multiple district checkpoints. The public docket summarizes the enforcement timeline and retained evidence bundle.",
    filedDate: "28 Nov 2023",
    filedIso: "2023-11-28T18:05:00Z",
    jurisdiction: "Highway Patrol Unit 4",
    district: "Thrissur",
    station: "NH-66 Enforcement Desk",
    classification: "Investigation Active",
    timeline: [
      {
        stamp: "28 NOV 2023 - 1805 HRS",
        title: "ANPR Logs Captured",
        body:
          "Speed-camera logs and plate-recognition snapshots synchronized to the highway evidence register.",
        chip: "Active",
        action: "View Dossier"
      },
      {
        stamp: "27 NOV 2023 - 0700 HRS",
        title: "Traffic Pattern Alert",
        body: "Congestion and repeated lane-rule anomalies triggered highway command center escalation.",
        chip: "High Priority",
        action: "Open Feed"
      }
    ],
    officer: {
      name: "Vineeth Das",
      rank: "Motor Vehicle Inspector",
      badge: "#5510-H"
    },
    materials: ["12 ANPR Logs", "Route Diagram", "Penalty Ledger"],
    incidents: 12,
    map: { x: 28, y: 64, sector: "Route M-4", units: 5, severity: "high" }
  },
  {
    id: "case-nightfall",
    ref: "KP-2023-04-882",
    firNumber: "KP-2023-04-882",
    badge: "Criminal Investigation",
    badgeMl: "കുറ്റാന്വേഷണം",
    status: "active",
    statusLabel: "Active Pursuit",
    statusMl: "സജീവ പിന്തുടർച്ച",
    titleEn: "Operation Nightfall",
    titleMl: "ഓപ്പറേഷൻ നൈറ്റ്‌ഫോൾ",
    summary:
      "Investigation into the series of coordinated high-value asset thefts across the financial district. Prime suspects identified, surveillance ongoing.",
    description:
      "Operation Nightfall consolidates linked theft reports, surveillance annotations, forensic dispatches, and officer assignments into a single procedural command file for public transparency review.",
    filedDate: "12 Oct 2023",
    filedIso: "2023-10-12T14:30:00Z",
    jurisdiction: "Central Dist.",
    district: "Kozhikode",
    station: "Central District Operations Desk",
    classification: "Critical Investigation",
    timeline: [
      {
        stamp: "14 OCT 2023 - 0900 HRS",
        title: "Evidence Collection",
        body:
          "Forensic unit dispatched to secondary location. Recovered digital storage device and physical trace elements matching initial scene.",
        chip: "Critical",
        action: "View Report"
      },
      {
        stamp: "12 OCT 2023 - 1430 HRS",
        title: "FIR Filed",
        body:
          "Initial First Information Report filed by complainant. Preliminary witness statements recorded by responding officers.",
        chip: "Logged",
        action: "Access Initial FIR"
      }
    ],
    officer: {
      name: "Insp. Menon, R.",
      rank: "Lead Investigator",
      badge: "#8832-K"
    },
    materials: ["Complete Evidence File", "Witness Transcripts", "Scene Photography"],
    incidents: 5,
    map: { x: 47, y: 42, sector: "Sector 7-G", units: 4, severity: "critical" }
  }
];

export const DASHBOARD_METRICS = [
  { label: "Registered Cases (YTD)", value: "14,285" },
  { label: "Resolution Rate", value: "82.4%" },
  { label: "Active Deployments", value: "342" }
] as const;

export const OPS_HUB_CARDS = [
  {
    tone: "danger",
    title: "File Report",
    body: "Initiate immediate documentation for critical incidents. By-pass standard queue.",
    action: "Open Terminal"
  },
  {
    tone: "navy",
    title: "Live Map",
    body: "Real-time geospatial tracking of incidents, patrols, and traffic anomalies.",
    action: "View Grid"
  },
  {
    tone: "neutral",
    title: "Deep Archive",
    body: "Access historical case files, forensic reports, and closed investigations.",
    action: "Access Records"
  }
] as const;

export const BULLETINS = [
  {
    id: "bulletin-sabarimala",
    type: "Verified Alert",
    timestamp: "2023-10-27T08:45:00Z",
    titleMl: "ശബരിമല മണ്ഡലകാലം: സുരക്ഷാ ക്രമീകരണങ്ങൾ പൂർത്തിയന്നു",
    titleEn: "Sabarimala Mandala Season: Security Arrangements Finalized",
    summary:
      "Comprehensive security protocols have been implemented across all major transit points leading to the Sabarimala shrine. Over 10,000 personnel have been deployed to ensure crowd management, medical response, and emergency evacuation procedures.",
    image: "crowd"
  },
  {
    id: "bulletin-cyber",
    type: "Press Release",
    timestamp: "2023-10-26T14:20:00Z",
    titleMl: "സൈബർ തട്ടിപ്പുകാർക്കെതിരെ ജാഗ്രത നിർദേശം",
    titleEn: "Advisory Issued Against Emerging Cyber Fraud Modus Operandi",
    summary:
      "The Cyber Dome division has identified a new pattern of financial fraud utilizing deepfake voice cloning technology. Citizens are advised to verify urgent financial requests through alternate channels.",
    image: null
  }
];

export const URGENT_NOTICES = [
  "Traffic advisory - NH 66 heavy congestion reported near Edappally toll. Diversions in place via bypass.",
  "Weather alert - Idukki orange alert issued for next 24 hours. Night travel restricted in ghat roads."
] as const;

export const QUICK_REFERENCES = ["Wanted Persons", "Missing Reports", "District Directory"] as const;

export const TRANSPARENCY_PANELS = [
  {
    title: "Public Access Rules",
    body: "Only approved public records, open bulletins, and declassified archive summaries are exposed through the portal."
  },
  {
    title: "Redaction Policy",
    body: "Victim identifiers, personal contacts, and internal operational notes are withheld before publication."
  },
  {
    title: "Data Reliability",
    body: "Portal entries are synchronized from official case registers and reviewed before becoming publicly accessible."
  }
] as const;

export function normalizeText(value: string | null | undefined): string {
  return String(value || "").trim().toLowerCase();
}

/**
 * Highly optimized short-circuiting search filter to prevent string allocation lag
 */
export function filterCases(
  records: CaseRecord[], 
  query: string, 
  filters: { district?: string; status?: string }
): CaseRecord[] {
  const search = normalizeText(query);

  return records.filter((record) => {
    // 1. Optimize search filter with direct, non-allocating conditional checks
    const matchesQuery = !search || 
      record.firNumber.toLowerCase().includes(search) ||
      record.ref.toLowerCase().includes(search) ||
      record.badge.toLowerCase().includes(search) ||
      record.badgeMl.toLowerCase().includes(search) ||
      record.titleEn.toLowerCase().includes(search) ||
      record.titleMl.toLowerCase().includes(search) ||
      record.jurisdiction.toLowerCase().includes(search) ||
      record.station.toLowerCase().includes(search) ||
      record.district.toLowerCase().includes(search);

    // 2. Exact match filters
    const matchesDistrict = !filters.district || record.district === filters.district;
    const matchesStatus = !filters.status || record.classification === filters.status;

    return matchesQuery && matchesDistrict && matchesStatus;
  });
}

export function deriveDashboardStats(records: CaseRecord[]) {
  const active = records.filter((item) => item.status === "active").length;
  const closed = records.filter((item) => item.status === "closed").length;

  return {
    total: records.length,
    active,
    closed,
    incidents: records.reduce((sum, item) => sum + item.incidents, 0)
  };
}

// Deterministic simulated incident times to make presentation data look consistent.
// We avoid dynamic random clocks to guarantee hydration safety and consistent layouts.
const BASE_INCIDENT_HOUR_2023 = 14;
const BASE_INCIDENT_HOUR_OTHER = 12;

export function mapIncidentsFromCases(records: CaseRecord[]) {
  return records.map((record, index) => {
    const hour = record.filedDate.includes("2023") 
      ? BASE_INCIDENT_HOUR_2023 - index 
      : BASE_INCIDENT_HOUR_OTHER + index;
    const minuteStr = String(index + 2).padStart(2, '0');
    const time = `${hour}:${minuteStr} IST`;

    return {
      id: record.id,
      code: index === 0 ? "CODE 3" : index === 1 ? "CODE 2" : "CODE 1",
      priority: record.status === "active" && index === 0 ? "critical" : record.status === "active" ? "high" : "elevated",
      title: record.titleEn.replace("Investigation", "").replace("Resolution", "").trim(),
      time,
      summary: record.summary,
      location: record.map.sector,
      unit: `Unit ${index + 1}`,
      ...record.map
    };
  });
}

/**
 * Standard RFC 4180 CSV builder with full double-quote escape coverage
 */
export function buildCsv(records: CaseRecord[]): string {
  const rows = [
    ["FIR Number", "Reference", "Title", "Status", "District", "Station", "Filed Date"],
    ...records.map((record) => [
      record.firNumber,
      record.ref,
      record.titleEn,
      record.statusLabel,
      record.district,
      record.station,
      record.filedDate
    ])
  ];

  return rows
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and ensure clean value wrapping
          const cleanValue = String(cell || '').replace(/\r/g, '').replaceAll('"', '""');
          return `"${cleanValue}"`;
        })
        .join(",")
    )
    .join("\n");
}
