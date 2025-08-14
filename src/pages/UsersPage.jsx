import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';
import 'react-toastify/dist/ReactToastify.css';

const UsersPage = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '03001234567', status: 'Pending', paymentMethod: 'Easypaisa', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '03007654321', status: 'Approved', paymentMethod: 'SadaPay', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '03009876543', status: 'Pending', paymentMethod: 'Bank Account', joinDate: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '03005432109', status: 'Approved', paymentMethod: 'Easypaisa', joinDate: '2024-01-12' },
    { id: 5, name: 'Ahmed Ali', email: 'ahmed@example.com', phone: '03002468135', status: 'Rejected', paymentMethod: 'SadaPay', joinDate: '2024-01-11' }
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      toast.success(`User ${id} deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
    }
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
                      <h2 className="text-white mb-0 header-title">Users Management</h2>
                      <small className="text-warning">ProfitPro Admin Panel</small>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="d-flex justify-content-lg-end justify-content-center gap-2">
                    <Link to="/admin">
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-arrow-left me-1"></i>
                        <span className="d-none d-sm-inline">Back to Admin</span>
                        <span className="d-sm-none">Back</span>
                      </Button>
                    </Link>
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
          </Col>
        </Row>
        
        <Row className="p-4">
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-people-fill text-warning me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Total Users</h6>
                    <h3 className="text-white mb-0">5</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock-fill text-warning me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Pending</h6>
                    <h3 className="text-white mb-0">2</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Approved</h6>
                    <h3 className="text-white mb-0">2</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-x-circle-fill text-danger me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Rejected</h6>
                    <h3 className="text-white mb-0">1</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="p-4">
          <Col>
            <Card className="admin-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-warning mb-0">All Users</h5>
                  <Button className="login-button" style={{border: 'none'}}>
                    <i className="bi bi-plus-circle me-2"></i>Add New User
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="users-table-container">
                  {users.map((user, index) => (
                    <div key={user.id} className="user-row">
                      <div className="user-id">
                        <span className="id-badge">#{index + 1}</span>
                      </div>
                      <div className="user-info">
                        <div className="user-avatar">
                          <i className="bi bi-person-circle text-warning"></i>
                        </div>
                        <div className="user-details">
                          <h6 className="user-name">{user.name}</h6>
                          <p className="user-email">{user.email}</p>
                          <p className="user-phone">{user.phone}</p>
                        </div>
                      </div>
                      <div className="user-meta">
                        <div className="meta-item">
                          <span className="meta-label">Payment:</span>
                          <Badge bg="info" className="ms-2">{user.paymentMethod}</Badge>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Joined:</span>
                          <span className="meta-value">{user.joinDate}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Status:</span>
                          <Badge 
                            bg={user.status === 'Approved' ? 'success' : user.status === 'Rejected' ? 'danger' : 'warning'}
                            className="ms-2"
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="user-actions">
                        {user.status === 'Pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="action-btn approve-btn"
                              onClick={() => handleApprove(user.id)}
                              title="Approve User"
                            >
                              <i className="bi bi-check"></i>
                            </Button>
                            <Button 
                              size="sm" 
                              className="action-btn reject-btn"
                              onClick={() => handleReject(user.id)}
                              title="Reject User"
                            >
                              <i className="bi bi-x"></i>
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          className="action-btn edit-btn"
                          title="Edit User"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button 
                          size="sm" 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user.id)}
                          title="Delete User"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default UsersPage;