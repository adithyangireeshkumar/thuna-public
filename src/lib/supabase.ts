import { createClient } from "@supabase/supabase-js";
import { formatStatusBadge, formatDateText } from "../utils/formatters";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY) &&
  !String(import.meta.env.VITE_SUPABASE_URL).includes("placeholder");

const PUBLIC_CASE_COLUMNS = [
  "id",
  "fir_number",
  "title",
  "crime_type",
  "status",
  "date_of_occurrence",
  "date_of_registration",
  "station_name",
  "district",
  "ipc_sections",
  "is_public"
].join(", ");

const PUBLIC_OFFICER_COLUMNS = `
  officers (
    name,
    rank,
    badge_number
  )
`.trim();

export interface SupabaseCaseRow {
  id: string;
  fir_number: string;
  title: string;
  crime_type?: string;
  status: string;
  date_of_occurrence?: string;
  date_of_registration: string;
  station_name: string;
  district: string;
  ipc_sections?: string;
  is_public: boolean;
  officers?: {
    name: string;
    rank: string;
    badge_number: string;
  };
}

export async function searchPublicCases(query = "", filters: { crime_type?: string; status?: string; district?: string } = {}, page = 1, perPage = 24) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let q = supabase
    .from("cases")
    .select(`${PUBLIC_CASE_COLUMNS}, ${PUBLIC_OFFICER_COLUMNS}`, { count: "exact" })
    .eq("is_public", true)
    .range(from, to)
    .order("date_of_registration", { ascending: false });

  const trimmed = query.trim();
  if (trimmed) {
    const firPattern = /^[A-Z]{2,4}\/\d{4}\/\d+/i;
    if (firPattern.test(trimmed)) {
      q = q.ilike("fir_number", `${trimmed}%`);
    } else {
      q = q.or(`title.ilike.%${trimmed}%,crime_type.ilike.%${trimmed}%,fir_number.ilike.%${trimmed}%`);
    }
  }

  if (filters.crime_type) q = q.eq("crime_type", filters.crime_type);
  if (filters.status) q = q.eq("status", filters.status);
  if (filters.district) q = q.ilike("district", `%${filters.district}%`);

  const { data, error, count } = await q;
  return { data: (data as unknown as SupabaseCaseRow[]) ?? [], error, count: count ?? 0 };
}

/**
 * Generates a deterministic pseudorandom integer based on a seed string.
 * This is used to map dynamic geolocation coordinates (x, y) for mock case details
 * consistently, ensuring the UI remains stable across page refreshes and doesn't trigger
 * React hydration errors or fluctuating map points.
 * 
 * Logic details:
 * - Computes a standard 32-bit shift-add hash of the string characters.
 * - Restricts the hash to the specified span (`min + (Math.abs(hash) % span)`).
 */
export function hashPosition(seed: string, min: number, span: number): number {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0; // Convert to a signed 32-bit integer
  }
  return min + (Math.abs(hash) % span);
}

export function hydratePortalCase(row: SupabaseCaseRow, index: number) {
  const statusInfo = formatStatusBadge(row.status);
  const officer = row.officers || { name: "Assigned Officer", rank: "Investigation Unit", badge_number: "N/A" };
  const titleEn = row.title || row.crime_type?.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Public Archive Record";

  return {
    id: row.id,
    ref: row.fir_number,
    firNumber: row.fir_number,
    badge: titleEn.split(" ").slice(0, 2).join(" "),
    badgeMl: "പൊതു രേഖ",
    status: statusInfo.tone,
    statusLabel: statusInfo.label,
    statusMl: statusInfo.tone === "closed" ? "കേസ് പരിഹരിച്ചു" : "അന്വേഷണം തുടരുന്നു",
    titleEn,
    titleMl: "പൊതു കേസ് രേഖ",
    summary: `${titleEn} recorded for public reference under ${row.station_name}.`,
    description:
      "This record was synchronized from the public-safe case register. Sensitive identities and protected operational notes are excluded from this interface.",
    filedDate: formatDateText(row.date_of_registration),
    filedIso: row.date_of_registration,
    jurisdiction: row.district,
    district: row.district,
    station: row.station_name,
    classification: statusInfo.label,
    timeline: [
      {
        stamp: `${formatDateText(row.date_of_registration)} - 0900 HRS`,
        title: "Public Record Logged",
        body: "Case synchronized from the public-safe register and made visible through the transparency portal.",
        chip: "Logged",
        action: "Open Record"
      }
    ],
    officer: {
      name: officer.name,
      rank: officer.rank,
      badge: officer.badge_number
    },
    materials: ["Sanitized Case File", "Station Entry", "Public Summary"],
    incidents: index + 1,
    map: {
      x: hashPosition(String(row.id), 24, 48),
      y: hashPosition(String(row.station_name), 24, 44),
      sector: row.station_name,
      units: (index % 5) + 1,
      severity: statusInfo.tone === "closed" ? "stable" as const : "high" as const
    }
  };
}

export async function fetchPortalCases() {
  const response = await searchPublicCases("", {}, 1, 48);

  if (response.error) {
    throw response.error;
  }

  return response.data.map((row, index) => hydratePortalCase(row, index));
}
