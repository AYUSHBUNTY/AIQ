import React, { useRef } from "react";
import {
  Loader2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Database,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function QueryInput({
  question,
  setQuestion,
  onSubmit,
  onClearWorkspace,
  hasRunQuery,
  isLoading,
  error,
  onClearError,
  activeSource,
  sources = [],
  onSourceChange,
  onManageSources,
}) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && question.trim()) {
        onSubmit();
      }
    }
  };

  const samplePrompts = [
    "Show students with a CGPA greater than 8",
    "List total orders grouped by customer",
    "Find top 10 highest value transactions",
    "Count records per department ordered descending",
  ];

  const canClear = Boolean(question.trim() || hasRunQuery || error);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* A. DATABASE SELECTOR */}
      <div className="database-selector-bar">
        <div className="db-selector-left">
          <div className="db-selector-icon-wrap">
            <Database size={16} />
          </div>
          <div className="db-selector-info">
            <span className="db-selector-label">Target Database</span>
            <select
              className="db-selector-dropdown"
              value={activeSource?.id || ""}
              onChange={(e) => onSourceChange(e.target.value)}
              aria-label="Select Target Database"
            >
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name} {source.is_live ? "• Live" : "• Schema"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="db-selector-right">
          <span
            className={`source-type-pill ${
              activeSource?.is_live ? "live" : "schema"
            }`}
          >
            {activeSource?.is_live ? "PostgreSQL Live" : "Schema Only"}
          </span>
          <button
            type="button"
            className="source-manage-btn"
            onClick={onManageSources}
          >
            Manage Sources
          </button>
        </div>
      </div>

      {/* B. NATURAL LANGUAGE QUERY INPUT */}
      <div className="query-input-card">
        <div className="query-input-header">
          <label htmlFor="aiq-question-input" className="query-input-label">
            <Sparkles size={15} style={{ color: "var(--accent-primary-light)" }} />
            <span>Ask in Plain English</span>
          </label>

          <span className="query-input-shortcut-hint">
            <strong>Enter</strong> to ask · <strong>Shift + Enter</strong> for newline
          </span>
        </div>

        <div className="query-textarea-container">
          <textarea
            id="aiq-question-input"
            ref={textareaRef}
            className="query-textarea"
            rows={3}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (error && onClearError) onClearError();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your database..."
            disabled={isLoading}
          />
        </div>

        {/* Example Prompt Chips */}
        <div className="query-prompt-chips">
          <span className="prompt-chip-label">Suggestions:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="prompt-chip"
              onClick={() => {
                setQuestion(prompt);
                if (textareaRef.current) textareaRef.current.focus();
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Active Source Notice if schema-only */}
        {activeSource && !activeSource.is_live && (
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              background: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.2)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 12px",
            }}
          >
            Connected to <strong>{activeSource.name}</strong> (schema definition).
            SQL is generated and validated against your defined schema.
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="query-error-banner" role="alert">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div className="error-content">
              <span className="error-title">Query Rejected by Guardrails</span>
              <span className="error-message">{error}</span>
            </div>
          </div>
        )}

        {/* Footer with Guardrail tags, Clear button, and Submit */}
        <div className="query-input-footer">
          <div className="query-hints">
            <span className="hint-pill">
              <ShieldCheck size={11} style={{ color: "var(--color-success)", display: "inline", marginRight: "4px" }} />
              Read-Only SELECT
            </span>
            <span className="hint-pill">Auto LIMIT 100</span>
          </div>

          <div className="query-button-group">
            {onClearWorkspace && (
              <button
                type="button"
                className="btn-clear-workspace"
                onClick={onClearWorkspace}
                disabled={isLoading || !canClear}
                title="Reset question & results"
              >
                <RotateCcw size={13} />
                <span>Clear</span>
              </button>
            )}

            <button
              type="button"
              className="btn-ask"
              onClick={onSubmit}
              disabled={isLoading || !question.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="btn-spinner" size={15} />
                  <span>Generating SQL...</span>
                </>
              ) : (
                <>
                  <span>Ask AI</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
