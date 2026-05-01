export function formatStatus(value = "") {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
