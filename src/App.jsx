import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span>AGENT ARCHIVE</span>
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <p className="eyebrow">Choose your next main</p>
          <h1>Know the agent.<br /><span>Own the round.</span></h1>
          <p className="hero-copy">Explore the Valorant roster and learn what every agent brings to a round.</p>
        </section>
      </main>
    </div>
  )
}

export default App
