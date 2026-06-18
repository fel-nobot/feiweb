"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";

/**
 * Interactive future-state org chart — a themed, anonymized rebuild of the
 * Transformation Command Center's org view. Mirrors the real tool's structure
 * and interactions (Current ↔ New toggle, expand/collapse, pan & zoom, search)
 * but every role, department, and number is invented placeholder data. No
 * person names are shown, by design.
 */

type Status = "stay" | "eliminated" | "moved" | "pending";

type Person = {
  role: string;
  dept: string;
  area: string;
  status: Status;
  newManager?: string;
  kids: string[];
};

const PEOPLE: Record<string, Person> = {
  ceo: { role: "Chief Executive", dept: "Executive", area: "Exec", status: "stay", kids: ["ops", "merch", "mkt", "pt", "sc"] },

  ops: { role: "VP, Operations", dept: "Operations", area: "Operations", status: "stay", kids: ["ops-d1", "ops-d2", "ops-m1"] },
  "ops-d1": { role: "Director, Fulfillment", dept: "Fulfillment", area: "Operations", status: "stay", kids: ["ops-i1", "ops-i2"] },
  "ops-i1": { role: "Operations Manager", dept: "Fulfillment", area: "Operations", status: "stay", kids: [] },
  "ops-i2": { role: "Operations Manager II", dept: "Fulfillment", area: "Operations", status: "eliminated", kids: [] },
  "ops-d2": { role: "Director, Logistics", dept: "Logistics", area: "Operations", status: "moved", newManager: "sc", kids: ["ops-i3"] },
  "ops-i3": { role: "Logistics Coordinator", dept: "Logistics", area: "Operations", status: "stay", kids: [] },
  "ops-m1": { role: "Manager, Facilities", dept: "Facilities", area: "Operations", status: "pending", kids: [] },

  merch: { role: "VP, Merchandising", dept: "Merchandising", area: "Merchandising", status: "stay", kids: ["merch-d1", "merch-m1"] },
  "merch-d1": { role: "Director, Buying", dept: "Buying", area: "Merchandising", status: "stay", kids: ["merch-i1", "merch-i2"] },
  "merch-i1": { role: "Category Buyer", dept: "Buying", area: "Merchandising", status: "stay", kids: [] },
  "merch-i2": { role: "Category Buyer", dept: "Buying", area: "Merchandising", status: "eliminated", kids: [] },
  "merch-m1": { role: "Manager, Strategy", dept: "Strategy", area: "Merchandising", status: "moved", newManager: "pt", kids: [] },

  mkt: { role: "VP, Marketing", dept: "Marketing", area: "Marketing", status: "stay", kids: ["mkt-d1", "mkt-m1"] },
  "mkt-d1": { role: "Director, Growth", dept: "Growth", area: "Marketing", status: "stay", kids: ["mkt-i1"] },
  "mkt-i1": { role: "Growth Marketer", dept: "Growth", area: "Marketing", status: "stay", kids: [] },
  "mkt-m1": { role: "Manager, Content", dept: "Content", area: "Marketing", status: "eliminated", kids: [] },

  pt: { role: "VP, Product & Tech", dept: "Product & Tech", area: "Product & Tech", status: "stay", kids: ["pt-d1", "pt-d2"] },
  "pt-d1": { role: "Director, Product", dept: "Product", area: "Product & Tech", status: "stay", kids: ["pt-i1"] },
  "pt-i1": { role: "Product Manager", dept: "Product", area: "Product & Tech", status: "pending", kids: [] },
  "pt-d2": { role: "Director, Engineering", dept: "Engineering", area: "Product & Tech", status: "stay", kids: ["pt-i2", "pt-i3"] },
  "pt-i2": { role: "Engineering Manager", dept: "Engineering", area: "Product & Tech", status: "stay", kids: [] },
  "pt-i3": { role: "Senior Engineer", dept: "Engineering", area: "Product & Tech", status: "eliminated", kids: [] },

  sc: { role: "VP, Supply Chain", dept: "Supply Chain", area: "Supply Chain", status: "stay", kids: ["sc-m1"] },
  "sc-m1": { role: "Manager, Procurement", dept: "Procurement", area: "Supply Chain", status: "stay", kids: [] },
};

const ALL_IDS = Object.keys(PEOPLE);
type Mode = "old" | "new";

function buildMap(mode: Mode): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  ALL_IDS.forEach((id) => {
    map[id] = PEOPLE[id].kids.filter((k) => (mode === "new" ? PEOPLE[k].status !== "eliminated" : true));
  });
  if (mode === "new") {
    Object.entries(PEOPLE).forEach(([id, p]) => {
      if (p.status === "moved" && p.newManager && map[p.newManager]) {
        Object.keys(map).forEach((pid) => { map[pid] = map[pid].filter((c) => c !== id); });
        map[p.newManager].push(id);
      }
    });
  }
  return map;
}

const MAP: Record<Mode, Record<string, string[]>> = { old: buildMap("old"), new: buildMap("new") };

function subtreeCount(id: string, mode: Mode): number {
  return (MAP[mode][id] || []).reduce((n, c) => n + 1 + subtreeCount(c, mode), 0);
}

const AREAS = Array.from(new Set(Object.values(PEOPLE).map((p) => p.area))).filter((a) => a !== "Exec");
function areaCounts(area: string) {
  const list = Object.values(PEOPLE).filter((p) => p.area === area);
  return { before: list.length, after: list.filter((p) => p.status !== "eliminated").length };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function OrgChartDemo() {
  const [mode, setMode] = useState<Mode>("old");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["ceo", "ops", "merch", "mkt", "pt", "sc"]));
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Wheel zoom (non-passive so we can preventDefault).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => clamp(s * (e.deltaY < 0 ? 1.1 : 0.9), 0.4, 2));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to pan.
  useEffect(() => {
    if (!dragging) return;
    const mv = (e: MouseEvent) =>
      setPan({ x: start.current.px + (e.clientX - start.current.x), y: start.current.py + (e.clientY - start.current.y) });
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  const onDown = (e: ReactMouseEvent) => {
    start.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    setDragging(true);
  };

  const q = query.trim().toLowerCase();
  const matches = (id: string) => q.length > 0 && (PEOPLE[id].role + " " + PEOPLE[id].dept).toLowerCase().includes(q);
  const openSet = useMemo(() => (q ? new Set(ALL_IDS) : expanded), [q, expanded]);

  const renderNode = (id: string): ReactNode => {
    const p = PEOPLE[id];
    const kids = MAP[mode][id];
    const hasKids = kids.length > 0;
    const open = openSet.has(id);
    const count = subtreeCount(id, mode);
    const cls = [
      "orgx-card",
      id === "ceo" ? "orgx-card--root" : "",
      mode === "old" && p.status === "eliminated" ? "orgx-card--elim" : "",
      p.status === "pending" ? "orgx-card--pending" : "",
      p.status === "moved" ? "orgx-card--moved" : "",
      matches(id) ? "orgx-card--hl" : "",
    ].filter(Boolean).join(" ");
    const title =
      `${p.role} · ${p.dept}` +
      (p.status === "moved" && p.newManager ? ` · reassigned to ${PEOPLE[p.newManager].area}` : "") +
      (p.status === "pending" ? " · pending" : "") +
      (p.status === "eliminated" ? " · eliminated" : "");

    return (
      <li key={id}>
        <div className="orgx-nodewrap">
          <div className={cls} title={title} onMouseDown={(e) => e.stopPropagation()}>
            <span className="orgx-role">{p.role}</span>
            <span className="orgx-sub">{p.dept} · {p.area}</span>
            {count > 0 && <span className="orgx-count">{count}</span>}
          </div>
          {hasKids && (
            <button
              className={`orgx-dot${open ? " orgx-dot--open" : ""}`}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggle(id)}
              aria-label={open ? "Collapse" : "Expand"}
            >
              {open ? "–" : count}
            </button>
          )}
        </div>
        {hasKids && open && <ul>{kids.map(renderNode)}</ul>}
      </li>
    );
  };

  return (
    <div className="orgx">
      <div className="orgx-bar">
        <div className="orgx-modes">
          <button className={mode === "old" ? "on" : ""} onClick={() => setMode("old")}>Current org</button>
          <button className={mode === "new" ? "on" : ""} onClick={() => setMode("new")}>New org · post-reduction</button>
        </div>
        <div className="orgx-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search role or team"
            aria-label="Search the org chart"
          />
        </div>
        <div className="orgx-actions">
          <button onClick={() => setExpanded(new Set(ALL_IDS))}>Expand all</button>
          <button onClick={() => setExpanded(new Set(["ceo"]))}>Collapse</button>
          <div className="orgx-zoom">
            <button onClick={() => setScale((s) => clamp(s * 0.9, 0.4, 2))} aria-label="Zoom out">−</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale((s) => clamp(s * 1.1, 0.4, 2))} aria-label="Zoom in">+</button>
            <button onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }} aria-label="Reset view">1:1</button>
          </div>
        </div>
        <span className="cc-placeholder-tag">Placeholder data</span>
      </div>

      <div className="orgx-legend">
        <span><i className="orgx-leg" style={{ background: "var(--green)" }} /> Retained</span>
        <span><i className="orgx-leg" style={{ background: "#b4584f" }} /> Eliminated</span>
        <span><i className="orgx-leg" style={{ background: "#3f72a8" }} /> Moved</span>
        <span><i className="orgx-leg orgx-leg--pending" /> Pending</span>
      </div>

      <div
        ref={wrapRef}
        className={`orgx-canvas-wrap${dragging ? " dragging" : ""}`}
        onMouseDown={onDown}
      >
        <div className="orgx-canvas" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}>
          <div className="orgx-summaries">
            {AREAS.map((a) => {
              const { before, after } = areaCounts(a);
              const pct = Math.round(((before - after) / before) * 100);
              return (
                <div className="orgx-sum" key={a}>
                  <span className="orgx-sum-area">{a}</span>
                  <span className="orgx-sum-hc">{before} → {after}</span>
                  <span className={`orgx-sum-pct${pct > 0 ? " down" : ""}`}>{pct > 0 ? `−${pct}%` : "—"}</span>
                </div>
              );
            })}
          </div>
          <ul className="orgx-tree">{renderNode("ceo")}</ul>
        </div>
        <span className="orgx-hint">Scroll to zoom · drag to pan</span>
      </div>
    </div>
  );
}
