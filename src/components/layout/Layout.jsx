import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import { motion } from 'framer-motion'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <motion.main
          className="p-4 sm:p-6 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
