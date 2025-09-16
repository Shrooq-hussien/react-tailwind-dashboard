import useDebounce from './useDebounce.js'
import { useState } from 'react'
import { PAGE_SIZE } from '../utils/constants.js'
export default function useTable() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(PAGE_SIZE)
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const toggleSort = (key) => {
    setPage(1)
    setSortKey(key)
    setSortDir(prev => (key === sortKey ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'))
  }
  return { page, pageSize, sortKey, sortDir, search, debouncedSearch, setPage, setSearch, toggleSort }
}
export function sortClient(data, key, dir) {
  if(!Array.isArray(data)) return data
  const sorted = [...data].sort((a,b)=>{
    const va = a?.[key]; const vb = b?.[key]
    if(va === vb) return 0
    return va > vb ? 1 : -1
  })
  return dir==='asc' ? sorted : sorted.reverse()
}
