function ErrorState({ message, retry, isTesting, restoreConnection }) {
  return <section className="error-state" role="alert"><p className="error-symbol" aria-hidden="true">!</p><p className="eyebrow">Connection interrupted</p><h2>Agent data is unavailable</h2><p>We couldn’t reach the Valorant agent database. Check your connection and try again.</p><p className="technical-error">{message}</p><div className="error-actions"><button className="primary-button" type="button" onClick={retry}>Try again</button>{isTesting && <button className="secondary-button" type="button" onClick={restoreConnection}>Restore live API</button>}</div></section>
}

export default ErrorState
