import React from "react";
import {
  Sparkles,
  Database,
  ShieldCheck,
  ArrowRight,
  Code2,
  LayoutDashboard,
  Clock,
  CheckCircle2,
  Layers,
  FileCode2,
  FolderSync,
  Play,
  Menu,
} from "lucide-react";
import AiqLogo from "./AiqLogo";

export default function HomeLandingView({
  onStartQuerying,
  onConnectDatabase,
  onImportSchema,
  onExploreDashboards,
  dataSources = [],
  activeSource = null,
  recentQueries = [],
  savedDashboards = [],
  onSelectRecentQuery,
  schemaStatus,
  onToggleMobileMenu,
}) {
  const liveCount = dataSources.filter((s) => s.is_live).length;
  const totalSourcesCount = dataSources.length;
  const queriesCount = recentQueries.length;
  const dashboardsCount = savedDashboards.length;

  const quickActions = [
    {
      id: "ask-ai",
      title: "Ask AI",
      description: "Convert natural language into read-only SQL with schema awareness.",
      icon: Sparkles,
      onClick: onStartQuerying,
      tag: "Studio",
    },
    {
      id: "connect-db",
      title: "Connect Database",
      description: "Securely link your live PostgreSQL or Supabase instances.",
      icon: Database,
      onClick: onConnectDatabase,
      tag: "Live DB",
    },
    {
      id: "import-schema",
      title: "Import Schema",
      description: "Paste DDL or upload files to generate SQL without live credentials.",
      icon: FileCode2,
      onClick: onImportSchema,
      tag: "DDL / JSON",
    },
    {
      id: "explore-dashboards",
      title: "Explore Dashboards",
      description: "Review pinned query cards, visualizations, and data exports.",
      icon: LayoutDashboard,
      onClick: onExploreDashboards || onStartQuerying,
      tag: "Analytics",
    },
  ];

  return (
    <div className="home-workspace-view">
      {/* MOBILE TOP BAR */}
      <div style={{ display: "none" }} className="mobile-top-bar">
        {onToggleMobileMenu && (
          <button type="button" onClick={onToggleMobileMenu} className="mobile-menu-toggle">
            <Menu size={18} />
          </button>
        )}
        <AiqLogo size={26} showText={true} />
      </div>

      {/* HERO SECTION */}
      <section className="home-hero-card">
        <div className="hero-pill-badge">
          <Sparkles size={13} style={{ color: "var(--accent-primary-light)" }} />
          <span>AIQ 2.0 · NATURAL LANGUAGE TO SQL</span>
        </div>

        <h1 className="home-hero-title">
          Your Data. Your Questions. Instant Answers.
        </h1>

        <p className="home-hero-desc">
          Transform natural language into SQL queries, explore your databases, and uncover insights with AI.
        </p>

        <div className="home-hero-cta-row">
          <button
            type="button"
            className="btn-primary-gradient"
            onClick={onStartQuerying}
          >
            <span>Start Querying</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            className="btn-secondary-surface"
            onClick={onConnectDatabase}
          >
            <Database size={15} />
            <span>Connect Database</span>
          </button>
        </div>
      </section>

      {/* WORKSPACE OVERVIEW (4 REAL STATS CARDS) */}
      <section>
        <div className="section-headline">
          <div>
            <h2>Workspace Overview</h2>
            <p>Live metrics and data source status for your active workspace</p>
          </div>
        </div>

        <div className="home-stats-grid">
          {/* 1. Connected Databases */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Connected Databases</span>
              <div className="stat-card-icon-wrap">
                <Database size={16} />
              </div>
            </div>
            <div className="stat-card-value">
              {liveCount}
            </div>
            <div className="stat-card-meta">
              {totalSourcesCount > 0
                ? `${totalSourcesCount} total configured sources`
                : "No databases connected"}
            </div>
          </div>

          {/* 2. Queries Executed */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Queries Executed</span>
              <div className="stat-card-icon-wrap">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="stat-card-value">
              {queriesCount}
            </div>
            <div className="stat-card-meta">
              {queriesCount > 0 ? "Saved in session history" : "Ready to run your first query"}
            </div>
          </div>

          {/* 3. Saved Dashboards */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Saved Dashboards</span>
              <div className="stat-card-icon-wrap">
                <LayoutDashboard size={16} />
              </div>
            </div>
            <div className="stat-card-value">
              {dashboardsCount}
            </div>
            <div className="stat-card-meta">
              {dashboardsCount > 0 ? "Pinned analytical query cards" : "Pin queries from studio"}
            </div>
          </div>

          {/* 4. Active Source / Recent Activity */}
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Active Database</span>
              <div className="stat-card-icon-wrap">
                <Layers size={16} />
              </div>
            </div>
            <div
              className="stat-card-value"
              style={{ fontSize: "18px", lineHeight: "1.3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              title={activeSource?.name || "Default PostgreSQL"}
            >
              {activeSource ? activeSource.name : "PostgreSQL"}
            </div>
            <div className="stat-card-meta" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className={`status-dot ${schemaStatus === "connected" ? "online" : "checking"}`} />
              <span>{activeSource?.is_live ? "Live PostgreSQL" : "Schema Definition"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <div className="section-headline">
          <div>
            <h2>Quick Actions</h2>
            <p>Fast paths to query, manage, and explore database assets</p>
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="quick-action-card"
                onClick={action.onClick}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="quick-action-icon-box">
                    <Icon size={18} />
                  </div>
                  <span className="nav-tag">{action.tag}</span>
                </div>
                <div className="quick-action-title">{action.title}</div>
                <div className="quick-action-desc">{action.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section>
        <div className="section-headline">
          <div>
            <h2>Recent Activity</h2>
            <p>Recently generated queries with one-click re-run capability</p>
          </div>
          {recentQueries.length > 0 && (
            <button
              type="button"
              className="btn-secondary-surface"
              onClick={onStartQuerying}
              style={{ padding: "6px 14px", fontSize: "12.5px" }}
            >
              Open Studio
            </button>
          )}
        </div>

        <div className="recent-activity-panel">
          {recentQueries && recentQueries.length > 0 ? (
            <div>
              <div className="activity-table-header">
                <div>Question / Prompt</div>
                <div>Data Source</div>
                <div>Status</div>
                <div>Execution Time</div>
                <div style={{ textAlign: "right" }}>Action</div>
              </div>

              {recentQueries.slice(0, 6).map((item, index) => (
                <div
                  key={item.id || index}
                  className="activity-row"
                  onClick={() => onSelectRecentQuery && onSelectRecentQuery(item)}
                >
                  <div className="activity-query-title" title={item.question}>
                    {item.question}
                  </div>

                  <div className="activity-source-pill">
                    <Database size={13} style={{ color: "var(--accent-primary-light)" }} />
                    <span>{activeSource?.name || "PostgreSQL"}</span>
                  </div>

                  <div className="activity-status-tag">
                    <CheckCircle2 size={13} />
                    <span>{item.rowsCount !== undefined ? `${item.rowsCount} rows` : "Success"}</span>
                  </div>

                  <div className="activity-time">
                    {item.durationMs ? `${item.durationMs}ms` : "< 100ms"}
                  </div>

                  <div className="activity-action-col">
                    <span className="activity-run-link">
                      <span>Open</span>
                      <Play size={10} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="activity-empty-state">
              <Sparkles size={36} style={{ color: "var(--accent-primary)", opacity: 0.7 }} />
              <h3>No query activity yet</h3>
              <p>
                When you ask questions in AI Query Studio, queries and execution metrics will be recorded here for instant replay.
              </p>
              <button
                type="button"
                className="btn-primary-gradient"
                onClick={onStartQuerying}
                style={{ marginTop: "8px" }}
              >
                <span>Ask your first question</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
