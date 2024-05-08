import { FaArrowDown, FaBars, FaUser } from "react-icons/fa";
import Header from "../layout/header";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";

const AdminLayout = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container-fluid">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
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
                    <Dropdown.Item href="/menu">View Menu Live</Dropdown.Item>
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
