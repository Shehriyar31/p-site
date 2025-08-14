import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
              
              <Form className="login-form">
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    id="username"
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
                  />
                  <label htmlFor="password" className={`input-label ${password ? 'active' : ''}`}>
                    Password
                  </label>
                </div>
                
                <Button className="login-button">
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
    </div>
  );
};

export default LoginForm;