import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
const ThemeCtx = createContext(null)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark')
  }, [theme])
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  return <ThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</ThemeCtx.Provider>
}
export const useTheme = () => useContext(ThemeCtx)
