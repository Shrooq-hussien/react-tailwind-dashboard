import Input from './Input.jsx'
export default function Table(props) {
  const {
    columns, data, page, pageSize, total, onPageChange,
    onSortChange, sortKey, sortDir, search, onSearch
  } = props
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div className="card">
      <div className="card-body space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Input placeholder="Search..." value={search} onChange={e=>onSearch(e.target.value)} className="max-w-xs" />
          <div className="text-sm text-slate-500 dark:text-slate-400">Page {page} / {totalPages}</div>
        </div>
        <div className="overflow-auto rounded-lg border dark:border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                {columns.map(c=>(
                  <th key={c.key} className="text-left px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <div className="inline-flex items-center gap-1">
                      {c.label}
                      {c.sortable && (
                        <button
                          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-100"
                          onClick={()=>onSortChange(c.key)}
                          title="Toggle sort"
                        >
                          {sortKey===c.key ? (sortDir==='asc' ? '▲' : '▼') : '⇅'}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length ? data.map((row, i) => (
                <tr key={row.id ?? i} className="border-t dark:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              )) : (
                <tr><td colSpan={columns.length} className="px-3 py-6 text-center text-slate-500">No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="px-3 py-1.5 rounded-lg border dark:border-slate-700" onClick={()=>onPageChange(Math.max(1, page-1))}>Prev</button>
          <button className="px-3 py-1.5 rounded-lg border dark:border-slate-700" onClick={()=>onPageChange(Math.min(totalPages, page+1))}>Next</button>
        </div>
      </div>
    </div>
  )
}
