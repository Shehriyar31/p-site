import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Common.css';
import './PaymentForm.css';
import './ForceRefresh.css';

const PaymentForm = () => {
  const [trxId, setTrxId] = useState('');
  const [screenshot, setScreenshot] = useState(null);

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
                <Card className="bank-info-card mb-4">
                  <Card.Body>
                    <h5 className="bank-title">Bank Details</h5>
                    <div className="bank-details">
                      <div className="bank-item">
                        <strong>Account Number:</strong> 1234567890123456
                      </div>
                      <div className="bank-item">
                        <strong>Account Title:</strong> ProfitPro Solutions
                      </div>
                      <div className="bank-item">
                        <strong>Bank Name:</strong> HBL Bank
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <div className="payment-instructions">
                  <h6 className="instruction-title">Instructions:</h6>
                  <p className="instruction-text">
                    Send <strong>PKR 750</strong> to the above account and provide your transaction ID with screenshot proof below.
                  </p>
                </div>
              </div>
              
              <Form className="login-form">
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="form-input"
                    id="trxId"
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
                  />
                  <label htmlFor="screenshot" className="input-label active">
                    Upload Screenshot
                  </label>
                </div>
                
                <Button className="login-button">
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
    </div>
  );
};

export default PaymentForm;