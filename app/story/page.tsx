export default function StoryPage() {
  return (
    <main>
      <header className="header">
        <div className="container nav">
          <nav><a href="/">Home</a></nav>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h1 className="h1">Story</h1>
          <p>I grew up in the mountains of China, where there’s a saying: “The benevolent enjoy mountains.” That has always felt true to me. I love people — the stories and cultures they bring — and I try to see them from the heart. It’s what has shaped the work I do today.</p>
          <p>My career began in Shanghai at Decathlon, surrounded by colleagues who seemed to excel at everything — marathoners, mountain bikers, even world-champion badminton players. I was not an athlete, not even close, but I admired their discipline so deeply that I followed their lead. In time, I pushed past my own limits and crossed the finish line of a triathlon.</p>
          <p>I was fortunate to continue with Decathlon and spend time living in France. Traveling across Europe, I brought the brand to schools, encouraging students to follow their passions. Those years taught me how much courage it takes to dream — and how meaningful it is to support others in doing so.</p>
          <p>I came to the U.S. for graduate school and found myself in beautiful Ithaca, studying Industrial and Labor Relations at Cornell. Learning alongside leaders from diverse backgrounds deepened my belief that great teams don’t just execute — they inspire.</p>
          <p>After Cornell, I stepped into deep tech and autonomous driving at a time of real breakthroughs. In 2015, Delphi’s autonomous car completed a coast-to-coast journey, driving 3,400 miles with 99% autonomous control — proof that what once seemed impossible was suddenly within reach. Working with founders and brilliant engineers in those years taught me to ask the hardest questions — How do we help top talent thrive? — and to build trust in the answers.</p>
          <p>In 2020, I was introduced to Larry Liu, founder of Weee!. His vision for serving immigrant and multicultural communities resonated deeply with me — not just as a professional but as a customer. I joined Weee! at the height of COVID and found myself on the frontlines of growth: from under 100 to over 1,000 people, from three sites to nationwide, and from serving one ethnic community to many. I spent time in warehouses, sat with drivers, and never lost sight of why we were building: to serve communities with care.</p>
          <p>Outside of work, I find balance in nature. I snowboard in the backcountry, and I tend a plot in a community garden where I learn, grow, and harvest with fellow gardeners. I bring home vegetables to share with neighbors — and to feed my small family: myself and two dogs.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} Felicity Yang</span>
          <a href="/">Back to home</a>
        </div>
      </footer>
    </main>
  );
}
