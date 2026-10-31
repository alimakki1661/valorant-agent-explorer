import { useState } from 'react'
import ErrorState from './components/ErrorState'
import LoadingState from './components/LoadingState'
import useFetch from './hooks/useFetch'
import './App.css'

const API_URL = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true'
const BROKEN_API_URL = 'https://valorant-api.com/v1/not-a-real-endpoint'

function App() {
  const [testError, setTestError] = useState(false)
  const { data, loading, error, retry } = useFetch(testError ? BROKEN_API_URL : API_URL)
  const agents = data?.data ?? []

  function toggleErrorTest() {
    setTestError((current) => !current)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">V</span><span>AGENT ARCHIVE</span></a>
        <span className="api-status"><span aria-hidden="true" /> Live agent data</span>
      </header>

      <main id="top">
        <section className="hero-section">
          <p className="eyebrow">Choose your next main</p>
          <h1>Know the agent.<br /><span>Own the round.</span></h1>
          <p className="hero-copy">Explore every playable Valorant agent and learn what they bring to a round.</p>
        </section>

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} retry={retry} isTesting={testError} restoreConnection={toggleErrorTest} />}
        {!loading && !error && <section className="explorer"><p className="eyebrow">Agent database</p><h2>{agents.length} playable agents loaded</h2></section>}

        <section className="error-lab">
          <div><p className="eyebrow">For project testing</p><h2>Error-state simulator</h2><p>Switch to a broken API URL to test the error and retry interface.</p></div>
          <button className="secondary-button" type="button" onClick={toggleErrorTest}>{testError ? 'Restore live API' : 'Test API error'}</button>
        </section>
      </main>
    </div>
  )
}

export default App
