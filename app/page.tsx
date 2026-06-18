"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import PhotoCarousel from "../components/PhotoCarousel";
import CommandCenterDemo from "../components/CommandCenterDemo";
import OffboardingTrackerDemo from "../components/OffboardingTrackerDemo";

function GmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 3L3 10.5l6.75 2.25L21 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9.75 12.75L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.75 12.75v6l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const workItems = [
  { num: "01", title: "Team building", body: "Who to hire, and why. Then when, where, and how to get it right." },
  { num: "02", title: "Org design", body: "Structures that drive outcomes and evolve as the company scales." },
  { num: "03", title: "Decisions & conversations", body: "Restructures, exits, change management, and the hard talks that move things forward." },
  { num: "04", title: "Growth strategy", body: "People decisions grounded in business outcomes." },
  { num: "05", title: "Something else entirely", body: "Not every problem fits a category. Bring me yours." },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main>
      {/* Header */}
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="container">
          <nav className="navwrap">
            <Link href="/" className="nav-greeting">
              Hi. I'm Felicity.<br />
              I'm a People leader at Weee!, an operator and advisor to founders.
            </Link>
            <div className="nav-right">
              <div className="nav-links">
                <Link className="navlink" href="#who">About</Link>
                <Link className="navlink" href="#work">Work</Link>
                <Link className="navlink" href="/story">Experiences</Link>
              </div>
              <a href="https://t.me/felyang_bot" target="_blank" rel="noopener noreferrer" className="nav-cta">
                Let's talk
              </a>
              <ThemeToggle />
              <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(v => !v)}>
                <span /><span /><span />
              </button>
            </div>
          </nav>
        </div>
        {menuOpen && (
          <div className="nav-sheet">
            <Link href="#who" className="sheetlink" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="#work" className="sheetlink" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link href="/story" className="sheetlink" onClick={() => setMenuOpen(false)}>Experiences</Link>
            <a href="https://t.me/felyang_bot" className="sheetlink sheetlink--cta" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Let's talk →</a>
            <div className="sheet-contacts">
              <a href="mailto:felyqz@gmail.com" className="sheet-contact-link" onClick={() => setMenuOpen(false)}><GmailIcon /> Gmail</a>
              <a href="https://t.me/felyang_bot" className="sheet-contact-link" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}><TelegramIcon /> Telegram</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <h1 className="h1">Scale with clarity<br />Lead with heart</h1>
            <p className="hero-sub">I make people decisions that drive real growth.</p>
          </div>
        </div>
      </section>

      {/* Who I am — merged About + Beyond */}
      <section id="who" className="section">
        <div className="container">
          <p className="section-label">Who I am</p>
          <div className="about-swap">
            <div className="about-text">
              <p>
                I grew up in Guizhou (贵州), China, a place of mountains, mist, and minority
                cultures most of the world has never heard of. It taught me to be gentle
                but resilient, logical but imaginative, rooted but always curious.
              </p>
              <p>
                Then the world opened up. Shanghai. Paris. Lille. New York. The Bay Area.
                Each place added a layer: a new language, a new way of seeing people,
                a new understanding of what makes someone feel understood.
              </p>
              <p>
                I've worked across every level of an organization, from founders building
                the next embodied AI company, to engineers teaching robots to perceive and
                move through the physical world, to operators running process improvement,
                to drivers moving packages from warehouse to customers' doors. What drives
                me isn't the transaction, it's the understanding. I take the time to
                understand what the business truly needs, what the work demands, and
                whether the person in front of me is the right fit. Sometimes the right
                call is the harder one.
              </p>
              <p>
                These days, like many others, I'm also learning and building. When the
                work needs a tool that doesn't exist yet, I make it: AI agents that take
                the recurring weight off people operations, applications that turn a messy
                org change into something you can actually see and run, research workflows
                that compress weeks into days. I don't just sponsor AI adoption; I build
                the things the work runs on.
              </p>
              <p>
                At{" "}
                <a href="https://www.sayweee.com/company/our-story" target="_blank" rel="noopener noreferrer">
                  Weee!
                </a>
                , the biggest online grocery serving ethnic communities across the U.S.,
                I was part of the people leadership that took the business from $40M to
                $1B in revenue. I know how much of that journey lived in the right
                business decisions.
              </p>
              <p>
                When I'm not thinking about people and organizations, I'm outside hiking,
                backcountry snowboarding, driving to national parks. I'm also endlessly
                curious about food and culture.
              </p>
              <p style={{ marginTop: "1.5rem" }}>
                <Link href="/story" className="story-link">See my experiences →</Link>
              </p>
            </div>
            <div className="about-media">
              <PhotoCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section id="work" className="section section--alt">
        <div className="container">
          <p className="section-label">How I work</p>
          <div className="work-grid">
            <div className="work-intro">
              <p>
                I read business and understand people. That means spending time
                understanding founders, industries, and what a business truly needs to
                move forward. I'm genuinely curious about what drives someone, what they
                need to do their best work, what they're afraid to say out loud in a
                meeting. That curiosity is what makes me useful to founders and leaders
                trying to build something real. And increasingly, I build the tools that
                make those people decisions faster, clearer, and easier to act on.
              </p>
              <p className="work-closing">I don't give you a framework. I sit with you in the problem. If you're a founder building something real, <a href="https://t.me/felyang_bot" target="_blank" rel="noopener noreferrer">I'd love to talk.</a></p>
            </div>
            <div className="work-items">
              {workItems.map(({ num, title, body }) => (
                <div className="work-item" key={num}>
                  <span className="work-num">{num}</span>
                  <div>
                    <p className="work-item-title">{title}</p>
                    <p className="work-item-body">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I build */}
      <section id="build" className="section">
        <div className="container">
          <p className="section-label">What I build</p>
          <p className="build-intro">
            Some of what I've built with AI. Shown as structure only, with names and
            numbers left out, the real work runs in production.
          </p>

          <div className="build-grid">
            <div className="build-card">
              <p className="build-card-title">Transformation Command Center</p>
              <p className="build-card-desc">
                A real-time web app that ran a company-wide reorg end to end. Interactive
                org charts, per-leader headcount analytics, and individualized
                communication dashboards, so a complex, high-stakes change could be seen,
                planned, and executed in one secured place.
              </p>
            </div>
            <div className="build-card">
              <p className="build-card-title">Autonomous People Agents</p>
              <p className="build-card-desc">
                5+ custom AI agents automating 8+ recurring workflows across Gmail,
                Calendar, Drive, and Slack (report reviews, lifecycle documentation,
                executive reporting, inbox triage), reclaiming ~8–10 hours/week, with
                human-review guardrails on all outbound communications.
              </p>
            </div>
            <div className="build-card">
              <p className="build-card-title">Immigration Case Management</p>
              <p className="build-card-desc">
                Centralized immigration tracker with case timelines, automated reminders,
                document tracking, reporting, cost tracking, and AI-powered case summaries.
              </p>
            </div>
            <div className="build-card">
              <p className="build-card-title">People Service Ticketing &amp; Workflow Platform</p>
              <p className="build-card-desc">
                Unified service portal with ticketing, workflow automation, AI-assisted
                intake, automatic routing, notifications, SLA tracking, and executive
                dashboards. Current modules: Onboarding, Offboarding, Change ticketing.
              </p>
            </div>
          </div>

          <div className="build-showcase">
            <div className="showcase-block">
              <p className="showcase-title">Transformation Command Center</p>
              <p className="showcase-sub">Interactive org chart and impact analytics</p>
              <CommandCenterDemo />
            </div>
            <div className="showcase-block">
              <p className="showcase-title">Offboarding Tracker</p>
              <p className="showcase-sub">Case pipeline with per-case completion checklist</p>
              <OffboardingTrackerDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Felicity Yang. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="mailto:felyqz@gmail.com" className="footer-contact-link" aria-label="Gmail">
              <GmailIcon /><span>Gmail</span>
            </a>
            <a href="https://t.me/felyang_bot" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="Telegram">
              <TelegramIcon /><span>Telegram</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
