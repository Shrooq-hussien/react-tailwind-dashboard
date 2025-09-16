import { useEffect, useState } from 'react'
import Table from '../components/ui/Table.jsx'
import { http, unwrap } from '../utils/api.js'
import useTable, { sortClient } from '../hooks/useTable.js'
import Input from '../components/ui/Input.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'
import { userSchema } from './forms.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Users() {
  const { isAdmin } = useAuth()
  const { page, pageSize, sortKey, sortDir, search, debouncedSearch, setPage, setSearch, toggleSort } = useTable()
  const [all, setAll] = useState([])
  const [slice, setSlice] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', username:'' })
  const [formErr, setFormErr] = useState({})

  useEffect(()=>{ unwrap(http.get('/users')).then(([d])=> setAll(d || [])) }, [])

  useEffect(()=>{
    let rows = all
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase()
      rows = rows.filter(u => `${u.name} ${u.username} ${u.email}`.toLowerCase().includes(s))
    }
    rows = sortClient(rows, sortKey, sortDir)
    const start = (page-1)*pageSize
    setSlice(rows.slice(start, start+pageSize))
  }, [all, debouncedSearch, sortKey, sortDir, page, pageSize])

  const columns = [
    { key:'id', label:'ID', sortable:true },
    { key:'name', label:'Name', sortable:true },
    { key:'username', label:'Username', sortable:true },
    { key:'email', label:'Email', sortable:true },
    { key:'actions', label:'', render:(_, row)=> isAdmin && <Button size="sm" variant="outline" onClick={()=>startEdit(row)}>Edit</Button> },
  ]

  function startEdit(u) { setForm({ id:u.id, name:u.name, username:u.username, email:u.email }); setFormErr({}); setOpen(true) }
  function save() {
    const res = userSchema.safeParse(form)
    if(!res.success) {
      const errs = {}; res.error.issues.forEach(i=>errs[i.path[0]] = i.message); setFormErr(errs); return
    }
    setAll(all.map(u=> u.id===form.id ? {...u, ...form} : u))
    setOpen(false)
  }

  return (
    <>
      <div className="card">
        <div className="card-body space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Users</h1>
            <Input placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)} className="max-w-xs"/>
          </div>
          <Table
            columns={columns}
            data={slice}
            page={page}
            pageSize={pageSize}
            total={(debouncedSearch ? slice.length : all.length)}
            onPageChange={setPage}
            onSortChange={toggleSort}
            sortKey={sortKey}
            sortDir={sortDir}
            search={search}
            onSearch={setSearch}
          />
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Edit User" footer={<>
        <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
        <Button onClick={save}>Save</Button>
      </>}>
        <div className="space-y-3">
          <Input label="Name" value={form.name} onChange={e=>setForm(s=>({...s, name:e.target.value}))} error={formErr.name}/>
          <Input label="Username" value={form.username} onChange={e=>setForm(s=>({...s, username:e.target.value}))} error={formErr.username}/>
          <Input label="Email" value={form.email} onChange={e=>setForm(s=>({...s, email:e.target.value}))} error={formErr.email}/>
        </div>
      </Modal>
    </>
  )
}
