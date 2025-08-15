import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginForm from './auth/LoginForm'
import SignUpForm from './auth/SignUpForm'
import PaymentForm from './auth/PaymentForm'
import SuccessPage from './auth/SuccessPage'
import AdminPanel from './pages/AdminPanel'
import UsersPage from './pages/UsersPage'
import RequestsPage from './pages/RequestsPage'
import CashPage from './pages/CashPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import ContactsPage from './pages/ContactsPage'
import UserDashboard from './pages/UserDashboard'
import ErrorPage from './error/ErrorPage'
import Preloader from './components/Preloader'
import ProtectedRoute from './components/ProtectedRoute'
import { GlobalProvider } from './context/GlobalContext'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [signupCompleted, setSignupCompleted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <GlobalProvider>
      <Router>
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm onSignupComplete={() => setSignupCompleted(true)} />} />
        <Route path="/payment" element={signupCompleted ? <PaymentForm /> : <SignUpForm onSignupComplete={() => setSignupCompleted(true)} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute requiredRole="admin"><UsersPage /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute requiredRole="admin"><RequestsPage /></ProtectedRoute>} />
        <Route path="/cash" element={<ProtectedRoute requiredRole="admin"><CashPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute requiredRole="admin"><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute requiredRole="admin"><ContactsPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </GlobalProvider>
  )
}

export default App
