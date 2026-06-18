"use client";

import { useState } from "react";
import OrgChartDemo from "./OrgChartDemo";

/**
 * Transformation Command Center showcase: an interactive org chart and impact
 * analytics. All data is invented placeholder data — structure only, no real
 * names or numbers.
 */

type Dept = { name: string; before: number; after: number };

const DEPTS: Dept[] = [
  { name: "Operations", before: 142, after: 118 },
  { name: "Merchandising", before: 96, after: 71 },
  { name: "Marketing", before: 78, after: 60 },
  { name: "Supply Chain", before: 64, after: 58 },
  { name: "Product & Tech", before: 110, after: 96 },
];

const TOTAL_BEFORE = DEPTS.reduce((s, d) => s + d.before, 0);
const TOTAL_AFTER = DEPTS.reduce((s, d) => s + d.after, 0);
const REDUCTION_PCT = Math.round(((TOTAL_BEFORE - TOTAL_AFTER) / TOTAL_BEFORE) * 100);
const MAX_BEFORE = Math.max(...DEPTS.map((d) => d.before));

const MOVEMENT = [
  { label: "Redeployed", count: 34, color: "var(--green)" },
  { label: "Backfill", count: 9, color: "#3f72a8" },
  { label: "New HC", count: 12, color: "#c08a2d" },
  { label: "Closing", count: 41, color: "#b4584f" },
];
const MAX_MOVE = Math.max(...MOVEMENT.map((m) => m.count));

const TRANSITIONS = [
  { role: "Category Buyer", from: "Merchandising", to: "Marketplace" },
  { role: "Demand Planner", from: "Planning", to: "Supply Chain" },
  { role: "Content Specialist", from: "Marketing", to: "Growth" },
  { role: "Coordinator", from: "Logistics", to: "Operations" },
];

function Analysis() {
  return (
    <div className="cc-analysis">
      <div className="cc-kpis">
        <div className="cc-kpi"><span className="cc-kpi-num">{TOTAL_BEFORE}</span><span className="cc-kpi-label">Headcount before</span></div>
        <div className="cc-kpi"><span className="cc-kpi-num">{TOTAL_AFTER}</span><span className="cc-kpi-label">After</span></div>
        <div className="cc-kpi"><span className="cc-kpi-num">{REDUCTION_PCT}%</span><span className="cc-kpi-label">Reduction</span></div>
        <div className="cc-kpi"><span className="cc-kpi-num">{DEPTS.length}</span><span className="cc-kpi-label">Organizations</span></div>
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
      </div>
      <div className="cc-demo-body">{tab === "org" ? <OrgChartDemo /> : <Analysis />}</div>
    </div>
  );
}
