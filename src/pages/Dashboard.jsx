// src/pages/Dashboard.jsx
import { motion } from 'framer-motion'
import Sparkline from '../components/ui/Sparkline.jsx'
import useMetrics from '../hooks/useMetrics.js'
import Badge from '../components/ui/Badge.jsx'

export default function Dashboard() {
  const { postsCount, usersCount, postsPerDay, loading, error } = useMetrics()

  return (
    <div className="space-y-4">
      {/* Metrics header */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Posts"
          value={loading ? '—' : postsCount}
          subtitle="From JSONPlaceholder"
          color="text-blue-600 dark:text-blue-400"
        />
        <MetricCard
          title="Total Users"
          value={loading ? '—' : usersCount}
          subtitle="Active records"
          color="text-emerald-600 dark:text-emerald-400"
        />
        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Recent Activity</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mock posts/day (last 12 days)
                </p>
              </div>
              <Badge color="blue">Live</Badge>
            </div>
            <div className="mt-3">
              {loading ? (
                <div className="h-10 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              ) : error ? (
                <p className="text-sm text-red-500">Failed to load chart.</p>
              ) : (
                <Sparkline data={postsPerDay} width={260} height={48} color="#3b82f6" />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tips / Info */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div className="card" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:.05}}>
          <div className="card-body">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Demo dashboard powered by JSONPlaceholder with reusable UI + animations.
            </p>
            <div className="mt-4 space-x-2">
              <Badge color="blue">React + Tailwind</Badge>
              <Badge color="green">Framer Motion</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:.1}}>
          <div className="card-body">
            <h3 className="font-semibold mb-2">Quick Tips</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Sidebar → Posts/Users for tables & modals.</li>
              <li>Search with debounce, click headers to sort.</li>
              <li>Login as Viewer to see role restrictions.</li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:.15}}>
          <div className="card-body">
            <h3 className="font-semibold mb-2">Dark Mode</h3>
            <p className="text-sm">Toggle in the top-right. Preference is saved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, subtitle, color }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="card-body">
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`text-3xl font-bold mt-1 ${color}`}>{value}</div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      </div>
    </motion.div>
  )
}
