"use client";

import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

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

const mountains = [
  { name: "Silver Peak", loc: "California" },
  { name: "Castle Peak", loc: "California" },
  { name: "Palisades", loc: "California" },
  { name: "Jake's Peak", loc: "California" },
  { name: "Mt. Tallac", loc: "California" },
  { name: "Red Lake Peak", loc: "California" },
  { name: "Tumalo Mountain", loc: "Oregon" },
  { name: "The Cone", loc: "Oregon" },
  { name: "Crater Lake", loc: "Oregon" },
  { name: "Mt. Hood", loc: "Oregon" },
  { name: "Asahidake", loc: "Hokkaido, Japan" },
  { name: "Mt. Yotei", loc: "Hokkaido, Japan" },
  { name: "NRC Gully", loc: "Rogers Pass, BC" },
  { name: "Ross Peak", loc: "BC, Canada" },
  { name: "Mt. Shasta", loc: "California" },
];

export default function StoryPage() {
  return (
    <main>
      <header className="header header--scrolled">
        <div className="container">
          <nav className="navwrap">
            <div className="nav-left">
              <Link className="navlink" href="/#about">About</Link>
              <Link className="navlink" href="/#work">Work</Link>
              <Link className="navlink" href="/story">Experiences</Link>
            </div>
            <div className="nav-right">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <p className="section-label">Experiences</p>
          <div className="exp-grid">

            <div className="exp-col">
              <h2 className="exp-heading">Where I've worked</h2>
              <ul className="exp-list">
                {worked.map(({ name, desc }) => (
                  <li key={name} className="exp-item">
                    <span className="exp-name">{name}</span>
                    <span className="exp-desc">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="exp-col">
              <h2 className="exp-heading">Who I've advised</h2>
              <ul className="exp-list">
                {advised.map(({ name, desc }) => (
                  <li key={name} className="exp-item">
                    <span className="exp-name">{name}</span>
                    <span className="exp-desc">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="exp-col">
              <h2 className="exp-heading">Mountains I've explored</h2>
              <ul className="exp-list">
                {mountains.map(({ name, loc }) => (
                  <li key={name} className="exp-item">
                    <span className="exp-name">{name}</span>
                    <span className="exp-desc">{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

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
