import React, { useState } from "react";
import {
  LayoutGrid,
  Sparkles,
  LayoutDashboard,
  Database,
  History,
  Bookmark,
  Settings as SettingsIcon,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Moon,
  Sun,
  X,
  Keyboard,
} from "lucide-react";
import AiqLogo from "./AiqLogo";

export default function Sidebar({
  activeNav,
  setActiveNav,
  recentQueries = [],
  savedDashboards = [],
  onSelectQuery,
  mobileOpen,
  setMobileOpen,
  collapsed = false,
  setCollapsed,
}) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const mainNavItems = [
    { id: "home", label: "Overview", icon: LayoutGrid, shortcut: "1" },
    { id: "query-editor", label: "AI Query Studio", icon: Sparkles, tag: "AI", shortcut: "2" },
    { id: "dashboards", label: "Dashboards", icon: LayoutDashboard, count: savedDashboards.length, shortcut: "3" },
    { id: "data-sources", label: "Data Sources", icon: Database, shortcut: "4" },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  const toggleTheme = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast-mode");
  };

  return (
    <>
      <aside
        className={`app-sidebar ${collapsed ? "sidebar-collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* TOP BRANDING & COLLAPSE TOGGLE */}
        <div className="sidebar-header-strip">
          <div
            onClick={() => handleNavClick("home")}
            style={{ cursor: "pointer" }}
            title={collapsed ? "AIQ — Ask Smarter. Query Faster." : ""}
          >
            <AiqLogo size={32} showText={!collapsed} showTagline={false} />
          </div>

          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed && setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar (Ctrl+\\)" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* SCROLLABLE NAVIGATION AREA */}
        <div className="sidebar-scrollable-area">
          {/* PRIMARY NAVIGATION */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Navigation</div>
            <nav className="sidebar-nav">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-item ${isActive ? "active" : ""}`}
                    onClick={() => handleNavClick(item.id)}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="nav-icon" size={17} />
                    <span className="nav-label">{item.label}</span>
                    {item.tag && <span className="nav-tag">{item.tag}</span>}
                    {item.count !== undefined && item.count > 0 && !item.tag && (
                      <span className="sidebar-recent-pill" style={{ marginLeft: "auto" }}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SECONDARY SECTION: RECENT QUERIES */}
          {!collapsed && (
            <div className="sidebar-section sidebar-recent-section">
              <div className="sidebar-section-title" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Recent Queries</span>
                <History size={12} style={{ color: "var(--text-muted)" }} />
              </div>

              <div className="sidebar-recent-list">
                {recentQueries && recentQueries.length > 0 ? (
                  recentQueries.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id || index}
                      className="sidebar-recent-item"
                      onClick={() => {
                        onSelectQuery(item);
                        if (setMobileOpen) setMobileOpen(false);
                      }}
                      title={item.question}
                    >
                      <div className="sidebar-recent-text">{item.question}</div>
                      <div className="sidebar-recent-meta">
                        <span className="sidebar-recent-link">Open query</span>
                        {item.rowsCount !== undefined && (
                          <span className="sidebar-recent-pill">{item.rowsCount} rows</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="sidebar-recent-empty">No recent queries yet</div>
                )}
              </div>
            </div>
          )}

          {/* SECONDARY SECTION: PINNED DASHBOARDS */}
          {!collapsed && savedDashboards && savedDashboards.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Saved Queries</span>
                <Bookmark size={12} style={{ color: "var(--text-muted)" }} />
              </div>

              <div className="sidebar-recent-list">
                {savedDashboards.slice(0, 3).map((d) => (
                  <div
                    key={d.id}
                    className="sidebar-recent-item"
                    onClick={() => handleNavClick("dashboards")}
                    title={d.question}
                  >
                    <div className="sidebar-recent-text">{d.question}</div>
                    <div className="sidebar-recent-meta">
                      <span className="sidebar-recent-link">View in Dashboards</span>
                      <span className="sidebar-recent-pill">{d.rowsCount ?? (d.rows?.length || 0)} rows</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM: SETTINGS, THEME TOGGLE, WORKSPACE INFO */}
        <div className="sidebar-footer">
          <div
            className="sidebar-workspace-card"
            onClick={() => setShowSettingsModal(true)}
            title="Workspace Details & Settings"
          >
            <div className="sidebar-ws-avatar">AIQ</div>
            <div className="sidebar-ws-info">
              <div className="sidebar-ws-title">AIQ Workspace</div>
              <div className="sidebar-ws-sub">Production Environment</div>
            </div>
            {!collapsed && (
              <SettingsIcon size={14} style={{ color: "var(--text-muted)", marginLeft: "auto" }} />
            )}
          </div>
        </div>
      </aside>

      {/* SETTINGS / WORKSPACE MODAL */}
      {showSettingsModal && (
        <div
          className="settings-modal-backdrop"
          onClick={() => setShowSettingsModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            className="settings-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-xl)",
              width: "100%",
              maxWidth: "480px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AiqLogo size={24} showText={false} />
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#FFFFFF" }}>
                  AIQ Platform Settings
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div
                style={{
                  background: "var(--bg-surface)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>Appearance Mode</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {highContrast ? "High Contrast Dark" : "SaaS Deep Slate"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                  }}
                >
                  {highContrast ? <Sun size={14} /> : <Moon size={14} />}
                  <span>Toggle</span>
                </button>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>
                  Guardrails & Safety
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={14} style={{ color: "var(--color-success)" }} />
                  <span>Read-Only SQL validator & strict AST inspection enabled.</span>
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Keyboard size={14} />
                  <span>Keyboard Shortcuts</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                  <span>Execute query</span>
                  <strong style={{ color: "var(--text-secondary)" }}>Enter</strong>
                  <span>Insert newline</span>
                  <strong style={{ color: "var(--text-secondary)" }}>Shift + Enter</strong>
                  <span>Switch data source</span>
                  <strong style={{ color: "var(--text-secondary)" }}>Alt + S</strong>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn-primary-gradient"
                onClick={() => setShowSettingsModal(false)}
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
