function LoadingState() {
  return <section className="explorer" aria-live="polite" aria-busy="true"><div className="loading-heading"><div><p className="eyebrow">Connecting to the protocol</p><h2>Loading agent data...</h2></div><span className="spinner" aria-hidden="true" /></div><div className="agent-grid skeleton-grid" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton-image" /><div className="skeleton-line wide" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div></section>
}

export default LoadingState
