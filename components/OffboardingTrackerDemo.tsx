"use client";

import { useState } from "react";

/**
 * Offboarding Tracker — themed, anonymized rebuild of the web app. Mirrors the
 * real tool's schema (case pipeline + per-case completion checklist across
 * docs, payroll, and access revocation) with invented placeholder data only.
 * No real names; cases are shown as anonymized IDs.
 */

const TASKS = [
  "Separation notice",
  "ADP completed",
  "Final pay sent",
  "Time off cleared",
  "Property returned",
  "Internal access",
  "SaaS access",
  "Email access",
  "Exit interview",
];

type Type = "Voluntary" | "Involuntary";
type Stage = "Initiated" | "Docs & payroll" | "Access revoked" | "Complete";

type Case = {
  id: string;
  type: Type;
  location: string;
  lastDay: string;
  stage: Stage;
  done: boolean[];
};

const B = (...idx: number[]) => TASKS.map((_, i) => idx.includes(i));

const CASES: Case[] = [
  { id: "OFB-2041", type: "Voluntary", location: "HQ — West", lastDay: "Jun 06", stage: "Complete", done: B(0, 1, 2, 3, 4, 5, 6, 7, 8) },
  { id: "OFB-2042", type: "Involuntary", location: "FC — East", lastDay: "Jun 09", stage: "Access revoked", done: B(0, 1, 2, 3, 4, 5, 6) },
  { id: "OFB-2043", type: "Voluntary", location: "Remote", lastDay: "Jun 12", stage: "Docs & payroll", done: B(0, 1, 3) },
  { id: "OFB-2044", type: "Voluntary", location: "FC — Central", lastDay: "Jun 14", stage: "Complete", done: B(0, 1, 2, 3, 4, 5, 6, 7, 8) },
  { id: "OFB-2045", type: "Involuntary", location: "HQ — West", lastDay: "Jun 17", stage: "Initiated", done: B(0) },
  { id: "OFB-2046", type: "Voluntary", location: "FC — South", lastDay: "Jun 20", stage: "Access revoked", done: B(0, 1, 2, 4, 5, 6) },
  { id: "OFB-2047", type: "Voluntary", location: "Remote", lastDay: "Jun 23", stage: "Docs & payroll", done: B(0, 1) },
  { id: "OFB-2048", type: "Involuntary", location: "FC — East", lastDay: "Jun 27", stage: "Initiated", done: B() },
];

const STAGE_COLOR: Record<Stage, string> = {
  Initiated: "var(--muted)",
  "Docs & payroll": "#c08a2d",
  "Access revoked": "#3f72a8",
  Complete: "var(--green)",
};

type Filter = "All" | Type;

export default function OffboardingTrackerDemo() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<string | null>(null);

  const rows = CASES.filter((c) => filter === "All" || c.type === filter);
  const inProgress = CASES.filter((c) => c.stage !== "Complete").length;
  const complete = CASES.filter((c) => c.stage === "Complete").length;
  const involuntary = CASES.filter((c) => c.type === "Involuntary").length;

  return (
    <div className="ot">
      <div className="ot-bar">
        <div className="ot-filters">
          {(["All", "Voluntary", "Involuntary"] as Filter[]).map((f) => (
            <button key={f} className={`ot-chip${filter === f ? " ot-chip--on" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <span className="cc-placeholder-tag">Placeholder data</span>
      </div>

      <div className="ot-kpis">
        <div className="ot-kpi"><span className="ot-kpi-num">{CASES.length}</span><span className="ot-kpi-label">Cases</span></div>
        <div className="ot-kpi"><span className="ot-kpi-num">{inProgress}</span><span className="ot-kpi-label">In progress</span></div>
        <div className="ot-kpi"><span className="ot-kpi-num">{complete}</span><span className="ot-kpi-label">Complete</span></div>
        <div className="ot-kpi"><span className="ot-kpi-num">{involuntary}</span><span className="ot-kpi-label">Involuntary</span></div>
      </div>

      <div className="ot-head">
        <span>Case</span><span>Type</span><span>Location</span><span>Last day</span><span>Progress</span><span>Stage</span>
      </div>
      <ul className="ot-rows">
        {rows.map((c) => {
          const doneCount = c.done.filter(Boolean).length;
          const pct = Math.round((doneCount / TASKS.length) * 100);
          const isOpen = open === c.id;
          return (
            <li key={c.id} className="ot-rowwrap">
              <button className="ot-row" onClick={() => setOpen(isOpen ? null : c.id)}>
                <span className="ot-id">{c.id}</span>
                <span className={`ot-type ot-type--${c.type.toLowerCase()}`}>{c.type}</span>
                <span className="ot-loc">{c.location}</span>
                <span className="ot-day">{c.lastDay}</span>
                <span className="ot-prog">
                  <span className="ot-prog-track"><span className="ot-prog-fill" style={{ width: `${pct}%` }} /></span>
                  <span className="ot-prog-val">{doneCount}/{TASKS.length}</span>
                </span>
                <span className="ot-stage" style={{ color: STAGE_COLOR[c.stage] }}>
                  <i className="cc-dot" style={{ background: STAGE_COLOR[c.stage] }} /> {c.stage}
                </span>
              </button>
              {isOpen && (
                <div className="ot-checklist">
                  {TASKS.map((t, i) => (
                    <span key={t} className={`ot-task${c.done[i] ? " ot-task--done" : ""}`}>
                      <i className="ot-check">{c.done[i] ? "✓" : "○"}</i> {t}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
