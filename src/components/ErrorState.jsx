import { useEffect } from 'react'

// One plain-language explanation for each kind of failure useFetch can report.
function describeFailure({ kind, status }) {
  if (kind === 'server') {
    return {
      label: 'Server error',
      message: `The Valorant API answered with an error (status ${status}), so the agent list didn’t load. Try again in a moment.`,
    }
  }
  if (kind === 'bad-data') {
    return {
      label: 'Unreadable data',
      message:
        'The Valorant API answered, but the agent data came back in a format this page can’t read. Try again in a moment.',
    }
  }
  return {
    label: 'Connection lost',
    message: 'We couldn’t reach the Valorant agent database. Check your connection and try again.',
  }
}

function ErrorState({ failure, retry, isTesting, restoreConnection }) {
  const { label, message } = describeFailure(failure)

  // The technical detail is for developers, so it goes to the console instead of the page.
  useEffect(() => {
    console.error(`Agent data failed to load (${failure.kind}): ${failure.detail}`)
  }, [failure.kind, failure.detail])

  return (
    <section className="error-state" role="alert">
      <p className="error-symbol" aria-hidden="true">
        !
      </p>
      <p className="eyebrow">{label}</p>
      <h2>Agent data is unavailable</h2>
      <p>{message}</p>
      <div className="error-actions">
        <button className="primary-button" type="button" onClick={retry}>
          Try again
        </button>
        {isTesting && (
          <button className="secondary-button" type="button" onClick={restoreConnection}>
            Restore live API
          </button>
        )}
      </div>
    </section>
  )
}

export default ErrorState
