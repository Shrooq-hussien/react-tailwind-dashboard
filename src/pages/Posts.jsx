import { useEffect, useMemo, useState } from 'react'
import Table from '../components/ui/Table.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import Input from '../components/ui/Input.jsx'
import Toast from '../components/ui/Toast.jsx'
import { http, unwrap } from '../utils/api.js'
import useTable, { sortClient } from '../hooks/useTable.js'
import { PAGE_SIZE } from '../utils/constants.js'
import { postSchema } from './forms.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Posts() {
  const { isAdmin } = useAuth()
  const { page, pageSize, sortKey, sortDir, search, debouncedSearch, setPage, setSearch, toggleSort } = useTable()
  const [all, setAll] = useState([])
  const [slice, setSlice] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title:'', body:'', userId:1 })
  const [formErr, setFormErr] = useState({})
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [activePost, setActivePost] = useState(null)


  useEffect(()=>{
    setLoading(true)
    unwrap(http.get('/posts'))
      .then(([data, err]) => { setError(err); setAll(data || []) })
      .finally(()=>setLoading(false))
  }, [])

  useEffect(()=>{
    let rows = all
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase()
      rows = rows.filter(p => p.title.toLowerCase().includes(s) || p.body.toLowerCase().includes(s))
    }
    rows = sortClient(rows, sortKey, sortDir)
    const start = (page-1)*pageSize
    setSlice(rows.slice(start, start+pageSize))
  }, [all, debouncedSearch, sortKey, sortDir, page, pageSize])

  const total = useMemo(()=>{
    const count = debouncedSearch ? all.filter(p => `${p.title} ${p.body}`.toLowerCase().includes(debouncedSearch.toLowerCase())).length : all.length
    if ((page-1)*PAGE_SIZE >= count) setPage(1)
    return count
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, debouncedSearch])

  const columns = [
    { key:'id', label:'ID', sortable:true },
    { key:'title', label:'Title', sortable:true },
    { key:'userId', label:'User', sortable:true },
    { key:'actions', label:'', render:(_, row)=> (
  <div className="flex gap-2 justify-end">
    <Button size="sm" variant="outline" onClick={()=>viewComments(row)}>View</Button>
    {isAdmin && <Button size="sm" variant="outline" onClick={()=>startEdit(row)}>Edit</Button>}
  </div>
) },

  ]
  async function viewComments(row) {
  setActivePost(row)
  setComments([])
  setCommentsLoading(true)
  setCommentsOpen(true)
  const [data, err] = await unwrap(http.get(`/posts/${row.id}/comments`))
  setCommentsLoading(false)
  if (err) {
    setComments([{ id: 'err', name: 'Error', email: '', body: 'Failed to load comments.' }])
    return
  }
  setComments(data || [])
}


  function startCreate() {
    setForm({ title:'', body:'', userId:1 })
    setFormErr({})
    setOpen(true)
  }
  function startEdit(row) {
    setForm({ title:row.title, body:row.body, userId:row.userId, id:row.id })
    setFormErr({})
    setOpen(true)
  }
  function save() {
    const parsed = postSchema.safeParse(form)
    if(!parsed.success) {
      const errs = {}
      parsed.error.issues.forEach(i=> errs[i.path[0]] = i.message)
      setFormErr(errs); return
    }
    const isNew = !form.id
    if(isNew) {
      const id = all.length ? Math.max(...all.map(p=>p.id))+1 : 101
      setAll([{...form, id}, ...all])
    } else {
      setAll(all.map(p=> p.id===form.id ? {...p, ...form} : p))
    }
    setOpen(false)
    setToast(isNew ? 'Post created (mock)' : 'Post updated (mock)')
  }

  if (loading) return <div className="card"><div className="card-body">Loading posts…</div></div>
  if (error) return <div className="card"><div className="card-body text-red-600">Failed to load posts.</div></div>

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Posts</h1>
        {isAdmin && <Button onClick={startCreate}>New Post</Button>}
      </div>
      <Table
        columns={columns}
        data={slice}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onSortChange={toggleSort}
        sortKey={sortKey}
        sortDir={sortDir}
        search={search}
        onSearch={setSearch}
      />

  <Modal open={commentsOpen} onClose={()=>setCommentsOpen(false)} title={activePost ? `Comments • ${activePost.title}` : 'Comments'}>
  {commentsLoading ? (
    <div className="space-y-2">
      <div className="h-3 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="h-3 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="h-3 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
    </div>
  ) : (
    <div className="space-y-3 max-h-[50vh] overflow-auto">
      {comments.map(c => (
        <div key={c.id} className="border-b last:border-0 dark:border-slate-700 pb-2">
          <div className="text-sm font-medium">{c.name} <span className="text-xs text-slate-500">{c.email}</span></div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{c.body}</p>
        </div>
      ))}
    </div>
  )}
</Modal>


      <Toast message={toast} onDone={()=>setToast(null)} />
    </>
  )
}
