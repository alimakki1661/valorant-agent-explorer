function AgentGrid({ agents, onSelectAgent, clearFilters }) {
  if (agents.length === 0)
    return (
      <div className="empty-state">
        <p className="empty-icon" aria-hidden="true">
          ?
        </p>
        <h3>No agents found</h3>
        <p>Try another name or role.</p>
        <button type="button" className="primary-button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    )

  return (
    <div className="agent-grid">
      {agents.map((agent) => (
        <button
          className="agent-card"
          type="button"
          key={agent.uuid}
          onClick={() => onSelectAgent(agent)}
          aria-label={`View ${agent.displayName} details`}
        >
          <span className="agent-art">
            <img src={agent.displayIcon} alt="" loading="lazy" />
            <span className="role-tag">{agent.role?.displayName ?? 'Unknown role'}</span>
          </span>
          <span className="agent-card-copy">
            <strong>{agent.displayName}</strong>
            <span>{agent.description}</span>
            <span className="view-link">
              View abilities <span aria-hidden="true">→</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default AgentGrid
