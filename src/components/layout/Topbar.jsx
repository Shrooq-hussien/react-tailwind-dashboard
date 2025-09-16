import { useAuth } from '../../contexts/AuthContext.jsx'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import Button from '../ui/Button.jsx'
import { motion } from 'framer-motion'

export default function Topbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="sticky top-0 z-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-b dark:border-slate-700">
      <div className="h-14 px-4 sm:px-6 flex items-center gap-2 justify-between">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="font-semibold">Welcome{user ? `, ${user.name}` : ''}</motion.div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggleTheme} title="Toggle dark mode">
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
          {user ? (
            <Button variant="outline" onClick={logout}>Logout</Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
