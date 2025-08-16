import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authAPI } from '../services/api';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/ForceRefresh.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = ({ onSignupComplete }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralStatus, setReferralStatus] = useState(null); // null, 'valid', 'invalid'
  const [loading, setLoading] = useState(false);

  // Check for referral code in URL and set it
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      validateReferralCode(refCode);
    }
  }, [searchParams]);

  // Validate referral code
  const validateReferralCode = async (code) => {
    if (!code) {
      setReferralStatus(null);
      return;
    }
    
    try {
      const response = await authAPI.validateReferral(code);
      setReferralStatus(response.data.valid ? 'valid' : 'invalid');
    } catch (error) {
      setReferralStatus('invalid');
    }
  };

  // Handle referral code change
  const handleReferralChange = (value) => {
    setReferralCode(value);
    if (value) {
      validateReferralCode(value);
    } else {
      setReferralStatus(null);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !username || !email || !phone || !password || !referralCode) {
      toast.error('Please fill all required fields including referral code', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        name: fullName,
        username,
        email,
        phone,
        password,
        referralCode
      };
      
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        // Store user info for payment
        localStorage.setItem('pendingUserId', response.data.userId);
        localStorage.setItem('pendingUsername', username);
        
        toast.success('Account created successfully! Please make your deposit to activate account.', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark"
        });
        
        // Mark signup as completed and navigate to payment
        if (onSignupComplete) {
          onSignupComplete();
        }
        setTimeout(() => navigate('/payment'), 1000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
    } finally {
      setLoading(false);
    }
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
                <h2>Create Account</h2>
                <p>Join us today</p>
              </div>
              
              <Form className="login-form" onSubmit={handleSignUp}>
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    id="fullName"
                    required
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
                    required
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
                    required
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
                    required
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
                    minLength={8}
                    required
                  />
                  <label htmlFor="password" className={`input-label ${password ? 'active' : ''}`}>
                    Password
                  </label>
                </div>

                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={referralCode}
                    onChange={(e) => handleReferralChange(e.target.value)}
                    className={`form-input ${referralStatus === 'invalid' ? 'is-invalid' : referralStatus === 'valid' ? 'is-valid' : ''}`}
                    id="referralCode"
                    required
                    disabled={!!searchParams.get('ref')}
                  />
                  <label htmlFor="referralCode" className={`input-label ${referralCode ? 'active' : ''}`}>
                    Referral Code *
                  </label>
                  {referralStatus === 'valid' && (
                    <small className="text-success mt-1 d-block">
                      <i className="bi bi-check-circle me-1"></i>
                      Valid referral code
                    </small>
                  )}
                  {referralStatus === 'invalid' && (
                    <small className="text-danger mt-1 d-block">
                      <i className="bi bi-x-circle me-1"></i>
                      Invalid referral code
                    </small>
                  )}
                  {searchParams.get('ref') && referralStatus === 'valid' && (
                    <small className="text-success mt-1 d-block">
                      <i className="bi bi-check-circle me-1"></i>
                      Referral code applied from link
                    </small>
                  )}
                </div>
                
                <Button style={{border:'none'}} type="submit" className="login-button" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
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
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;