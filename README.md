# 🛡️ THUNA | തുണ
### Kerala Police Public Crime Transparency Portal
*(Built on the Civic Glass v2.0 Architecture)*

---

## 📖 Overview
**THUNA** is a state-of-the-art Public Crime Transparency Portal developed for the **Kerala Police Department, Government of Kerala**. The portal operates on the core philosophy of **"Civic Glass"**—bridging the gap between institutional authority and public transparency by providing real-time access to declassified crime ledgers, case resolution statistics, and incident timelines.

This platform is structured with a responsive **glassmorphic design system** that adapts gracefully between dark, light, and high-visibility gold themes, and supports full bilingual localization in **Malayalam (മലയാളം)** and **English**.

---

## 🔒 Security & Privacy Safeguards
Public transparency must never compromise state security or individual privacy. THUNA implements a strict **Redaction Shield** pattern:
- **Zero PII (Personally Identifiable Information):** Victim identities, telephone numbers, domestic addresses, and family relations are permanently redacted.
- **State Security Redactions:** Juvenile records, ongoing strategic deployments, and highly sensitive evidentiary details are withheld from public indexing.
- **Secure Auditor Gate:** Public-safe data synchronization is managed through a secure portal containing brute-force rate limiting (3-attempt cooldown lockdowns) and generic error notifications to prevent pattern scanning.

---

## ⚙️ Core Architecture & Refactoring Highlights
1. **TypeScript Conversion:** Migrated from a loosely-typed JS boilerplate to a highly strict React 19 + TypeScript 5.x architecture with standard bundler-level type checking.
2. **Performance Optimization:** Eliminated redundant high-overhead string allocation arrays (`[...].join(" ").toLowerCase()`) inside search loops. Implemented short-circuiting boolean conditions that cut search query latency to sub-milliseconds even under large datasets.
3. **Accessibility (a11y) Polish:** Replaced bad UX attributes (`autoComplete="off"`, `spellCheck="false"`) with accessible autocompletion gates. Restructured hierarchical layouts with semantically correct header lines (`<h1>`, `<h2>`) and detailed ARIA labels.
4. **Resilient Architecture:** Added a Class-based view-level `ErrorBoundary` designed to isolate and gracefully handle page render crashes while preserving the institutional top navigation shell.
5. **Interactive UI / UX:** Integrated Framer Motion 12 animated column SVG smileys responding to user actions (idle, curious, success, confused, secure). Added shimmering skeletal loading placeholders and paginated pagination footers (10 items per page).

---

## 📁 Technical Data Schema

### CaseRecord / FIR Schema
```typescript
interface CaseRecord {
  id: string;                      // Unique deterministic identifier
  firNumber: string;               // Unique FIR Registration Reference
  badge: string;                   // Offense Category Badge (e.g. Theft, Cyber)
  badgeMl?: string;                // Malayalam equivalent of the offense badge
  status: 'closed' | 'active' | 'review'; // Strict status enum
  statusLabel: string;             // Human-readable status label
  titleEn: string;                 // English Title
  titleMl?: string;                // Malayalam Title
  summary: string;                 // Declassified incident overview
  description: string;             // Sanitized case chronology detail
  filedDate: string;               // Registration date text
  jurisdiction: string;            // Precinct station and district bounds
  timeline: {
    stamp: string;                 // Unified Date-Time stamp
    title: string;                 // Chronological Milestone title
    body: string;                  // Declassified milestone summary
    chip: string;                  // Audit label
    action?: string;               // Administrative trigger label
  }[];
  officer: {
    name: string;                  // Investigating Officer name
    rank: string;                  // Officer rank
    badge: string;                 // Officer KLP ID
  };
  materials: string[];             // Sanitized declassified attachments
}
```

---

## 🚀 Setting Up the Supabase Backend

THUNA is built to optionally synchronize with a real-time **Supabase database** for declassified case catalogs. Follow these instructions to launch:

### 1. Database Schema
Run the following SQL script inside your Supabase SQL Editor to establish the declassified incident table:

```sql
-- Create incident category enum
CREATE TYPE case_status AS ENUM ('closed', 'active', 'review');

-- Create declassified cases table
CREATE TABLE declassified_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fir_number VARCHAR(50) UNIQUE NOT NULL,
  crime_type VARCHAR(100) NOT NULL,
  date_of_registration DATE NOT NULL,
  station_name VARCHAR(150) NOT NULL,
  district VARCHAR(100) NOT NULL,
  summary TEXT NOT NULL,
  officer_name VARCHAR(150) NOT NULL,
  status case_status DEFAULT 'active' NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE declassified_incidents ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access" 
ON declassified_incidents 
FOR SELECT 
USING (true);
```

### 2. Geolocation Positioning (`hashPosition`)
Because the map view displays incidents on a deterministic geographic coordinate system, cases synchronization uses a **32-bit shift-add string hash** to map static, persistent coordinates without storing live tracking variables or causing hydration mismatches in React:

```typescript
// Deterministic coordinate calculation
export function hashPosition(str: string): [number, number] {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const lat = 9.5 + (Math.abs(hash % 1000) / 1000) * 2.5; // Kerala lat bounds: ~9.5 - 12.0
  const lng = 76.0 + (Math.abs((hash >> 10) % 1000) / 1000) * 1.5; // Kerala lng bounds: ~76.0 - 77.5
  return [lat, lng];
}
```

---

## 🛠️ Environment Configuration
Create an `.env` file in the root directory to link your production endpoints:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key-here
```

---

## 📦 Deployment & Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Execute Local Server
```bash
npm run dev
```

### 3. TypeScript Type-Check
```bash
npx tsc --noEmit
```

### 4. Build Production Distribution
```bash
npm run build
```

---
*State Security, Transparency, Civic Duty — Kerala Police Department.*
