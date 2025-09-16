import { useState, useEffect } from 'react'
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(()=> {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : initial
  })
  useEffect(()=>{ localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  return [value, setValue]
}
