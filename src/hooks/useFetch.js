import { useCallback, useEffect, useState } from 'react'

function useFetch(url) {
  const [attempt, setAttempt] = useState(0)
  // Each result remembers which request (url + attempt) it answers. That lets us work out
  // `loading` during render instead of setting state at the start of the effect.
  const [result, setResult] = useState({ url: null, attempt: null, data: null, error: null })
  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      // Track which step we're on, so a failure says what kind it was:
      // 'offline' (never reached the server), 'server' (bad status), 'bad-data' (unreadable JSON).
      let kind = 'offline'
      let status = null
      try {
        const response = await fetch(url, { signal: controller.signal })
        kind = 'server'
        status = response.status
        if (!response.ok) throw new Error(`Request failed with status ${status}.`)
        kind = 'bad-data'
        const data = await response.json()
        setResult({ url, attempt, data, error: null })
      } catch (requestError) {
        if (controller.signal.aborted) return
        const error = { kind, status, detail: requestError.message }
        setResult({ url, attempt, data: null, error })
      }
    }

    loadData()
    return () => controller.abort()
  }, [url, attempt])

  const isCurrent = result.url === url && result.attempt === attempt
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: !isCurrent,
    retry,
  }
}

export default useFetch
