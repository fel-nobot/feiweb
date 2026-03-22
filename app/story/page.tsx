"use client";

import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { useEffect } from "react";

const worked = [
  { name: "Weee!", desc: "Online grocery / e-commerce" },
  { name: "Decathlon China", desc: "Sports retail" },
  { name: "Decathlon France", desc: "Sports retail" },
  { name: "AutoX", desc: "Autonomous driving" },
  { name: "Cyngn", desc: "Industrial automation" },
  { name: "Independent Consulting", desc: "Executive search, technical recruiting & staffing" },
];

const advised = [
  { name: "Decathlon US", desc: "Sports retail" },
  { name: "Inceptio", desc: "Autonomous trucking" },
  { name: "Tensor Auto", desc: "Autonomous driving" },
  { name: "Hirect", desc: "Hiring tech" },
  { name: "Roboforce", desc: "Robotics / Physical AI" },
  { name: "Vectors Capital", desc: "Venture capital" },
];

const maps = [
  {
    id: "map-ca",
    label: "California",
    center: [38.5, -120.0],
    zoom: 7,
    peaks: [
      { name: "Silver Peak", loc: "Sierra Nevada", lat: 39.17, lng: -120.23 },
      { name: "Castle Peak", loc: "Sierra Nevada", lat: 39.37, lng: -120.37 },
      { name: "Palisades", loc: "Lake Tahoe", lat: 39.19, lng: -120.24 },
      { name: "Jake's Peak", loc: "Lake Tahoe", lat: 38.96, lng: -120.14 },
      { name: "Mt. Tallac", loc: "Lake Tahoe", lat: 38.9, lng: -120.1 },
      { name: "Red Lake Peak", loc: "Carson Pass", lat: 38.67, lng: -119.97 },
      { name: "Mt. Shasta", loc: "Northern CA", lat: 41.41, lng: -122.19 },
    ],
  },
  {
    id: "map-or",
    label: "Oregon",
    center: [44.0, -121.7],
    zoom: 7,
    peaks: [
      { name: "Tumalo Mountain", loc: "Bend", lat: 43.99, lng: -121.69 },
      { name: "The Cone", loc: "Mt. Bachelor", lat: 43.98, lng: -121.69 },
      { name: "Crater Lake", loc: "Oregon", lat: 42.94, lng: -122.1 },
      { name: "Mt. Hood", loc: "Oregon", lat: 45.37, lng: -121.7 },
    ],
  },
  {
    id: "map-bc",
    label: "BC, Canada",
    center: [51.3, -117.5],
    zoom: 7,
    peaks: [
      { name: "NRC Gully", loc: "Rogers Pass", lat: 51.3, lng: -117.52 },
      { name: "Ross Peak", loc: "BC, Canada", lat: 51.18, lng: -115.57 },
    ],
  },
  {
    id: "map-jp",
    label: "Hokkaido, Japan",
    center: [43.5, 142.5],
    zoom: 7,
    peaks: [
      { name: "Asahidake", loc: "Daisetsuzan NP", lat: 43.66, lng: 142.85 },
      { name: "Mt. Yotei", loc: "Niseko", lat: 42.83, lng: 140.81 },
    ],
  },
];

export default function StoryPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const L = (window as any).L;
    if (!L) return;

    maps.forEach((m) => {
      const el = document.getElementById(m.id);
      if (!el || (el as any)._leaflet_id) return;

      const map = L.map(m.id, { zoomControl: true, scrollWheelZoom: false }).setView(m.center, m.zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#BA7517;border:2px solid white;box-shadow:0 0 0 1px #BA7517;"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      m.peaks.forEach((p) => {
        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong style="font-size:12px">${p.name}</strong><br><span style="font-size:11px;color:#64748b">${p.loc}</span>`, {
            closeButton: false,
            offset: [0, -4],
          });
      });
    });
  }, []);

  return (
    <main>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" />

      <header className="header header--scrolled">
        <div className="container">
          <nav className="navwrap">
            <div className="nav-left">
              <Link className="navlink" href="/#about">About</Link>
              <Link className="navlink" href="/#work">Work</Link>
              <Link className="navlink" href="/story">Experiences</Link>
            </div>
            <div className="nav-right"><ThemeToggle /></div>
          </nav>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <p className="section-label">Experiences</p>

          {/* Where I've worked */}
          <h2 className="exp-heading" style={{ marginBottom: "1rem" }}>Where I've worked</h2>
          <table className="co-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {worked.map(({ name, desc }) => (
                <tr key={name}>
                  <td className="co-name">{name}</td>
                  <td className="co-desc">{desc}</td>
                  <td><span className="co-tag worked">Worked</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Who I've advised */}
          <h2 className="exp-heading" style={{ marginBottom: "1rem" }}>Who I've advised</h2>
          <table className="co-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {advised.map(({ name, desc }) => (
                <tr key={name}>
                  <td className="co-name">{name}</td>
                  <td className="co-desc">{desc}</td>
                  <td><span className="co-tag advised">Advised</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mountains */}
          <h2 className="exp-heading" style={{ margin: "2.5rem 0 1rem" }}>Mountains I've explored</h2>
          <div className="map-grid">
            {maps.map((m) => (
              <div key={m.id} className="map-card">
                <div className="map-card-label">{m.label}</div>
                <div id={m.id} style={{ height: "220px", width: "100%" }} />
              </div>
            ))}
          </div>

          <p className="story-back" style={{ marginTop: "3rem" }}>
            <Link href="/">← Back to home</Link>
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Felicity Yang</span>
        </div>
      </footer>
    </main>
  );
}
