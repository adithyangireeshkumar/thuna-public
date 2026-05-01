import { Lock, ShieldCheck } from "lucide-react";

export default function AuthView({ authGranted, onGrant, onBack }) {
  return (
    <section className="auth-view">
      <div className="auth-grid" />
      <div className="auth-card frame">
        <div className="floating-label">Access.Control</div>
        <div className="auth-card__header">
          <h2>AUTHENTICATE</h2>
          <p>Archival Command Center Access</p>
        </div>
        <div className="auth-warning"><Lock size={22} /> Government Officials Only</div>
        <div className="auth-panel">
          <p>Secure authorization required to access Thuna Portal records and operations.</p>
          <button type="button" className="auth-button" onClick={onGrant}>
            <ShieldCheck size={22} /> Sign in with Google Workspace
          </button>
        </div>
        <div className="auth-footer">
          <span>V. 2.4.1</span>
          <span>{authGranted ? "SEC-LEVEL: ALPHA" : "SEC-LEVEL: STANDBY"}</span>
        </div>
        <button type="button" className="auth-back" onClick={onBack}>Back to Portal</button>
      </div>
    </section>
  );
}
