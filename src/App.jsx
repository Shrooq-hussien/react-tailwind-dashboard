import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Posts from './pages/Posts.jsx'
import Users from './pages/Users.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
