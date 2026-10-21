import React from "react";
import { Menu, ShieldCheck, Database, Sparkles } from "lucide-react";

export default function Header({
  activeNav,
  schemaStatus,
  onToggleMobileMenu,
}) {
  const getTitles = () => {
    switch (activeNav) {
      case "dashboards":
        return {
          title: "Dashboards",
          subtitle: "AIQ — Saved analytics views & pinned queries",
        };
      case "data-sources":
        return {
          title: "Data Sources",
          subtitle: "AIQ — PostgreSQL connections & schema catalog",
        };
      case "query-editor":
        return {
          title: "AI Query Studio",
          subtitle: "AIQ — Natural language to PostgreSQL SQL generator",
        };
      default:
        return {
          title: "Workspace Overview",
          subtitle: "AIQ — Ask Smarter. Query Faster.",
        };
    }
  };

  const { title, subtitle } = getTitles();

  return (
    <header className="main-header-panel">
      <div className="header-left">
        {onToggleMobileMenu && (
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <Menu size={18} />
          </button>
        )}
        <div className="header-titles">
          <div className="header-title-row">
            <h1 className="header-title">{title}</h1>
          </div>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-badge read-only-badge">
          <ShieldCheck size={14} style={{ color: "var(--accent-primary-light)" }} />
          <span>Read-Only Guardrails</span>
        </div>

        <div className="header-badge db-status-badge">
          <span className={`status-dot ${schemaStatus === "connected" ? "online" : "checking"}`} />
          <span>{schemaStatus === "connected" ? "PostgreSQL Active" : "Connecting..."}</span>
        </div>
      </div>
    </header>
  );
}
