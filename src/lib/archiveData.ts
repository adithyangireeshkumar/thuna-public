export interface ArchiveTimelineEntry {
  date: string;
  event: string;
}

export interface ArchiveRecord {
  id: string;
  firNumber: string;
  date: string;
  dateDisplay: string;
  station: string;
  district: string;
  crimeType: string;
  status: 'closed' | 'active' | 'review';
  statusLabel: string;
  summary: string;
  completionDate: string | null;
  officer: string;
  timeline: ArchiveTimelineEntry[];
}

export const ARCHIVE_FIR_RECORDS: ArchiveRecord[] = [
  {
    id: "fir-2026-aug-021",
    firNumber: "FIR2026AUG021",
    date: "2026-08-02",
    dateDisplay: "02 Aug 2026",
    station: "Kakkanad Police Station",
    district: "Ernakulam",
    crimeType: "Theft",
    status: "closed",
    statusLabel: "Closed",
    summary: "Reported theft of electronic equipment from commercial establishment. Investigation concluded with recovery of stolen items and arrest of suspect.",
    completionDate: "2026-08-09",
    officer: "SI Anoop Kumar",
    timeline: [
      { date: "02 Aug 2026", event: "Theft case registered in Kakkanad" },
      { date: "03 Aug 2026", event: "CCTV footage analyzed, suspect identified" },
      { date: "05 Aug 2026", event: "Suspect arrested from Aluva" },
      { date: "07 Aug 2026", event: "Stolen items recovered" },
      { date: "09 Aug 2026", event: "Case closed — chargesheet filed" },
    ]
  },
  {
    id: "fir-2026-jul-198",
    firNumber: "FIR2026JUL198",
    date: "2026-07-14",
    dateDisplay: "14 Jul 2026",
    station: "Thrissur East Police Station",
    district: "Thrissur",
    crimeType: "Cyber Fraud",
    status: "closed",
    statusLabel: "Closed",
    summary: "Online banking fraud involving phishing link. Victim's account activity frozen within 2 hours. Fraudulent transaction reversed through banking coordination.",
    completionDate: "2026-07-28",
    officer: "Insp. Maya S. Nair",
    timeline: [
      { date: "14 Jul 2026", event: "Cyber fraud complaint registered" },
      { date: "15 Jul 2026", event: "Bank accounts frozen, digital trail analyzed" },
      { date: "20 Jul 2026", event: "IP trace completed — accused located" },
      { date: "25 Jul 2026", event: "Arrest made, devices seized for forensics" },
      { date: "28 Jul 2026", event: "Case closed — funds recovered" },
    ]
  },
  {
    id: "fir-2026-jun-087",
    firNumber: "FIR2026JUN087",
    date: "2026-06-10",
    dateDisplay: "10 Jun 2026",
    station: "Fort Police Station",
    district: "Thiruvananthapuram",
    crimeType: "Property Dispute",
    status: "closed",
    statusLabel: "Closed",
    summary: "Boundary dispute between two commercial properties resolved through court-mandated survey and mediation.",
    completionDate: "2026-07-02",
    officer: "SI Rajesh P.",
    timeline: [
      { date: "10 Jun 2026", event: "Dispute complaint registered" },
      { date: "15 Jun 2026", event: "Survey ordered by magistrate" },
      { date: "22 Jun 2026", event: "Boundary demarcation completed" },
      { date: "02 Jul 2026", event: "Settlement signed — case closed" },
    ]
  },
  {
    id: "fir-2026-may-342",
    firNumber: "FIR2026MAY342",
    date: "2026-05-05",
    dateDisplay: "05 May 2026",
    station: "Kozhikode Beach Police Station",
    district: "Kozhikode",
    crimeType: "Public Nuisance",
    status: "closed",
    statusLabel: "Closed",
    summary: "Illegal waste dumping near public beach area. Responsible entity identified and penalized under environmental protection regulations.",
    completionDate: "2026-05-18",
    officer: "CI Suresh Babu",
    timeline: [
      { date: "05 May 2026", event: "Complaint filed regarding waste dumping" },
      { date: "08 May 2026", event: "Site inspection conducted" },
      { date: "12 May 2026", event: "Responsible party identified" },
      { date: "18 May 2026", event: "Fine imposed — case closed" },
    ]
  },
  {
    id: "fir-2026-apr-115",
    firNumber: "FIR2026APR115",
    date: "2026-04-20",
    dateDisplay: "20 Apr 2026",
    station: "Palakkad Town Police Station",
    district: "Palakkad",
    crimeType: "Missing Property",
    status: "active",
    statusLabel: "Under Investigation",
    summary: "Missing vehicle report filed. Vehicle details circulated to all checkpoints. Investigation ongoing with ANPR camera network activated.",
    completionDate: null,
    officer: "SI Deepak R.",
    timeline: [
      { date: "20 Apr 2026", event: "Missing vehicle report filed" },
      { date: "21 Apr 2026", event: "Vehicle details circulated state-wide" },
      { date: "25 Apr 2026", event: "ANPR alert triggered at Walayar checkpoint" },
    ]
  },
  {
    id: "fir-2026-mar-221",
    firNumber: "FIR2026MAR221",
    date: "2026-03-15",
    dateDisplay: "15 Mar 2026",
    station: "Aluva Police Station",
    district: "Ernakulam",
    crimeType: "Assault",
    status: "review",
    statusLabel: "Under Review",
    summary: "Altercation at commercial complex. Suspect apprehended. Case file under judicial review for chargesheet approval.",
    completionDate: null,
    officer: "Insp. Sreejith V.",
    timeline: [
      { date: "15 Mar 2026", event: "Assault case registered" },
      { date: "16 Mar 2026", event: "Suspect arrested, witness statements recorded" },
      { date: "22 Mar 2026", event: "Medical report submitted" },
      { date: "10 Apr 2026", event: "Case file sent for judicial review" },
    ]
  },
  {
    id: "fir-2026-jan-042",
    firNumber: "FIR2026JAN042",
    date: "2026-01-12",
    dateDisplay: "12 Jan 2026",
    station: "Kakkanad Police Station",
    district: "Ernakulam",
    crimeType: "Cyber Fraud",
    status: "closed",
    statusLabel: "Closed",
    summary: "E-commerce transactional scam targeting online store. Digital trace elements retrieved. Full restitution completed to complainant.",
    completionDate: "2026-01-20",
    officer: "SI Anoop Kumar",
    timeline: [
      { date: "12 Jan 2026", event: "Cyber Fraud complaint registered" },
      { date: "20 Jan 2026", event: "Funds returned to victim — case closed" }
    ]
  },
  {
    id: "fir-2026-feb-099",
    firNumber: "FIR2026FEB099",
    date: "2026-02-25",
    dateDisplay: "25 Feb 2026",
    station: "Fort Police Station",
    district: "Thiruvananthapuram",
    crimeType: "Theft",
    status: "closed",
    statusLabel: "Closed",
    summary: "Theft of solar panels from institutional sector. Tracking network retrieved stolen assets.",
    completionDate: "2026-03-02",
    officer: "SI Rajesh P.",
    timeline: [
      { date: "25 Feb 2026", event: "Theft reported" },
      { date: "02 Mar 2026", event: "Suspect arrested — items recovered" }
    ]
  },
  {
    id: "fir-2026-sep-103",
    firNumber: "FIR2026SEP103",
    date: "2026-09-08",
    dateDisplay: "08 Sep 2026",
    station: "Aluva Police Station",
    district: "Ernakulam",
    crimeType: "Public Nuisance",
    status: "closed",
    statusLabel: "Closed",
    summary: "Commercial sound violations during night restriction. Warning issued and equipment decibel limits corrected.",
    completionDate: "2026-09-12",
    officer: "Insp. Sreejith V.",
    timeline: [
      { date: "08 Sep 2026", event: "Noise complaint registered" },
      { date: "12 Sep 2026", event: "Corrective order executed — closed" }
    ]
  },
  {
    id: "fir-2026-oct-056",
    firNumber: "FIR2026OCT056",
    date: "2026-10-18",
    dateDisplay: "18 Oct 2026",
    station: "Thrissur East Police Station",
    district: "Thrissur",
    crimeType: "Theft",
    status: "active",
    statusLabel: "Under Investigation",
    summary: "Bicycle theft ring inside educational campus. Surveillance analysis in progress.",
    completionDate: null,
    officer: "Insp. Maya S. Nair",
    timeline: [
      { date: "18 Oct 2026", event: "Campus theft incident reported" }
    ]
  },
  {
    id: "fir-2026-nov-401",
    firNumber: "FIR2026NOV401",
    date: "2026-11-22",
    dateDisplay: "22 Nov 2026",
    station: "Kozhikode Beach Police Station",
    district: "Kozhikode",
    crimeType: "Assault",
    status: "review",
    statusLabel: "Under Review",
    summary: "Traffic confrontation leading to minor altercation. Mediation under session.",
    completionDate: null,
    officer: "CI Suresh Babu",
    timeline: [
      { date: "22 Nov 2026", event: "Altercation complaint registered" }
    ]
  },
  {
    id: "fir-2026-dec-011",
    firNumber: "FIR2026DEC011",
    date: "2026-12-05",
    dateDisplay: "05 Dec 2026",
    station: "Palakkad Town Police Station",
    district: "Palakkad",
    crimeType: "Missing Property",
    status: "closed",
    statusLabel: "Closed",
    summary: "Lost luggage parcel containing technical instruments. Discovered and returned safely to logistics distributor.",
    completionDate: "2026-12-10",
    officer: "SI Deepak R.",
    timeline: [
      { date: "05 Dec 2026", event: "Luggage missing log opened" },
      { date: "10 Dec 2026", event: "Parcel located and delivered — closed" }
    ]
  },
];

export const ARCHIVE_FILTERS = {
  years: ["2026", "2025", "2024", "2023"],
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  stations: [
    "All Stations",
    "Kakkanad Police Station",
    "Thrissur East Police Station",
    "Fort Police Station",
    "Kozhikode Beach Police Station",
    "Palakkad Town Police Station",
    "Aluva Police Station",
  ],
  crimeTypes: [
    "All Types",
    "Theft",
    "Cyber Fraud",
    "Property Dispute",
    "Public Nuisance",
    "Missing Property",
    "Assault",
  ],
  statuses: [
    "All Status",
    "Closed",
    "Under Investigation",
    "Under Review",
  ],
};
