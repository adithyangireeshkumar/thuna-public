/**
 * Formats a date string or timestamp into the localized format 'dd MMM yyyy' (e.g. '14 Oct 2023').
 */
export function formatDateText(d: string | number | Date | null | undefined): string {
  if (!d) return '—';
  try {
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

/**
 * Standard status badge model mapping database status strings to display labels and colors.
 */
export interface StatusBadgeInfo {
  label: string;
  tone: 'closed' | 'review' | 'active';
}

export function formatStatusBadge(status: string | null | undefined): StatusBadgeInfo {
  const normStatus = String(status || '').trim().toLowerCase();
  switch (normStatus) {
    case 'case_closed':
    case 'closed':
      return { label: 'Closed', tone: 'closed' };
    case 'chargesheet_filed':
    case 'review':
      return { label: 'Under Review', tone: 'review' };
    case 'active':
    case 'investigation_active':
    default:
      return { label: 'Active', tone: 'active' };
  }
}

/**
 * Capitalizes and strips underscores from generic status string.
 */
export function formatStatusText(value: string | null | undefined): string {
  if (!value) return '';
  return String(value)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
