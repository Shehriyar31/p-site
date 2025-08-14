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
import ErrorPage from './error/ErrorPage'
import Preloader from './components/Preloader'
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
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm onSignupComplete={() => setSignupCompleted(true)} />} />
        <Route path="/payment" element={signupCompleted ? <PaymentForm /> : <SignUpForm onSignupComplete={() => setSignupCompleted(true)} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/cash" element={<CashPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
