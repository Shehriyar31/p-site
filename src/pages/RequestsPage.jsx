import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';
import 'react-toastify/dist/ReactToastify.css';

const RequestsPage = () => {
  const [requests] = useState([
    { id: 1, user: 'Alice Brown', type: 'Deposit', amount: '$50', status: 'Pending', date: '2024-01-15' },
    { id: 2, user: 'Bob Wilson', type: 'Withdraw', amount: '$100', status: 'Approved', date: '2024-01-14' },
    { id: 3, user: 'Carol Davis', type: 'Deposit', amount: '$75', status: 'Pending', date: '2024-01-13' },
    { id: 4, user: 'David Miller', type: 'Withdraw', amount: '$200', status: 'Rejected', date: '2024-01-12' },
    { id: 5, user: 'Emma Wilson', type: 'Deposit', amount: '$150', status: 'Approved', date: '2024-01-11' }
  ]);

  const handleApprove = (id) => {
    toast.success(`Request ${id} approved successfully!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  const handleReject = (id) => {
    toast.error(`Request ${id} rejected!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      toast.success(`Request ${id} deleted successfully!`, {
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
                      <h2 className="text-white mb-0 header-title">Deposit/Withdraw Requests</h2>
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
                  <i className="bi bi-arrow-left-right text-warning me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Total Requests</h6>
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
                <h5 className="text-warning mb-0">All Requests</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="users-table-container">
                  {requests.map((request, index) => (
                    <div key={request.id} className="user-row">
                      <div className="user-id">
                        <span className="id-badge">#{index + 1}</span>
                      </div>
                      <div className="user-info">
                        <div className="user-avatar">
                          <i className={`bi ${request.type === 'Deposit' ? 'bi-arrow-down-circle' : 'bi-arrow-up-circle'} text-warning`}></i>
                        </div>
                        <div className="user-details">
                          <h6 className="user-name">{request.user}</h6>
                          <p className="user-email">{request.type} Request</p>
                          <p className="user-phone">{request.amount}</p>
                        </div>
                      </div>
                      <div className="user-meta">
                        <div className="meta-item">
                          <span className="meta-label">Type:</span>
                          <Badge bg={request.type === 'Deposit' ? 'info' : 'secondary'} className="ms-2">
                            {request.type}
                          </Badge>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Date:</span>
                          <span className="meta-value">{request.date}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Status:</span>
                          <Badge 
                            bg={request.status === 'Approved' ? 'success' : request.status === 'Rejected' ? 'danger' : 'warning'}
                            className="ms-2"
                          >
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="user-actions">
                        {request.status === 'Pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="action-btn approve-btn"
                              onClick={() => handleApprove(request.id)}
                              title="Approve Request"
                            >
                              <i className="bi bi-check"></i>
                            </Button>
                            <Button 
                              size="sm" 
                              className="action-btn reject-btn"
                              onClick={() => handleReject(request.id)}
                              title="Reject Request"
                            >
                              <i className="bi bi-x"></i>
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          className="action-btn edit-btn"
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button 
                          size="sm" 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(request.id)}
                          title="Delete Request"
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

export default RequestsPage;