// src/hooks/useMetrics.js
import { useEffect, useState } from 'react'
import { http, unwrap } from '../utils/api'

/**
 * Fetches posts + users and derives:
 * - postsCount, usersCount
 * - postsPerDay: mock distribution over last 12 days (JSONPlaceholder has no dates)
 */
export default function useMetrics() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    postsCount: 0,
    usersCount: 0,
    postsPerDay: [], // [{day: 'D-11', value: n}, ...]
  })

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [posts, e1] = await unwrap(http.get('/posts'))
      const [users, e2] = await unwrap(http.get('/users'))
      if (!mounted) return
      const err = e1 || e2
      setError(err)
      if (!err) {
        // mock a trend: spread total posts over last 12 days with some variation
        const days = 12
        const base = Math.max(1, Math.floor((posts?.length || 0) / days))
        const series = Array.from({ length: days }, (_, i) => {
          const jitter = ((i * 7) % 5) - 2 // small variation -2..+2
          return { day: `D-${days - 1 - i}`, value: Math.max(0, base + jitter) }
        })
        setData({
          postsCount: posts?.length || 0,
          usersCount: users?.length || 0,
          postsPerDay: series,
        })
      }
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  return { ...data, loading, error }
}
