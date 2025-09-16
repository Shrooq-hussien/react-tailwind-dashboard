import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { ROLES } from '../utils/constants.js'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [role, setRole] = useState(ROLES.ADMIN)
  const { login } = useAuth()
  const nav = useNavigate()
  const { state } = useLocation()

  const onSubmit = (e) => {
    e.preventDefault()
    login({ email, role })
    nav(state?.from?.pathname || '/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-900">
      <motion.form
        onSubmit={onSubmit}
        initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}
        className="card w-[94%] sm:w-[420px]"
      >
        <div className="card-body space-y-4">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Select label="Role" value={role} onChange={e=>setRole(e.target.value)}>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.VIEWER}>Viewer</option>
          </Select>
          <Button type="submit" className="w-full">Continue</Button>
        </div>
      </motion.form>
    </div>
  )
}
