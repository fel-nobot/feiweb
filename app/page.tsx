"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import PhotoCarousel from "../components/PhotoCarousel";

export default function HomePage() {
  return (
    <main>
      {/* Header / right-aligned nav + dark mode */}
      <header className="header">
        <div className="container">
          <nav
            className="navwrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height: 68,
              gap: "1rem",
            }}
          >
            <Link className="navlink" href="#about">About</Link>
            <Link className="navlink" href="/story">Story</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="h1">Scale with clarity. Lead with heart.</h1>
        </div>
      </section>

      {/* About + Portraits */}
      <section id="about" className="section">
        <div className="container">
          <h2>About</h2>

          <div className="split" style={{ marginTop: ".75rem" }}>
            {/* Text */}
            <div>
              <p>
                Felicity Yang has built a global career spanning big retail, deep
                tech, and high-growth startups. She began with Decathlon in China
                and France before moving into autonomous driving in the U.S.,
                where she partnered with founders and engineers to shape talent
                strategies during a period of breakthrough innovation.
              </p>
              <p>
                Felicity holds a Master’s degree in Industrial and Labor Relations
                from Cornell University, widely recognized as the leading graduate
                program for human resources and people strategy in the United
                States. She also earned dual Bachelor’s degrees in English
                Literature and Law.
              </p>
              <p>
                Since 2020, Felicity has been helping scale Weee! from fewer than
                100 to over 1,000 employees, driving 40% annual revenue growth
                while building a nationwide, multicultural community.
              </p>

              <p style={{ marginTop: "1rem" }}>
                <Link href="/story">Read Felicity’s story →</Link>
              </p>
            </div>

            {/* Portrait carousel */}
            <div>
              <PhotoCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Footer — keep tiny Contact link (no big bar) */}
      <footer className="footer">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span>© {new Date().getFullYear()} Felicity Yang</span>
          <a className="navlink" href="mailto:felyqz@gmail.com">Contact</a>
        </div>
      </footer>
    </main>
  );
}