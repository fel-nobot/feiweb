"use client";
import { useState } from "react";

const images = ["/portrait1.jpg", "/portrait2.jpg", "/portrait3.jpg"];

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  function next() { setIndex((index + 1) % images.length); }
  function prev() { setIndex((index - 1 + images.length) % images.length); }
  return (
    <div>
      <img src={images[index]} alt="Felicity Yang" className="portrait" />
      <div style={{marginTop:".5rem", display:"flex", justifyContent:"center", gap:"1rem"}}>
        <button onClick={prev}>←</button>
        <button onClick={next}>→</button>
      </div>
    </div>
  );
}
