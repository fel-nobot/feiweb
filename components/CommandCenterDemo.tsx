"use client";

import { useState } from "react";

/**
 * Anonymized, structure-only demo of the Transformation Command Center.
 * The *shape* mirrors the real tool (future-state org tree, headcount
 * movement by category, current→new transitions). Every name, number,
 * and department below is invented placeholder data — nothing here comes
 * from any actual engagement.
 */

type Status = "stable" | "restructured" | "reduced";

const STATUS_COLOR: Record<Status, string> = {
  stable: "var(--green)",
  restructured: "#c08a2d",
  reduced: "#b4584f",
};

const STATUS_LABEL: Record<Status, string> = {
  stable: "Stable",
  restructured: "Restructured",
  reduced: "Reduced",
};

type Dept = { name: string; before: number; after: number; status: Status };

const DEPTS: Dept[] = [
  { name: "Operations", before: 142, after: 118, status: "reduced" },
  { name: "Merchandising", before: 96, after: 71, status: "reduced" },
  { name: "Marketing", before: 78, after: 60, status: "restructured" },
  { name: "Supply Chain", before: 64, after: 58, status: "stable" },
  { name: "Product & Tech", before: 110, after: 96, status: "restructured" },
];

const TOTAL_BEFORE = DEPTS.reduce((s, d) => s + d.before, 0);
const TOTAL_AFTER = DEPTS.reduce((s, d) => s + d.after, 0);
const REDUCTION_PCT = Math.round(((TOTAL_BEFORE - TOTAL_AFTER) / TOTAL_BEFORE) * 100);
const MAX_BEFORE = Math.max(...DEPTS.map((d) => d.before));

// Headcount movement by category (placeholder counts).
const MOVEMENT = [
  { label: "Redeployed", count: 34, color: "var(--green)" },
  { label: "Backfill", count: 9, color: "#3f72a8" },
  { label: "New HC", count: 12, color: "#c08a2d" },
  { label: "Closing", count: 41, color: "#b4584f" },
];
const MAX_MOVE = Math.max(...MOVEMENT.map((m) => m.count));

// A few current→new transitions (roles only, no names).
const TRANSITIONS = [
  { role: "Category Buyer", from: "Merchandising", to: "Marketplace" },
  { role: "Demand Planner", from: "Planning", to: "Supply Chain" },
  { role: "Content Specialist", from: "Marketing", to: "Growth" },
  { role: "Coordinator", from: "Logistics", to: "Operations" },
];

function OrgChart() {
  const centers = [110, 300, 490, 680, 870];
  const childW = 160;
  const childY = 196;
  const busY = 150;

  return (
    <div className="cc-org">
      <span className="cc-state-pill">Future state</span>
      <svg
        className="cc-svg"
        viewBox="0 0 980 300"
        role="img"
        aria-label="Anonymized future-state organization chart with placeholder departments and headcount"
      >
        <path d={`M490 80 V ${busY} M110 ${busY} H 870`} stroke="var(--border)" strokeWidth="1.5" fill="none" />
        {centers.map((cx) => (
          <path key={cx} d={`M${cx} ${busY} V ${childY}`} stroke="var(--border)" strokeWidth="1.5" />
        ))}

        {/* Root */}
        <rect x="400" y="24" width="180" height="56" rx="10" fill="var(--alt)" stroke="var(--border)" />
        <rect x="400" y="24" width="4" height="56" rx="2" fill="var(--fg)" />
        <text x="490" y="48" textAnchor="middle" className="cc-node-title">Chief Executive</text>
        <text x="490" y="66" textAnchor="middle" className="cc-node-sub">All organizations · {TOTAL_AFTER}</text>

        {/* Departments */}
        {DEPTS.map((d, i) => {
          const x = centers[i] - childW / 2;
          const delta = d.after - d.before;
          return (
            <g key={d.name}>
              <rect x={x} y={childY} width={childW} height="56" rx="10" fill="var(--bg)" stroke="var(--border)" />
              <rect x={x} y={childY} width="4" height="56" rx="2" fill={STATUS_COLOR[d.status]} />
              <text x={centers[i]} y={childY + 24} textAnchor="middle" className="cc-node-title">{d.name}</text>
              <text x={centers[i]} y={childY + 42} textAnchor="middle" className="cc-node-sub">
                {d.after} people · {delta < 0 ? delta : `+${delta}`}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="cc-legend">
        {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
          <span key={s}><i className="cc-dot" style={{ background: STATUS_COLOR[s] }} /> {STATUS_LABEL[s]}</span>
        ))}
      </div>
    </div>
  );
}

function Analysis() {
  return (
    <div className="cc-analysis">
      <div className="cc-kpis">
        <div className="cc-kpi">
          <span className="cc-kpi-num">{TOTAL_BEFORE}</span>
          <span className="cc-kpi-label">Headcount before</span>
        </div>
        <div className="cc-kpi">
          <span className="cc-kpi-num">{TOTAL_AFTER}</span>
          <span className="cc-kpi-label">After</span>
        </div>
        <div className="cc-kpi">
          <span className="cc-kpi-num">{REDUCTION_PCT}%</span>
          <span className="cc-kpi-label">Reduction</span>
        </div>
        <div className="cc-kpi">
          <span className="cc-kpi-num">{DEPTS.length}</span>
          <span className="cc-kpi-label">Organizations</span>
        </div>
      </div>

      <div className="cc-split">
        <div className="cc-panel">
          <p className="cc-panel-title">Headcount by org · before → after</p>
          <div className="cc-bars">
            {DEPTS.map((d) => (
              <div className="cc-bar-row" key={d.name}>
                <span className="cc-bar-label">{d.name}</span>
                <div className="cc-bar-track">
                  <div className="cc-bar cc-bar--before" style={{ width: `${(d.before / MAX_BEFORE) * 100}%` }}>
                    <div className="cc-bar cc-bar--after" style={{ width: `${(d.after / d.before) * 100}%` }} />
                  </div>
                </div>
                <span className="cc-bar-val">{d.before} → {d.after}</span>
              </div>
            ))}
          </div>
          <div className="cc-legend">
            <span><i className="cc-dot cc-dot--before" /> Before</span>
            <span><i className="cc-dot cc-dot--after" /> After</span>
          </div>
        </div>

        <div className="cc-panel">
          <p className="cc-panel-title">Movement by category</p>
          <div className="cc-cats">
            {MOVEMENT.map((m) => (
              <div className="cc-cat-row" key={m.label}>
                <span className="cc-cat-label">{m.label}</span>
                <div className="cc-cat-track">
                  <div className="cc-cat-fill" style={{ width: `${(m.count / MAX_MOVE) * 100}%`, background: m.color }} />
                </div>
                <span className="cc-cat-val">{m.count}</span>
              </div>
            ))}
          </div>
          <p className="cc-panel-title cc-panel-title--sub">Sample transitions</p>
          <ul className="cc-move">
            {TRANSITIONS.map((t) => (
              <li className="cc-move-row" key={t.role + t.to}>
                <span className="cc-move-role">{t.role}</span>
                <span className="cc-move-path">{t.from} <span className="cc-arrow">→</span> {t.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CommandCenterDemo() {
  const [tab, setTab] = useState<"org" | "analysis">("org");

  return (
    <div className="cc-demo">
      <div className="cc-demo-bar">
        <div className="cc-tabs">
          <button className={`cc-tab${tab === "org" ? " cc-tab--active" : ""}`} onClick={() => setTab("org")}>
            Org chart
          </button>
          <button className={`cc-tab${tab === "analysis" ? " cc-tab--active" : ""}`} onClick={() => setTab("analysis")}>
            Impact analysis
          </button>
        </div>
        <span className="cc-placeholder-tag">Placeholder data</span>
      </div>
      <div className="cc-demo-body">{tab === "org" ? <OrgChart /> : <Analysis />}</div>
    </div>
  );
}
