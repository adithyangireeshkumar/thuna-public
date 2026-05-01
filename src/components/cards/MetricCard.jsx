export default function MetricCard({ title, value, accent }) {
  return (
    <article className={`metric-card metric-card--${accent}`}>
      <p>{title}</p>
      <strong>{value}</strong>
      <div className="metric-card__bar" />
    </article>
  );
}
