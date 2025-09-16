import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/posts', label: 'Posts', icon: '📝' },
  { to: '/users', label: 'Users', icon: '👥' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  return (
    <motion.aside
      className={clsx(
        'bg-white/80 dark:bg-slate-800/80 backdrop-blur border-r dark:border-slate-700 h-screen sticky top-0',
        open ? 'w-64' : 'w-18'
      )}
      animate={{ width: open ? 256 : 72 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-4 flex items-center justify-between">
        <span className="font-bold">📊 {open && 'Acme Dashboard'}</span>
        <button
          className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >{open ? '«' : '»'}</button>
      </div>
      <nav className="mt-2">
        {nav.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              clsx('flex items-center gap-3 px-4 py-2 m-2 rounded-lg', 
                isActive ? 'bg-brand/10 text-brand dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-700')
            }
          >
            <span className="text-lg">{n.icon}</span>
            <span className={clsx('truncate', !open && 'sr-only')}>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  )
}
