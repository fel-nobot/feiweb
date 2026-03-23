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
  { name: "…", desc: "more to come" },
];

const mountains = [
  { name: "Silver Peak", loc: "Sierra Nevada / CA, US" },
  { name: "Castle Peak", loc: "Sierra Nevada / CA, US" },
  { name: "Palisades", loc: "CA, US" },
  { name: "Jake's Peak", loc: "Lake Tahoe / CA, US" },
  { name: "Mt. Tallac", loc: "Lake Tahoe / CA, US" },
  { name: "Red Lake Peak", loc: "Carson Pass / CA, US" },
  { name: "Tumalo Mountain", loc: "Bend / OR, US" },
  { name: "The Cone", loc: "Mt. Bachelor / OR, US" },
  { name: "Crater Lake", loc: "OR, US" },
  { name: "Mt. Hood", loc: "Hood River / OR, US" },
  { name: "Asahidake", loc: "Daisetsuzan / Hokkaido, JP" },
  { name: "Mt. Yotei", loc: "Niseko / Hokkaido, JP" },
  { name: "NRC Gully", loc: "Rogers Pass / BC, Canada" },
  { name: "Ross Peak", loc: "Banff / BC, Canada" },
  { name: "Mt. Shasta", loc: "CA, US" },
];

export default function StoryPage() {
  return (
    <main>
      <header className="header header--scrolled">
        <div className="container">
          <nav className="navwrap">
            <Link href="/" className="nav-greeting">
              Hi. I'm Felicity.<br />
              I'm a People leader at Weee!, an operator and advisor to founders.
            </Link>
            <div className="nav-right">
              <div className="nav-links">
                <Link className="navlink" href="/#who">About</Link>
                <Link className="navlink" href="/#work">Work</Link>
                <Link className="navlink" href="/story">Experiences</Link>
              </div>
              <a href="https://t.me/felyang_bot" target="_blank" rel="noopener noreferrer" className="nav-cta">
                Let's talk
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <section className="section section--bg" style={{
        backgroundImage: "url('/photo_experiences.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
        <div className="section-bg-overlay" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p className="section-label">Experiences</p>
          <div className="exp-grid">
            <div className="exp-col">
              <p className="exp-col-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>Where I've worked</p>
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
              <p className="exp-col-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z"/><path d="M9 17h6"/></svg>Who I've advised</p>
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
              <p className="exp-col-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20l6-10 4 5 3-4 5 9H3z"/></svg>Mountains I've explored</p>
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
          <span>© {new Date().getFullYear()} Felicity Yang. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="mailto:felyqz@gmail.com" className="footer-contact-link" aria-label="Gmail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Gmail</span>
            </a>
            <a href="https://t.me/felyang_bot" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="Telegram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 3L3 10.5l6.75 2.25L21 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9.75 12.75L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9.75 12.75v6l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
