"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);
  function toggle() {
    const r = document.documentElement;
    const next = !dark;
    setDark(next);
    r.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return (
    <button className="toggle" onClick={toggle} aria-label="Toggle dark mode">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
