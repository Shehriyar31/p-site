import { Container, Row, Col, Card, Button, Table, Navbar, Nav, Badge, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useGlobalState } from '../context/GlobalContext';
import RefreshButton from '../components/RefreshButton';
import AnnouncementTicker from '../components/AnnouncementTicker';
import useAutoLogout from '../hooks/useAutoLogout';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';

const AdminPanel = () => {
  useAutoLogout();
  const navigate = useNavigate();
  const { getStats, users, requests, loading, refreshData } = useGlobalState();
  const stats = getStats();
  const currentUsername = localStorage.getItem('username') || 'Admin';
  const currentUserRole = localStorage.getItem('userRole') || 'admin';
  const isSuperAdmin = currentUserRole === 'superadmin';
  const [activeSection, setActiveSection] = useState('home');
  
  // Get recent users and requests for display
  const recentUsers = users.slice(0, 5);
  const recentRequests = requests.slice(0, 5);

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
                  <div>
                    <h2 className="text-white mb-0">Admin Panel - ProfitPro</h2>
                    <small className="text-warning">Welcome, {currentUsername} ({isSuperAdmin ? 'Super Admin' : 'Admin'})</small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <RefreshButton onRefresh={refreshData} />
                  <Link to="/login">
                    <Button variant="outline-light">Logout</Button>
                  </Link>
                </div>
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
                    <Nav.Link 
                      onClick={() => navigate('/announcements')}
                    >
                      <i className="bi bi-megaphone me-2"></i>Announcements
                    </Nav.Link>
                    <Nav.Link 
                      onClick={() => navigate('/contacts')}
                    >
                      <i className="bi bi-envelope me-2"></i>User Contacts
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <AnnouncementTicker />
          </Col>
        </Row>
        


        {loading ? (
          <Row className="p-4">
            <Col className="text-center">
              <Spinner animation="border" variant="warning" />
              <p className="text-white mt-3">Loading real-time data...</p>
            </Col>
          </Row>
        ) : activeSection === 'home' && (
          <>
            <Row className="p-4">
              <Col lg={4} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <h5 className="text-warning">Total Users</h5>
                    <h2 className="text-white">{stats.totalUsers}</h2>
                    <small className="text-warning">Real-time count</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <h5 className="text-warning">Active Users</h5>
                    <h2 className="text-white">{stats.activeUsers}</h2>
                    <small className="text-warning">Currently active</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Body>
                    <h5 className="text-warning">Total Balance</h5>
                    <h2 className="text-white">₨{stats.totalBalance.toLocaleString()}</h2>
                    <small className="text-warning">Live balance</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="p-4">
              <Col lg={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Header>
                    <h5 className="text-warning mb-0">Recent Users</h5>
                  </Card.Header>
                  <Card.Body>
                    {recentUsers.length > 0 ? (
                      <Table variant="dark" size="sm">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map(user => (
                            <tr key={user._id}>
                              <td>{user.name}</td>
                              <td>
                                <Badge bg={user.accountStatus === 'approved' ? 'success' : user.accountStatus === 'pending' ? 'warning' : 'secondary'}>
                                  {user.accountStatus || user.status}
                                </Badge>
                              </td>
                              <td>₨{(user.balance || 0).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center py-4">
                        <i className="bi bi-people text-warning" style={{fontSize: '2rem'}}></i>
                        <p className="text-warning mt-2 mb-0">No users registered yet</p>
                        <small className="text-light opacity-75">Users will appear here when they register</small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={6} className="mb-4">
                <Card className="admin-card">
                  <Card.Header>
                    <h5 className="text-warning mb-0">Recent Requests</h5>
                  </Card.Header>
                  <Card.Body>
                    {recentRequests.length > 0 ? (
                      <Table variant="dark" size="sm">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentRequests.map(request => (
                            <tr key={request._id}>
                              <td>{request.user}</td>
                              <td>{request.type}</td>
                              <td>₨{request.amount.toLocaleString()}</td>
                              <td>
                                <Badge bg={request.status === 'Approved' ? 'success' : request.status === 'Pending' ? 'warning' : 'danger'}>
                                  {request.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center py-4">
                        <i className="bi bi-arrow-left-right text-warning" style={{fontSize: '2rem'}}></i>
                        <p className="text-warning mt-2 mb-0">No requests yet</p>
                        <small className="text-light opacity-75">Deposit/Withdraw requests will appear here</small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}


      </Container>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;