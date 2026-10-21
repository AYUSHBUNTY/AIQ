import React, { useState } from "react";
import {
  Table2,
  History,
  ChevronDown,
  ChevronRight,
  Play,
  Key,
  Layers,
  Search,
} from "lucide-react";
import RecentQueriesPanel from "./RecentQueriesPanel";

export default function StudioRightPanel({
  schemaTables = [],
  activeSource = null,
  recentQueries = [],
  onSelectQuery,
  onQueryTable,
  currentQuestion = "",
}) {
  const [activeTab, setActiveTab] = useState("schema");
  const [tableSearch, setTableSearch] = useState("");
  const [expandedTables, setExpandedTables] = useState({});

  const filteredTables = schemaTables.filter((t) =>
    t.name.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const toggleTable = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  return (
    <div className="studio-right-card">
      {/* Studio Right Tabs */}
      <div className="studio-tab-header">
        <button
          type="button"
          className={`studio-tab-btn ${activeTab === "schema" ? "active" : ""}`}
          onClick={() => setActiveTab("schema")}
        >
          <Table2 size={14} />
          <span>Schema Tables ({schemaTables.length})</span>
        </button>

        <button
          type="button"
          className={`studio-tab-btn ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => setActiveTab("recent")}
        >
          <History size={14} />
          <span>History ({recentQueries.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="studio-tab-content">
        {activeTab === "schema" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Search Tables */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search tables..."
                style={{
                  width: "100%",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "7px 10px 7px 30px",
                  fontSize: "12px",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "9px",
                  color: "var(--text-muted)",
                }}
              />
            </div>

            {/* Tables List */}
            {filteredTables.length > 0 ? (
              <div className="schema-explorer-list">
                {filteredTables.map((table) => {
                  const isExpanded = expandedTables[table.name] ?? false;
                  return (
                    <div key={table.name} className="schema-table-item">
                      <div
                        className="schema-table-head"
                        onClick={() => toggleTable(table.name)}
                      >
                        <div className="schema-table-name">
                          {isExpanded ? (
                            <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
                          ) : (
                            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
                          )}
                          <Table2 size={13} style={{ color: "var(--accent-primary-light)" }} />
                          <span>{table.name}</span>
                        </div>
                        <span className="schema-cols-count">
                          {table.columns.length} cols
                        </span>
                      </div>

                      {isExpanded && (
                        <div className="schema-table-cols">
                          {table.columns.map((col) => (
                            <div key={col.name} className="schema-col-row">
                              <span className="schema-col-name" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                {col.primary_key && (
                                  <Key size={10} style={{ color: "var(--color-warning)" }} title="Primary Key" />
                                )}
                                {col.name}
                              </span>
                              <span className="schema-col-type">{col.type}</span>
                            </div>
                          ))}

                          {onQueryTable && (
                            <button
                              type="button"
                              className="schema-quick-ask"
                              onClick={(e) => {
                                e.stopPropagation();
                                onQueryTable(`Show all records from ${table.name} limit 20`);
                              }}
                            >
                              Query this table
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 10px", color: "var(--text-muted)", fontSize: "12.5px" }}>
                {schemaTables.length === 0
                  ? "No tables loaded in active schema."
                  : "No tables matching search."}
              </div>
            )}
          </div>
        ) : (
          <RecentQueriesPanel
            recentQueries={recentQueries}
            onSelectQuery={onSelectQuery}
            currentQuestion={currentQuestion}
          />
        )}
      </div>
    </div>
  );
}
