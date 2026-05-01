import { UserCircle2 } from "lucide-react";

export default function PersonnelView({ records }) {
  return (
    <section className="generic-view">
      <header className="page-header">
        <div>
          <h2>PERSONNEL DIRECTORY</h2>
          <p>Assigned officers and station-level public liaison references.</p>
        </div>
      </header>
      <div className="personnel-grid">
        {records.map((record) => (
          <article key={record.id} className="frame personnel-entry">
            <div className="personnel-entry__icon"><UserCircle2 size={26} /></div>
            <div>
              <h3>{record.officer.name}</h3>
              <p>{record.officer.rank}</p>
              <small>{record.station}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
