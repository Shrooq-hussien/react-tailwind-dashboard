import { createContext, useContext, useMemo, useState } from 'react'
import { ROLES } from '../utils/constants.js'
const AuthCtx = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=> {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  function login({ email, role=ROLES.VIEWER }) {
    const fakeToken = btoa(JSON.stringify({ sub: email, role }))
    localStorage.setItem('token', fakeToken)
    const profile = { email, name: email.split('@')[0], role }
    localStorage.setItem('user', JSON.stringify(profile))
    setUser(profile)
  }
  function logout() {
    localStorage.removeItem('token'); localStorage.removeItem('user')
    setUser(null)
  }
  const value = useMemo(()=>({ user, login, logout, isAdmin: user?.role === ROLES.ADMIN }), [user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
export const useAuth = () => useContext(AuthCtx)
