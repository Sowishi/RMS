import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container>
          <Navbar.Brand href="#home">
            <h1 className="fw-bold">RMS</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-end w-100">
              <Nav.Link>
                <h5 className="mx-3">Home</h5>
              </Nav.Link>
              <Nav.Link>
                <h5 className="mx-3">Menu</h5>
              </Nav.Link>
              <Nav.Link>
                <h5 className="mx-3">Transaction</h5>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
