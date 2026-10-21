import React from "react";

export default function AiqLogo({ size = 28, showText = true, showTagline = false, className = "" }) {
  return (
    <div className={`aiq-brand-container ${className}`}>
      <div
        className="aiq-logo-mark"
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="aiq-logo-svg"
        >
          <rect width="32" height="32" rx="8" fill="#161D2B" />
          <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#293244" />
          {/* Geometric outer faceted loop */}
          <path
            d="M16 6L24.5 11V21L16 26L7.5 21V11L16 6Z"
            stroke="#8B5CF6"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Query core & terminal spark */}
          <circle cx="16" cy="15.5" r="3.2" fill="#06B6D4" />
          <path
            d="M18.5 18L23.5 23"
            stroke="#06B6D4"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="aiq-brand-text-col">
          <div className="aiq-brand-name-row">
            <span className="aiq-brand-name">AIQ</span>
            <span className="aiq-brand-badge">SaaS</span>
          </div>
          {showTagline && (
            <span className="aiq-brand-tagline">Ask Smarter. Query Faster.</span>
          )}
        </div>
      )}
    </div>
  );
}
