import { useEffect, useState } from 'react'
export default function useFetch(fn, deps=[]) {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fn()
      .then(([d,e])=>{
        if(!mounted) return
        setError(e)
        setData(d)
      })
      .finally(()=>mounted && setLoading(false))
    return ()=>{ mounted=false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return { data, loading, error, setData }
}
