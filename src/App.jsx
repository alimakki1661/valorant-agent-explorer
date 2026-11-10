import { useCallback, useMemo, useState } from 'react'
import AgentDetails from './components/AgentDetails'
import AgentGrid from './components/AgentGrid'
import ErrorState from './components/ErrorState'
import LoadingState from './components/LoadingState'
import SearchFilters from './components/SearchFilters'
import useFetch from './hooks/useFetch'
import './App.css'

const API_URL = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true'
const BROKEN_API_URL = 'https://valorant-api.com/v1/not-a-real-endpoint'
const STATUS_LABELS = {
  loading: 'Connecting...',
  error: 'Data unavailable',
  ready: 'Live agent data',
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [testError, setTestError] = useState(false)
  const { data, loading, error, retry } = useFetch(testError ? BROKEN_API_URL : API_URL)
  // Sorted A to Z. [...data.data] copies the list first, so the fetched data itself isn't changed.
  const agents = useMemo(
    () =>
      Array.isArray(data?.data)
        ? [...data.data].sort((a, b) => a.displayName.localeCompare(b.displayName))
        : [],
    [data],
  )
  const hasBadData = !loading && !error && !Array.isArray(data?.data)
  const failure =
    error ??
    (hasBadData ? { kind: 'bad-data', detail: 'Expected data.data to be an array.' } : null)

  // Three States Pattern: the page is always in exactly one of these.
  const status = loading ? 'loading' : failure ? 'error' : 'ready'

  const roles = useMemo(() => {
    const roleNames = new Set(agents.map((agent) => agent.role?.displayName).filter(Boolean))
    return ['All', ...[...roleNames].sort()]
  }, [agents])

  const visibleAgents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return agents.filter((agent) => {
      const matchesSearch = agent.displayName.toLowerCase().includes(query)
      const matchesRole = selectedRole === 'All' || agent.role?.displayName === selectedRole
      return matchesSearch && matchesRole
    })
  }, [agents, searchTerm, selectedRole])

  function clearFilters() {
    setSearchTerm('')
    setSelectedRole('All')
  }

  // Same function on every render, so the modal's useEffect doesn't re-run needlessly.
  const closeDetails = useCallback(() => setSelectedAgent(null), [])
  // While the popup is open, `inert` stops Tab and clicks from reaching the page behind it.
  const pageInert = selectedAgent !== null

  function toggleErrorTest() {
    setTestError((current) => !current)
    setSelectedAgent(null)
  }

  return (
    <div className="app-shell">
      <header className="site-header" inert={pageInert}>
        <a className="brand" href="#top" aria-label="Valorant Agent Explorer home">
          <span className="brand-mark" aria-hidden="true">
            V
          </span>
          <span>AGENT ARCHIVE</span>
        </a>
        <span className={`api-status ${status}`}>
          <span aria-hidden="true" /> {STATUS_LABELS[status]}
        </span>
      </header>

      <main id="top" inert={pageInert}>
        <section className="hero-section" aria-labelledby="page-title">
          <p className="eyebrow">Choose your next main</p>
          <h1 id="page-title">
            Know the agent.
            <br />
            <span>Own the round.</span>
          </h1>
          <p className="hero-copy">
            Explore every playable Valorant agent, learn their abilities, and narrow the roster by
            role. Select an agent to see the full breakdown.
          </p>
        </section>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && (
          <ErrorState
            failure={failure}
            retry={retry}
            isTesting={testError}
            restoreConnection={toggleErrorTest}
          />
        )}

        {status === 'ready' && (
          <section className="explorer" aria-labelledby="roster-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Agent database</p>
                <h2 id="roster-title">Explore the roster</h2>
              </div>
              <p className="result-count">
                {visibleAgents.length} {visibleAgents.length === 1 ? 'agent' : 'agents'} found
              </p>
            </div>
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              roles={roles}
            />
            <AgentGrid
              agents={visibleAgents}
              onSelectAgent={setSelectedAgent}
              clearFilters={clearFilters}
            />
          </section>
        )}

        <section className="error-lab" aria-labelledby="error-test-title">
          <div>
            <p className="eyebrow">For project testing</p>
            <h2 id="error-test-title">Error-state simulator</h2>
            <p>
              Temporarily switches to a broken API URL so the error and retry interface can be
              graded.
            </p>
          </div>
          <button className="secondary-button" type="button" onClick={toggleErrorTest}>
            {testError ? 'Restore live API' : 'Test API error'}
          </button>
        </section>
      </main>

      <footer inert={pageInert}>
        <p>Built by Ali Makki · Data provided by Valorant-API.com</p>
      </footer>
      {selectedAgent && <AgentDetails agent={selectedAgent} onClose={closeDetails} />}
    </div>
  )
}

export default App
