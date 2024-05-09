import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import RmsContext from "../RmsContext";
import { Dropdown, Badge } from "react-bootstrap";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const { auth, currentUser, disableAuth, updateCurrentUser } =
    useContext(RmsContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      disableAuth();
      updateCurrentUser(null);
      toast("See you again!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container>
          <Navbar.Brand href="/">
            <Link className="text-white nav-link" to={"/"}>
              <h1 className="fw-bold">RMS</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {auth && (
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
                <Nav.Link>
                  <Link className="text-white nav-link" to={"/cart"}>
                    <div className="wrapper d-flex justify-content-center align-items-center">
                      <h5>Cart</h5>
                      <FaCartShopping className="mx-1" />
                    </div>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <div className="wrapper d-flex justify-content-center align-items-center">
                    <h4 className="mx-3">{currentUser.displayName}</h4>

                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <img
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "100%",
                          }}
                          src={currentUser.photoURL}
                          alt=""
                        />{" "}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
