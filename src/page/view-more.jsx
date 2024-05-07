import { useState } from "react";
import RMSModal from "../components/modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DefaultLayout from "../layout/default";

const ViewMore = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <DefaultLayout>
      <div className="container-fluid">
        <RMSModal show={showInfoModal} onHide={() => setShowInfoModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Please Enter your information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Remarks</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
            <button className="btn btn-primary w-100 btn-lg">Confirm</button>
          </Modal.Body>
        </RMSModal>
        <div className="row mx-5">
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <img
              style={{ width: "100%", height: 400 }}
              src="https://fastly.picsum.photos/id/254/200/300.jpg?hmac=VoOUXxjWvbLuWPBSHy_pbMAoLSYCaO-3drnOhwvA2yY"
              alt=""
            />
          </div>
          <div className="col-lg-7 text-white">
            <div className="wrapper">
              <h1>Inasal</h1>
              <h3 className="text-secondary">₱500</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
                eius, libero eligendi temporibus facilis placeat distinctio
                ducimus repellendus nam, totam non dignissimos exercitationem
                ullam enim tempore optio excepturi quasi rerum dicta repellat
                iure illum, tenetur accusantium dolorum. Consectetur quas
                molestiae soluta, a praesentium assumenda laborum, atque
                numquam, dolores ut quaerat?
              </p>
              <div className="wrapper d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setShowInfoModal(true)}
                >
                  Reserve
                </button>
                <button className="btn btn-secondary btn-lg text-white m mx-3">
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewMore;
