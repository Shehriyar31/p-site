import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/ForceRefresh.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill all required fields', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    
    // Check admin credentials (case insensitive)
    if (username.toLowerCase() === 'gillanibhai' && password === 'syedmoiz999$7') {
      toast.success('Login successful! Redirecting to admin panel...', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
      setTimeout(() => navigate('/admin'), 1000);
      return;
    }
    
    // Regular user login logic here
    toast.error('Invalid credentials', {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={5} md={6} sm={8}>
            <div className="login-box">
              <div className="login-header">
                <div className="logo-container">
                  <img src={logo} alt="Logo" className="logo" />
                </div>
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
              </div>
              
              <Form className="login-form" onSubmit={handleLogin}>
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    id="username"
                    required
                  />
                  <label htmlFor="username" className={`input-label ${username ? 'active' : ''}`}>
                    Username
                  </label>
                </div>
                
                <div className="input-wrapper">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className={`input-label ${password ? 'active' : ''}`}>
                    Password
                  </label>
                </div>
                
                <Button style={{'border':'none'}} type="submit" className="login-button">
                  Sign In
                </Button>
                
                <div className="forgot-password">
                  <span className="text-white me-2">Don't have an account?</span>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;