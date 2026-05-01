export default function StatusBanner({ tone, text }) {
  return <div className={`status-banner status-banner--${tone}`}>{text}</div>;
}
