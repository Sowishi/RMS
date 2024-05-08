import { useEffect, useState } from "react";
import RMSModal from "../components/modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DefaultLayout from "../layout/default";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner } from "react-bootstrap";

const ViewMore = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { productID } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const docRef = doc(db, "menu", productID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
      return;
    } else {
      console.log("No such document!");
      return null;
    }
  };

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
        {product ? (
          <div className="row mx-5">
            <div className="col-lg-5 d-flex justify-content-center align-items-center">
              <img
                style={{ width: "100%", height: 400 }}
                src={product.image}
                alt=""
              />
            </div>
            <div className="col-lg-7 text-white">
              <div className="wrapper">
                <h1>{product.title}</h1>
                <h3 className="text-secondary">₱{product.price}</h3>
                <p>{product.description}</p>
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
        ) : (
          <>
            <div className="container-fluid d-flex justify-content-center align-items-center">
              <Spinner variant="primary" />
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ViewMore;
