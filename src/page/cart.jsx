import { FaShoppingCart } from "react-icons/fa";
import DefaultLayout from "../layout/default";
import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import RmsContext from "../RmsContext";
import { toast } from "react-toastify";
import { Accordion, Form, Modal, Table } from "react-bootstrap";
import RMSModal from "../components/modal";
import Stripe from "../components/stripe";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const { currentUser } = useContext(RmsContext);
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [remarks, setRemarks] = useState();
  const [reserve, setReserve] = useState(false);

  useEffect(() => {
    const cartRef = collection(db, "cart");

    onSnapshot(cartRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.ownerID == currentUser.uid) {
          output.push({ ...data, id: doc.id });
        }
      });
      setCarts(output);
    });
  }, []);

  const handleDeleteCart = (docID) => {
    const docRef = doc(db, "cart", docID);
    deleteDoc(docRef)
      .then(() => {
        toast("Deleted Successfully!");
      })
      .catch(() => {
        toast("Error Deleting");
      });
  };

  const handleIncrement = (id) => {
    const cartsCopy = [...carts];
    const output = cartsCopy.map((cart) => {
      if (cart.id == id) {
        cart.product.quantity += 1;
      }
      return cart;
    });

    setCarts(output);
  };

  const handleDecrement = (id) => {
    const cartsCopy = [...carts];
    const output = cartsCopy.map((cart) => {
      if (cart.id == id) {
        cart.product.quantity -= 1;
      }
      return cart;
    });

    setCarts(output);
  };

  function handleDeleteAllCart() {
    carts.map((cart) => {
      const cartDoc = doc(db, "cart", cart.id);
      deleteDoc(cartDoc);
    });
  }

  const handleCheckout = () => {
    const orderRef = collection(db, "order");
    const data = {
      createdAt: serverTimestamp(),
      type: reserve ? "reserve" : "checkout",
      products: JSON.stringify(carts),
      ownerID: currentUser.uid,
      details: {
        name,
        phone,
        address,
        remarks,
      },
      total: total,
      status: "pending",
    };
    addDoc(orderRef, data).then(() => {
      toast("Successfully Checkout!");
      setCheckout(false);
      handleDeleteAllCart();
    });
  };

  let total = 0;
  carts.map((cart) => {
    total += cart.product.price * cart.product.quantity;
  });

  return (
    <DefaultLayout>
      <RMSModal show={checkout} onHide={() => setCheckout(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {reserve ? "Reserve" : "Checkout"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stripe />
          <Form>
            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                onChange={(event) => setPhone(event.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(event) => setAddress(event.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                onChange={(event) => setRemarks(event.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
          <button
            onClick={handleCheckout}
            className={`btn ${
              reserve ? "btn-success" : "btn-primary"
            } w-100 btn-lg`}
          >
            {reserve ? "Reserve" : "Checkout"}
          </button>
        </Modal.Body>
      </RMSModal>
      <div className="container-fluid">
        <div className="row">
          <div className="col-7 text-white">
            <h1 className="fw-bold my-3">
              Your Cart <FaShoppingCart />
            </h1>

            {carts.length >= 1 && (
              <table class="table table-striped p-3">
                <thead className="py-3">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) => {
                    return (
                      <tr className="px-3 p-5" key={cart.id}>
                        <td>
                          <img
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "contain",
                            }}
                            src={cart.product.image}
                            alt=""
                          />
                        </td>
                        <td>{cart.product.title}</td>

                        <td>{cart.product.description}</td>
                        <td>₱{cart.product.price}</td>
                        <td>
                          <button
                            disabled={cart.product.quantity == 1}
                            onClick={() => handleDecrement(cart.id)}
                            className="btn btn-secondary"
                          >
                            -
                          </button>
                          <span className="mx-3 text-black">
                            {cart.product.quantity}
                          </span>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleIncrement(cart.id)}
                          >
                            +
                          </button>
                        </td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteCart(cart.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {carts.length < 1 && (
              <>
                <h3 className="text-white text-center mt-5">
                  Your cart is empty 🥲
                </h3>
              </>
            )}
          </div>
          <div className="col-4 mx-5 rounded p-3 bg-white">
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Checkout</Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-12">
                      <p className="fw-bold">Summarization</p>
                      {carts.map((cart, index) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="wrapper d-flex justify-content-between align-items-center"
                            >
                              <p>{cart.product.title}</p>
                              <p>x{cart.product.quantity}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="col-12">
                      <h4>Your Total: ₱{total}</h4>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="buttons d-flex justify-content-around align-items-center mt-3">
              <button
                className="btn btn-warning px-5"
                onClick={() => {
                  setCheckout(true);
                  setReserve(true);
                }}
              >
                Reserved
              </button>
              <button
                className="btn btn-primary px-5"
                onClick={() => {
                  setCheckout(true);
                  setReserve(false);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Cart;
