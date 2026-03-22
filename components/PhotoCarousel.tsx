"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const IMAGES: { src: string; position: string }[] = [
  { src: "/portrait1.jpg", position: "center 30%" }, // lake + dogs — keep face + dogs in frame
  { src: "/portrait2.jpg", position: "center 25%" }, // ocean cliff, green hoodie — keep face visible
  { src: "/portrait3.jpg", position: "center 20%" }, // red jacket, Banff — portrait, face at top
  { src: "/portrait4.jpg", position: "center 40%" }, // skiing, smile — center action
  { src: "/portrait5.jpg", position: "center 50%" }, // group climbing — show full landscape
  { src: "/portrait6.jpg", position: "center 20%" }, // masked closeup — dramatic close crop
];

const INTERVAL_MS = 4000;

export default function PhotoCarousel() {
  const images = useMemo(() => IMAGES.filter(Boolean), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      INTERVAL_MS
    );
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
      {images.map(({ src, position }, i) => (
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
            style={{ objectFit: "cover", objectPosition: position }}
            priority={i === 0}
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
              onClick={() => setIndex(i)}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === index ? "var(--fg)" : "var(--border)",
                display: "inline-block",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
