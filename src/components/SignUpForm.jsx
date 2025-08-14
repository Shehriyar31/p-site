import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
                <h2>Create Account</h2>
                <p>Join us today</p>
              </div>
              
              <Form className="login-form">
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    id="fullName"
                  />
                  <label htmlFor="fullName" className={`input-label ${fullName ? 'active' : ''}`}>
                    Full Name
                  </label>
                </div>

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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    id="email"
                  />
                  <label htmlFor="email" className={`input-label ${email ? 'active' : ''}`}>
                    Email
                  </label>
                </div>

                <div className="input-wrapper">
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    id="phone"
                  />
                  <label htmlFor="phone" className={`input-label ${phone ? 'active' : ''}`}>
                    Phone Number
                  </label>
                </div>

                <div className="input-wrapper">
                  <Form.Select
                    value="Pakistan"
                    disabled
                    className="form-input disabled-input"
                    id="country"
                  >
                    <option value="Pakistan">Pakistan</option>
                  </Form.Select>
                  <label htmlFor="country" className="input-label active">
                    Country
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
                  Sign Up
                </Button>
                
                <div className="forgot-password">
                  <Link to="/login">
                    Already have account? Login
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

export default SignUpForm;