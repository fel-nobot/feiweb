"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const IMAGES = ["/portrait1.jpg", "/portrait2.jpg", "/portrait3.jpg"];
const INTERVAL_MS = 4000; // 4 seconds

export default function PhotoCarousel() {
  const images = useMemo(() => IMAGES.filter(Boolean), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-rotate
  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, images.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      style={{ position: "relative", width: "100%", height: 520, overflow: "hidden" }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <Image
            src={src}
            alt="Felicity Yang"
            fill
            style={{ objectFit: "cover" }}
            priority={i === index}
          />
        </div>
      ))}

      {/* dots */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
          }}
        >
          {images.map((_, i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i === index ? "var(--fg)" : "var(--border)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}