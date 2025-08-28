"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import PhotoCarousel from "../components/PhotoCarousel";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main>
      {/* Header */}
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
            <Link className="navlink" href="#about">
              About
            </Link>
            <Link className="navlink" href="/story">
              Story
            </Link>
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

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <h2>About</h2>

          <div className="about-swap" style={{ marginTop: ".75rem" }}>
            {/* Text */}
            <div className="about-text">
              <p>
                <a
                  href="https://www.linkedin.com/in/felyang/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Felicity
                </a>{" "}
                has built a global career spanning big retail, deep tech, and
                high-growth startups. She began with{" "}
                <a
                  href="https://sustainability.decathlon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Decathlon
                </a>{" "}
                in China and France before moving into autonomous driving in the
                U.S., where she partnered with founders and engineers to shape
                talent strategies during a period of breakthrough innovation.
              </p>
              <p>
                Felicity holds a{" "}
                <a
                  href="https://www.ilr.cornell.edu/programs/graduate-degree-programs/master-industrial-and-labor-relations-milr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Master’s degree in Industrial and Labor Relations
                </a>{" "}
                from{" "}
                <a
                  href="https://www.cornell.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cornell University
                </a>
                , widely recognized as the leading graduate program for human
                resources and people strategy in the United States. She also
                earned dual Bachelor’s degrees in English Literature and Law.
              </p>
              <p>
                Since 2020, Felicity has been helping scale{" "}
                <a
                  href="https://www.sayweee.com/company/our-story"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Weee!
                </a>{" "}
                from fewer than 100 to over 1,000 employees, driving 40% annual
                revenue growth while building a nationwide, multicultural
                community.
              </p>

              <p style={{ marginTop: "1rem" }}>
                <Link href="/story">Read Felicity’s story →</Link>
              </p>
            </div>

            {/* Portrait Carousel */}
            <div className="about-media">
              <PhotoCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
          <a className="navlink" href="mailto:qy68@cornell.edu">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}