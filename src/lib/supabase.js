import { createClient } from "@supabase/supabase-js";

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

export async function searchPublicCases(query = "", filters = {}, page = 1, perPage = 24) {
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
  return { data: data ?? [], error, count: count ?? 0 };
}

function formatStatus(status) {
  switch (status) {
    case "case_closed":
      return { label: "Case Closed", tone: "closed" };
    case "chargesheet_filed":
      return { label: "Filed for Review", tone: "review" };
    default:
      return { label: "Investigation Active", tone: "active" };
  }
}

function hashPosition(seed, min, span) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }
  return min + (Math.abs(hash) % span);
}

export function hydratePortalCase(row, index) {
  const status = formatStatus(row.status);
  const officer = row.officers || { name: "Assigned Officer", rank: "Investigation Unit", badge_number: "N/A" };
  const titleEn = row.title || row.crime_type?.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Public Archive Record";

  return {
    id: row.id,
    ref: row.fir_number,
    firNumber: row.fir_number,
    badge: titleEn.split(" ").slice(0, 2).join(" "),
    badgeMl: "പൊതു രേഖ",
    status: status.tone,
    statusLabel: status.label,
    statusMl: status.tone === "closed" ? "കേസ് പരിഹരിച്ചു" : "അന്വേഷണം തുടരുന്നു",
    titleEn,
    titleMl: "പൊതു കേസ് രേഖ",
    summary: `${titleEn} recorded for public reference under ${row.station_name}.`,
    description:
      "This record was synchronized from the public-safe case register. Sensitive identities and protected operational notes are excluded from this interface.",
    filedDate: new Date(row.date_of_registration).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    filedIso: row.date_of_registration,
    jurisdiction: row.district,
    district: row.district,
    station: row.station_name,
    classification: status.label,
    timeline: [
      {
        stamp: `${new Date(row.date_of_registration).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })} - 0900 HRS`,
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
      severity: status.tone === "closed" ? "stable" : "high"
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
