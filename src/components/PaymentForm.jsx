import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import './Common.css';
import './PaymentForm.css';
import './ForceRefresh.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [trxId, setTrxId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const paymentOptions = {
    easypaisa: {
      name: 'Easypaisa',
      accountName: 'Noshaba',
      accountNumber: '03162515990'
    },
    sadapay: {
      name: 'SadaPay',
      accountName: 'Sumera',
      accountNumber: '03333044418'
    },
    bank: {
      name: 'Bank Account',
      accountName: 'Sumera',
      accountNumber: '00300112775624',
      bankName: 'Meezan Bank'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Please select a payment method', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    if (!trxId.trim()) {
      toast.error('Please enter transaction ID', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    if (!screenshot) {
      toast.error('Please upload screenshot', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    toast.success('Payment verification submitted successfully!', {
      position: "top-right",
      autoClose: 2000,
      theme: "dark"
    });
    // Navigate to success page
    setTimeout(() => navigate('/success'), 1000);
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={6} md={8} sm={10}>
            <div className="login-box">
              <div className="login-header">
                <div className="logo-container">
                  <img src={logo} alt="Logo" className="logo" />
                </div>
                <h2>Welcome to ProfitPro</h2>
                <div className="welcome-message">
                  <p>On ProfitPro, You Can Start Your Own Online Business And Earn Great Income.</p>
                  <p><strong>One Team, One Dream, Unlimited Success</strong></p>
                  <p>Start small, dream big, and achieve more with ProfitPro by your side.</p>
                  <p>Don't wait for opportunities to knock — create your own with ProfitPro today</p>
                  <p>Stop dreaming and start doing — ProfitPro turns ambitions into achievements. ✨</p>
                  <p><em>ProfitPro is an international platform</em></p>
                  <p className="fee-notice">Fee must be applied to join the platform</p>
                </div>
              </div>

              <div className="payment-info">
                <div className="mb-4">
                  <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-input payment-select"
                    id="paymentMethod"
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="sadapay">SadaPay</option>
                    <option value="bank">Bank Account</option>
                  </Form.Select>
                </div>

                {paymentMethod && (
                  <Card className="bank-info-card mb-4">
                    <Card.Body>
                      <h5 className="bank-title">{paymentOptions[paymentMethod].name} Details</h5>
                      <div className="bank-details">
                        <div className="bank-item">
                          <strong>Account Number:</strong> {paymentOptions[paymentMethod].accountNumber}
                        </div>
                        <div className="bank-item">
                          <strong>Account Title:</strong> {paymentOptions[paymentMethod].accountName}
                        </div>
                        {paymentOptions[paymentMethod].bankName && (
                          <div className="bank-item">
                            <strong>Bank Name:</strong> {paymentOptions[paymentMethod].bankName}
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                )}

                <div className="payment-instructions">
                  <h6 className="instruction-title">Instructions:</h6>
                  <p className="instruction-text">
                    Send <strong>3$ (885 PKR)</strong> to the selected account and provide your transaction ID with screenshot proof below.
                  </p>
                </div>
              </div>
              
              <Form className="login-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="form-input"
                    id="trxId"
                    required
                  />
                  <label htmlFor="trxId" className={`input-label ${trxId ? 'active' : ''}`}>
                    Transaction ID
                  </label>
                </div>

                <div className="input-wrapper">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-input file-input"
                    id="screenshot"
                    required
                  />
                  <label htmlFor="screenshot" className="input-label active">
                    Upload Screenshot
                  </label>
                </div>
                
                <Button style={{'border':'none'}} type="submit" className="login-button">
                  Submit Verification
                </Button>
                
                <div className="forgot-password">
                  <Link to="/login">
                    Back to Login
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

export default PaymentForm;