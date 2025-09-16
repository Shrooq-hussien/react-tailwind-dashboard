export default function Badge({ children, color='slate' }) {
  const map = {
    slate:'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    green:'bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-200',
    blue:'bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-200',
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs ${map[color]}`}>{children}</span>
}
