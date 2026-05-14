import { Routes, Route } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-navy-950 flex items-center justify-center">
          <h1 className="text-6xl font-display text-teal-400">Hello Tenali</h1>
        </div>
      } />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}