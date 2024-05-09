import { FaArrowDown, FaBars, FaUser } from "react-icons/fa";
import Header from "../layout/header";
import { Dropdown, ListGroup, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container-fluid">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Admin Tools</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup as="ul">
              <ListGroup.Item as="li">
                <Link className="nav-link" to={"/admin-dashboard"}>
                  Menu
                </Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link className="nav-link" to={"/admin-transaction"}>
                  Orders
                </Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link className="nav-link" to={"/"}>
                  View Site
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="row">
          <div className="col-12">
            <div className="header-wrapper w-100 bg-primary py-2 px-4 rounded mt-1 text-white d-flex justify-content-between align-items-center">
              <FaBars
                style={{ cursor: "pointer" }}
                onClick={handleShow}
                size={"30px"}
              />
              <div className="wrapper d-flex jsutify-content-center align-items-center">
                <h3 className="mx-2">Admin Dashboard</h3>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <FaGear
                      color="white"
                      style={{ cursor: "pointer" }}
                      size={"20px"}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="col-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
