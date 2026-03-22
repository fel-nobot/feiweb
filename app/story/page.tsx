"use client";

import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export default function StoryPage() {
  return (
    <main>
      {/* Header */}
      <header className="header header--scrolled">
        <div className="container">
          <nav className="navwrap">
            <div className="nav-left">
              <Link className="navlink" href="/#about">About</Link>
              <Link className="navlink" href="/#work">Work</Link>
              <Link className="navlink" href="/story">Story</Link>
            </div>
            <div className="nav-right">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Story content */}
      <section className="section">
        <div className="container">
          <p className="section-label">Story</p>
          <div className="story-body">

            <p>
              I grew up in the mountains of China, where there's a saying: "The benevolent
              enjoy mountains." That has always felt true to me. I love people — the stories
              and cultures they bring — and I try to see them from the heart. It's what has
              shaped the work I do today.
            </p>

            <p>
              My career began in Shanghai at{" "}
              <a href="https://sustainability.decathlon.com/" target="_blank" rel="noopener noreferrer">
                Decathlon
              </a>
              , surrounded by colleagues who seemed to excel at everything — marathoners,
              mountain bikers, even world-champion badminton players. I was not an athlete,
              not even close, but I admired their discipline so deeply that I followed their
              lead. In time, I pushed past my own limits and crossed the finish line of a
              triathlon.
            </p>

            <p>
              I was fortunate to continue with Decathlon and spend time living in France.
              Traveling across Europe, I brought the brand to schools, encouraging students
              to follow their passions. Those years taught me how much courage it takes to
              dream — and how meaningful it is to support others in doing so.
            </p>

            <p>
              I came to the U.S. for graduate school and found myself in beautiful Ithaca,
              studying{" "}
              <a
                href="https://www.ilr.cornell.edu/programs/graduate-degree-programs/master-industrial-and-labor-relations-milr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Industrial and Labor Relations
              </a>{" "}
              at{" "}
              <a href="https://www.cornell.edu/" target="_blank" rel="noopener noreferrer">
                Cornell
              </a>
              . Learning alongside leaders from diverse backgrounds deepened my belief
              that great teams don't just execute — they inspire.
            </p>

            <p>
              After Cornell, I stepped into deep tech and autonomous driving at a time of
              real breakthroughs. In 2015, Delphi's autonomous car completed a coast-to-coast
              journey, driving 3,400 miles with 99% autonomous control — proof that what once
              seemed impossible was suddenly within reach. Working with founders and brilliant
              engineers in those years taught me to ask the hardest questions — How do we help
              top talent thrive? — and to build trust in the answers.
            </p>

            <p>
              In 2020, I was introduced to Larry Liu, founder of{" "}
              <a href="https://www.sayweee.com/company/our-story" target="_blank" rel="noopener noreferrer">
                Weee!
              </a>
              . His vision for serving immigrant and multicultural communities resonated
              deeply with me — not just as a professional, but as a customer. I joined
              Weee! at the height of COVID and found myself on the frontlines of growth:
              from under 100 to over 1,000 people, from three sites to nationwide, and
              from serving one ethnic community to many. I spent time in warehouses, sat
              with drivers, and never lost sight of why we were building: to serve
              communities with care.
            </p>

            <p>
              Outside of work, I find balance in nature. I snowboard in the backcountry,
              and I tend a plot in a community garden where I learn, grow, and harvest with
              fellow gardeners. I bring home vegetables to share with neighbors — and to
              feed my small family: myself and two dogs.
            </p>

            <p className="story-back">
              <Link href="/">← Back to home</Link>
            </p>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Felicity Yang</span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/felyang/" target="_blank" rel="noopener noreferrer" className="navlink">LinkedIn</a>
            <a href="mailto:qy68@cornell.edu" className="navlink">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
