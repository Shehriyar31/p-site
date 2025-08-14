import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import PaymentForm from './components/PaymentForm'
import ErrorPage from './components/ErrorPage'
import Preloader from './components/Preloader'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [loading, setLoading] = useState(true)

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
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
