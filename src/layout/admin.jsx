import { FaBars } from "react-icons/fa";
import Header from "../layout/header";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";

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
                size={"40px"}
              />
              <h2>Admin Dashboard</h2>
            </div>
          </div>
          <div className="col-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
