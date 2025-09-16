import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-slate-600 dark:text-slate-300">Page not found.</p>
        <Link to="/" className="link">Go Home</Link>
      </div>
    </div>
  )
}
