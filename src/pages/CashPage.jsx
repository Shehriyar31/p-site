import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../assets/logo.png';
import '../components/Common.css';
import '../components/AdminPanel.css';
import '../components/ForceRefresh.css';
import 'react-toastify/dist/ReactToastify.css';

const CashPage = () => {
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
                      <h2 className="text-white mb-0 header-title">Cash Management</h2>
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
          <Col>
            <Card className="admin-card">
              <Card.Header>
                <h5 className="text-warning mb-0">Cash Overview</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} lg={3} className="mb-4">
                    <Card className="admin-card">
                      <Card.Body className="text-center">
                        <i className="bi bi-wallet2 text-warning mb-3" style={{fontSize: '40px'}}></i>
                        <h6 className="text-warning">Total Cash Balance</h6>
                        <h3 className="text-white">$0</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3} className="mb-4">
                    <Card className="admin-card">
                      <Card.Body className="text-center">
                        <i className="bi bi-hourglass-split text-warning mb-3" style={{fontSize: '40px'}}></i>
                        <h6 className="text-warning">Pending Withdrawals</h6>
                        <h3 className="text-white">$0</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3} className="mb-4">
                    <Card className="admin-card">
                      <Card.Body className="text-center">
                        <i className="bi bi-arrow-down-circle text-success mb-3" style={{fontSize: '40px'}}></i>
                        <h6 className="text-warning">Today's Deposits</h6>
                        <h3 className="text-white">$0</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3} className="mb-4">
                    <Card className="admin-card">
                      <Card.Body className="text-center">
                        <i className="bi bi-arrow-up-circle text-danger mb-3" style={{fontSize: '40px'}}></i>
                        <h6 className="text-warning">Today's Withdrawals</h6>
                        <h3 className="text-white">$0</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="p-4">
          <Col md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Header>
                <h6 className="text-warning mb-0">Weekly Summary</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Total Deposits</span>
                  <span className="text-success">$0</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Total Withdrawals</span>
                  <span className="text-danger">$0</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">Net Balance</span>
                  <span className="text-warning">$0</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="admin-card">
              <Card.Header>
                <h6 className="text-warning mb-0">Monthly Summary</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Total Deposits</span>
                  <span className="text-success">$0</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Total Withdrawals</span>
                  <span className="text-danger">$0</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">Net Balance</span>
                  <span className="text-warning">$0</span>
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

export default CashPage;