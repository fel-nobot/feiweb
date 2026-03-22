"use client";

import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { useEffect, useRef } from "react";

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

const mapData = [
  {
    id: "map-ca",
    label: "California",
    center: [38.5, -120.0] as [number, number],
    zoom: 7,
    peaks: [
      { name: "Silver Peak", lat: 39.17, lng: -120.23 },
      { name: "Castle Peak", lat: 39.37, lng: -120.37 },
      { name: "Palisades", lat: 39.19, lng: -120.24 },
      { name: "Jake's Peak", lat: 38.96, lng: -120.14 },
      { name: "Mt. Tallac", lat: 38.9, lng: -120.1 },
      { name: "Red Lake Peak", lat: 38.67, lng: -119.97 },
      { name: "Mt. Shasta", lat: 41.41, lng: -122.19 },
    ],
  },
  {
    id: "map-or",
    label: "Oregon",
    center: [44.2, -121.7] as [number, number],
    zoom: 6,
    peaks: [
      { name: "Tumalo Mountain", lat: 43.99, lng: -121.69 },
      { name: "The Cone", lat: 43.96, lng: -121.72 },
      { name: "Crater Lake", lat: 42.94, lng: -122.1 },
      { name: "Mt. Hood", lat: 45.37, lng: -121.7 },
    ],
  },
  {
    id: "map-bc",
    label: "BC, Canada",
    center: [51.0, -116.5] as [number, number],
    zoom: 7,
    peaks: [
      { name: "NRC Gully", lat: 51.3, lng: -117.52 },
      { name: "Ross Peak", lat: 51.18, lng: -115.57 },
    ],
  },
  {
    id: "map-jp",
    label: "Hokkaido, Japan",
    center: [43.3, 141.8] as [number, number],
    zoom: 7,
    peaks: [
      { name: "Asahidake", lat: 43.66, lng: 142.85 },
      { name: "Mt. Yotei", lat: 42.83, lng: 140.81 },
    ],
  },
];

function LeafletMap({ id, center, zoom, peaks }: {
  id: string;
  center: [number, number];
  zoom: number;
  peaks: { name: string; lat: number; lng: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(ref.current!, {
        center,
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#BA7517;border:2px solid white;box-shadow:0 0 0 1.5px #BA7517;cursor:pointer;"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -8],
      });

      peaks.forEach((p) => {
        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<span style="font-size:12px;font-weight:500;font-family:sans-serif">${p.name}</span>`,
            { closeButton: false, offset: [0, -2] }
          );
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={ref} style={{ height: "220px", width: "100%" }} />;
}

export default function StoryPage() {
  return (
    <main>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

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
          <h2 className="exp-heading">Where I've worked</h2>
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
          <h2 className="exp-heading" style={{ marginTop: "2.5rem" }}>Who I've advised</h2>
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
          <h2 className="exp-heading" style={{ marginTop: "2.5rem" }}>Mountains I've explored</h2>
          <div className="map-grid">
            {mapData.map((m) => (
              <div key={m.id} className="map-card">
                <div className="map-card-label">{m.label}</div>
                <LeafletMap
                  id={m.id}
                  center={m.center}
                  zoom={m.zoom}
                  peaks={m.peaks}
                />
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
