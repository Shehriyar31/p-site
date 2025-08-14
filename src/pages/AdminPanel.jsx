import { Container, Row, Col, Card, Button, Table, Navbar, Nav, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending', paymentMethod: 'Easypaisa' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Approved', paymentMethod: 'SadaPay' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending', paymentMethod: 'Bank Account' }
  ]);

  const [requests] = useState([
    { id: 1, user: 'Alice Brown', type: 'Deposit', amount: '$50', status: 'Pending' },
    { id: 2, user: 'Bob Wilson', type: 'Withdraw', amount: '$100', status: 'Approved' },
    { id: 3, user: 'Carol Davis', type: 'Deposit', amount: '$75', status: 'Pending' }
  ]);

  const handleApprove = (id) => {
    toast.success(`User ${id} approved successfully!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  const handleReject = (id) => {
    toast.error(`User ${id} rejected!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  return (
    <div className="login-wrapper">
      <Container fluid>
        <Row>
          <Col>
            <div className="admin-header p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={logo} alt="Logo" className="admin-logo me-3" style={{width: '50px', height: '50px'}} />
                  <h2 className="text-white mb-0">Admin Panel - ProfitPro</h2>
                </div>
                <Link to="/login">
                  <Button variant="outline-light">Logout</Button>
                </Link>
              </div>
            </div>
            
            <Navbar className="admin-navbar" expand="lg">
              <Container fluid>
                <Navbar.Toggle aria-controls="admin-navbar-nav" />
                <Navbar.Collapse id="admin-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link 
                      className={activeSection === 'home' ? 'active' : ''}
                      onClick={() => setActiveSection('home')}
                    >
                      <i className="bi bi-house me-2"></i>Home
                    </Nav.Link>
                    <Nav.Link 
                      onClick={() => navigate('/users')}
                    >
                      <i className="bi bi-people me-2"></i>Users
                    </Nav.Link>
                    <Nav.Link 
                      onClick={() => navigate('/requests')}
                    >
                      <i className="bi bi-arrow-left-right me-2"></i>Deposit/Withdraw Requests
                    </Nav.Link>
                    <Nav.Link 
                      onClick={() => navigate('/cash')}
                    >
                      <i className="bi bi-cash-stack me-2"></i>Cash
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
        


        {activeSection === 'home' && (
          <Row className="p-4">
            <Col lg={4} md={6} className="mb-4">
              <Card className="admin-card">
                <Card.Body>
                  <h5 className="text-warning">Total Users</h5>
                  <h2 className="text-white">0</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="admin-card">
                <Card.Body>
                  <h5 className="text-warning">Pending Approvals</h5>
                  <h2 className="text-white">0</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="admin-card">
                <Card.Body>
                  <h5 className="text-warning">Approved Users</h5>
                  <h2 className="text-white">0</h2>
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

export default AdminPanel;