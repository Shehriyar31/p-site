import { Container, Row, Col, Card, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useGlobalState } from '../context/GlobalContext';
import RefreshButton from '../components/RefreshButton';
import AnnouncementTicker from '../components/AnnouncementTicker';
import useAutoLogout from '../hooks/useAutoLogout';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  useAutoLogout();
  const { announcements } = useGlobalState();
  const currentUsername = localStorage.getItem('username') || 'User';
  const [activeSection, setActiveSection] = useState('dashboard');
  const [contactForm, setContactForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) {
      toast.error('Please fill name and message');
      return;
    }

    const contact = {
      id: Date.now(),
      ...contactForm,
      submittedBy: currentUsername,
      userAccount: localStorage.getItem('username') || 'Unknown',
      userId: localStorage.getItem('userId') || 'N/A',
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('userContacts') || '[]');
    contacts.unshift(contact);
    localStorage.setItem('userContacts', JSON.stringify(contacts));

    // Emit real-time update
    window.dispatchEvent(new CustomEvent('newContact', { detail: contact }));

    toast.success('Message sent successfully!');
    setContactForm({ name: '', username: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="login-wrapper">
      <Container fluid>
        <Row>
          <Col>
            <div className="admin-header p-4">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" className="admin-logo me-3" style={{width: '50px', height: '50px'}} />
                    <div>
                      <h2 className="text-white mb-0 header-title">User Dashboard</h2>
                      <small className="text-warning">Welcome, {currentUsername}</small>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="d-flex justify-content-lg-end justify-content-center gap-2">
                    <RefreshButton />
                    <Button variant="outline-warning" size="sm">
                      <i className="bi bi-person-circle me-1"></i>
                      <span className="d-none d-sm-inline">Profile</span>
                    </Button>
                    <Link to="/login">
                      <Button variant="outline-light" size="sm">
                        <i className="bi bi-box-arrow-right me-1"></i>
                        <span className="d-none d-sm-inline">Logout</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Navbar className="admin-navbar" expand="lg">
              <Container fluid>
                <Navbar.Toggle aria-controls="user-navbar-nav" />
                <Navbar.Collapse id="user-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link 
                      className={activeSection === 'dashboard' ? 'active' : ''}
                      onClick={() => setActiveSection('dashboard')}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      className={activeSection === 'earnings' ? 'active' : ''}
                      onClick={() => setActiveSection('earnings')}
                    >
                      <i className="bi bi-currency-dollar me-2"></i>Earnings
                    </Nav.Link>
                    <Nav.Link 
                      className={activeSection === 'withdraw' ? 'active' : ''}
                      onClick={() => setActiveSection('withdraw')}
                    >
                      <i className="bi bi-arrow-up-circle me-2"></i>Withdraw
                    </Nav.Link>
                    <Nav.Link 
                      className={activeSection === 'referrals' ? 'active' : ''}
                      onClick={() => setActiveSection('referrals')}
                    >
                      <i className="bi bi-people me-2"></i>Referrals
                    </Nav.Link>
                    <Nav.Link 
                      className={activeSection === 'contact' ? 'active' : ''}
                      onClick={() => setActiveSection('contact')}
                    >
                      <i className="bi bi-envelope me-2"></i>Contact
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <AnnouncementTicker />
          </Col>
        </Row>

        {activeSection === 'dashboard' && (
          <>
            <Row className="p-4">
              <Col lg={3} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-wallet2 text-warning me-3" style={{fontSize: '30px'}}></i>
                      <div>
                        <h6 className="text-warning mb-1">Total Balance</h6>
                        <h3 className="text-white mb-0">₨0</h3>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-graph-up text-success me-3" style={{fontSize: '30px'}}></i>
                      <div>
                        <h6 className="text-warning mb-1">Today's Earnings</h6>
                        <h3 className="text-white mb-0">₨0</h3>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people text-info me-3" style={{fontSize: '30px'}}></i>
                      <div>
                        <h6 className="text-warning mb-1">Referrals</h6>
                        <h3 className="text-white mb-0">0</h3>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-star-fill text-warning me-3" style={{fontSize: '30px'}}></i>
                      <div>
                        <h6 className="text-warning mb-1">VIP Level</h6>
                        <h3 className="text-white mb-0">Bronze</h3>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="p-4">
              <Col md={8} className="mb-4">
                <Card className="admin-card">
                  <Card.Header>
                    <h5 className="text-warning mb-0">Welcome to ProfitPro</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center py-4">
                      <div className="vip-icon mb-4">
                        <i className="bi bi-gem" style={{fontSize: '60px', color: '#ffd700'}}></i>
                      </div>
                      <h4 className="text-warning mb-3">Start Your Journey to Success!</h4>
                      <p className="text-white mb-4">
                        Welcome to ProfitPro - your gateway to unlimited earning potential. 
                        Build your network, earn commissions, and achieve financial freedom.
                      </p>
                      <div className="d-flex justify-content-center gap-3">
                        <Button className="login-button" style={{border: 'none'}}>
                          <i className="bi bi-play-circle me-2"></i>Get Started
                        </Button>
                        <Button variant="outline-warning">
                          <i className="bi bi-info-circle me-2"></i>Learn More
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="admin-card">
                  <Card.Header>
                    <h6 className="text-warning mb-0">Quick Actions</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-3">
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-share me-2"></i>Share Referral Link
                      </Button>
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-arrow-up-circle me-2"></i>Request Withdrawal
                      </Button>
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-graph-up me-2"></i>View Earnings
                      </Button>
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-person-plus me-2"></i>Invite Friends
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {announcements.length > 0 && (
              <Row className="p-4">
                <Col>
                  <Card className="admin-card">
                    <Card.Header>
                      <h5 className="text-warning mb-0">📢 Latest Announcements</h5>
                    </Card.Header>
                    <Card.Body>
                      {announcements.slice(0, 3).map(announcement => (
                        <Card key={announcement.id} className="mb-2" style={{background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.3)'}}>
                          <Card.Body className="py-2">
                            <h6 className="text-warning mb-1">{announcement.title}</h6>
                            <p className="text-white mb-1 small">{announcement.message}</p>
                            <small className="text-warning">{new Date(announcement.createdAt).toLocaleDateString()}</small>
                          </Card.Body>
                        </Card>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}

        {activeSection === 'earnings' && (
          <Row className="p-4">
            <Col>
              <Card className="admin-card">
                <Card.Header>
                  <h5 className="text-warning mb-0">Earnings Overview</h5>
                </Card.Header>
                <Card.Body>
                  <div className="text-center py-5">
                    <i className="bi bi-currency-dollar text-warning mb-3" style={{fontSize: '60px'}}></i>
                    <h4 className="text-white mb-3">No Earnings Yet</h4>
                    <p className="text-white">Start referring friends to begin earning commissions!</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeSection === 'withdraw' && (
          <Row className="p-4">
            <Col>
              <Card className="admin-card">
                <Card.Header>
                  <h5 className="text-warning mb-0">Withdrawal Request</h5>
                </Card.Header>
                <Card.Body>
                  <div className="text-center py-5">
                    <i className="bi bi-arrow-up-circle text-warning mb-3" style={{fontSize: '60px'}}></i>
                    <h4 className="text-white mb-3">Minimum Withdrawal: ₨2,800</h4>
                    <p className="text-white">You need at least ₨2,800 to request a withdrawal.</p>
                    <Button variant="outline-warning" disabled>
                      <i className="bi bi-lock me-2"></i>Insufficient Balance
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeSection === 'referrals' && (
          <Row className="p-4">
            <Col>
              <Card className="admin-card">
                <Card.Header>
                  <h5 className="text-warning mb-0">Referral Program</h5>
                </Card.Header>
                <Card.Body>
                  <div className="text-center py-5">
                    <i className="bi bi-people text-warning mb-3" style={{fontSize: '60px'}}></i>
                    <h4 className="text-white mb-3">Invite Friends & Earn</h4>
                    <p className="text-white mb-4">Share your referral link and earn commission on every signup!</p>
                    <div className="mb-4">
                      <input 
                        type="text" 
                        className="form-control text-center" 
                        value="https://profitpro.com/ref/USER123" 
                        readOnly 
                        style={{background: 'rgba(255,140,0,0.1)', border: '1px solid #ff8c00', color: '#fff'}}
                      />
                    </div>
                    <Button className="login-button" style={{border: 'none'}}>
                      <i className="bi bi-copy me-2"></i>Copy Link
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeSection === 'contact' && (
          <Row className="p-4">
            <Col>
              <Card className="admin-card">
                <Card.Header>
                  <h5 className="text-warning mb-0">Contact Support</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleContactSubmit}>
                    <Row>
                      <Col md={6}>
                        <div className="input-wrapper mb-3">
                          <Form.Control
                            type="text"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="form-input"
                            required
                          />
                          <label className={`input-label ${contactForm.name ? 'active' : ''}`}>
                            Full Name *
                          </label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="input-wrapper mb-3">
                          <Form.Control
                            type="text"
                            value={contactForm.username}
                            onChange={(e) => setContactForm({...contactForm, username: e.target.value})}
                            className="form-input"
                          />
                          <label className={`input-label ${contactForm.username ? 'active' : ''}`}>
                            Username
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="input-wrapper mb-3">
                          <Form.Control
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="form-input"
                          />
                          <label className={`input-label ${contactForm.email ? 'active' : ''}`}>
                            Email
                          </label>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="input-wrapper mb-3">
                          <Form.Control
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                            className="form-input"
                          />
                          <label className={`input-label ${contactForm.phone ? 'active' : ''}`}>
                            Phone Number
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="input-wrapper mb-4">
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="form-input"
                        required
                      />
                      <label className={`input-label ${contactForm.message ? 'active' : ''}`}>
                        Message *
                      </label>
                    </div>
                    <Button type="submit" className="login-button" style={{border: 'none'}}>
                      <i className="bi bi-send me-2"></i>Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;