import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

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
                <Link className="text-white nav-link" to={"/"}>
                  <h5 className="mx-3">Home</h5>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="text-white nav-link" to={"/menu"}>
                  <h5 className="mx-3">Menus</h5>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="text-white nav-link" to={"/transaction"}>
                  <h5 className="mx-3">Transaction</h5>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
