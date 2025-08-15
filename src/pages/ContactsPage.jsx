import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import RefreshButton from '../components/RefreshButton';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import 'react-toastify/dist/ReactToastify.css';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    const saved = localStorage.getItem('userContacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  };

  useEffect(() => {
    fetchContacts();

    // Listen for real-time updates
    const handleNewContact = (event) => {
      setContacts(prev => [event.detail, ...prev]);
    };

    window.addEventListener('newContact', handleNewContact);
    return () => window.removeEventListener('newContact', handleNewContact);
  }, []);

  const updateStatus = (id, status) => {
    const updated = contacts.map(c => 
      c.id === id ? { ...c, status } : c
    );
    setContacts(updated);
    localStorage.setItem('userContacts', JSON.stringify(updated));
    toast.success(`Status updated to ${status}`);
  };

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('userContacts', JSON.stringify(updated));
    toast.success('Contact deleted');
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
                      <h2 className="text-white mb-0 header-title">User Contacts</h2>
                      <small className="text-warning">Manage user messages and complaints</small>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="d-flex justify-content-lg-end justify-content-center gap-2">
                    <RefreshButton onRefresh={fetchContacts} />
                    <Link to="/admin">
                      <Button variant="outline-warning" size="sm">
                        <i className="bi bi-arrow-left me-1"></i>Back to Admin
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline-light" size="sm">
                        <i className="bi bi-box-arrow-right me-1"></i>Logout
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="p-4">
          <Col lg={4} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-fill text-warning me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Total Messages</h6>
                    <h3 className="text-white mb-0">{contacts.length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-open text-success me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">New Messages</h6>
                    <h3 className="text-white mb-0">{contacts.filter(c => c.status === 'New').length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock text-warning me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Pending</h6>
                    <h3 className="text-white mb-0">{contacts.filter(c => c.status === 'Pending').length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle text-success me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Complete</h6>
                    <h3 className="text-white mb-0">{contacts.filter(c => c.status === 'Complete').length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <i className="bi bi-x-circle text-danger me-3" style={{fontSize: '30px'}}></i>
                  <div>
                    <h6 className="text-warning mb-1">Rejected</h6>
                    <h3 className="text-white mb-0">{contacts.filter(c => c.status === 'Rejected').length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="p-4">
          <Col>
            <Card className="admin-card">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="text-warning mb-0">All Messages</h5>
                <div className="d-flex align-items-center">
                  <div className="live-indicator me-2">
                    <span className="live-dot" style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      marginRight: '5px',
                      animation: 'pulse 2s infinite'
                    }}></span>
                    <small className="text-success">Live</small>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {contacts.length === 0 ? (
                  <p className="text-warning text-center py-4">No messages found</p>
                ) : (
                  contacts.map(contact => (
                    <Card key={contact.id} className="mb-3" style={{
                      background: contact.status === 'New' ? 'rgba(255,140,0,0.15)' : 'rgba(255,140,0,0.05)', 
                      border: `1px solid ${contact.status === 'New' ? 'rgba(255,140,0,0.5)' : 'rgba(255,140,0,0.2)'}`
                    }}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <h6 className="text-warning mb-0">{contact.name}</h6>
                              <Badge bg={
                                contact.status === 'New' ? 'warning' :
                                contact.status === 'Pending' ? 'info' :
                                contact.status === 'Complete' ? 'success' :
                                contact.status === 'Rejected' ? 'danger' : 'secondary'
                              }>
                                {contact.status}
                              </Badge>
                              {contact.submittedBy && (
                                <Badge bg="secondary" className="ms-1">
                                  @{contact.submittedBy}
                                </Badge>
                              )}
                            </div>
                            <div className="row mb-2">
                              <div className="col-md-6">
                                <small className="text-warning">Username: </small>
                                <small className="text-white">{contact.username || 'N/A'}</small>
                              </div>
                              <div className="col-md-6">
                                <small className="text-warning">Email: </small>
                                <small className="text-white">{contact.email || 'N/A'}</small>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-md-6">
                                <small className="text-warning">Phone: </small>
                                <small className="text-white">{contact.phone || 'N/A'}</small>
                              </div>
                              <div className="col-md-6">
                                <small className="text-warning">Date: </small>
                                <small className="text-white">{new Date(contact.createdAt).toLocaleString()}</small>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <small className="text-warning">Account Username: </small>
                                <small className="text-white font-weight-bold">{contact.userAccount || 'N/A'}</small>
                              </div>
                              <div className="col-md-6">
                                <small className="text-warning">User ID: </small>
                                <small className="text-white">{contact.userId || 'N/A'}</small>
                              </div>
                            </div>
                            <div className="message-content p-3" style={{
                              background: 'rgba(0,0,0,0.2)', 
                              borderRadius: '8px',
                              border: '1px solid rgba(255,140,0,0.2)'
                            }}>
                              <small className="text-warning">Message:</small>
                              <p className="text-white mb-0 mt-1">{contact.message}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column gap-1 ms-3">
                            {contact.status !== 'Pending' && (
                              <Button 
                                variant="outline-info" 
                                size="sm"
                                onClick={() => updateStatus(contact.id, 'Pending')}
                                title="Mark as Pending"
                              >
                                <i className="bi bi-clock"></i>
                              </Button>
                            )}
                            {contact.status !== 'Complete' && (
                              <Button 
                                variant="outline-success" 
                                size="sm"
                                onClick={() => updateStatus(contact.id, 'Complete')}
                                title="Mark as Complete"
                              >
                                <i className="bi bi-check-circle"></i>
                              </Button>
                            )}
                            {contact.status !== 'Rejected' && (
                              <Button 
                                variant="outline-warning" 
                                size="sm"
                                onClick={() => updateStatus(contact.id, 'Rejected')}
                                title="Mark as Rejected"
                              >
                                <i className="bi bi-x-circle"></i>
                              </Button>
                            )}
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => deleteContact(contact.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default ContactsPage;