import React, { useState } from "react";
import { Copy, Check, Terminal, Info, ShieldCheck, Sparkles } from "lucide-react";

export default function SqlPanel({ sql, explanation }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!sql) return;
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = sql;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="generated-sql-panel">
      {/* Panel Header */}
      <div className="sql-panel-header">
        <div className="sql-panel-title-wrap">
          <Terminal size={14} className="sql-icon" />
          <span className="sql-panel-title">Generated SQL</span>
          {sql && (
            <span
              style={{
                fontSize: "11px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 8px",
                borderRadius: "var(--radius-xs)",
                background: "rgba(34, 197, 94, 0.12)",
                color: "#4ADE80",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                marginLeft: "6px",
              }}
            >
              <ShieldCheck size={11} />
              Validated
            </span>
          )}
        </div>

        {sql && (
          <button
            type="button"
            className="btn-copy-sql"
            onClick={handleCopy}
            title="Copy SQL to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="copy-icon-copied" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy SQL</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Display Area */}
      <div className="sql-code-container">
        {sql ? (
          <pre className="sql-code-block">
            <code>{sql}</code>
          </pre>
        ) : (
          <div className="sql-placeholder">
            <Sparkles size={14} style={{ marginRight: "8px", color: "var(--accent-primary-light)" }} />
            Your AI-generated PostgreSQL query will appear here.
          </div>
        )}
      </div>

      {/* Explanation Bar */}
      {explanation && (
        <div className="sql-explanation-bar">
          <Info size={14} className="info-icon" />
          <span className="explanation-text">{explanation}</span>
        </div>
      )}
    </div>
  );
}
