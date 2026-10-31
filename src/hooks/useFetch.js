import { useCallback, useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [requestNumber, setRequestNumber] = useState(0)
  const retry = useCallback(() => setRequestNumber((current) => current + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed with status ${response.status}.`)
        setData(await response.json())
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setData(null)
          setError(requestError.message || 'The agent data could not be loaded.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadData()
    return () => controller.abort()
  }, [url, requestNumber])

  return { data, loading, error, retry }
}

export default useFetch
