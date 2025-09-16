export default function Select({ label, error, children, ...rest }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>}
      <select
        className={`w-full rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50 ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </label>
  )
}
