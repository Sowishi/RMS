import { FaShoppingCart } from "react-icons/fa";
import DefaultLayout from "../layout/default";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import RmsContext from "../RmsContext";
import { toast } from "react-toastify";
import { Accordion } from "react-bootstrap";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const { currentUser } = useContext(RmsContext);

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

  let total = 0;
  carts.map((cart) => {
    total += cart.product.price * cart.product.quantity;
  });

  return (
    <DefaultLayout>
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
                      {carts.map((cart) => {
                        return (
                          <>
                            <div
                              key={cart.id}
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
              <button className="btn btn-warning px-5">Reserved</button>
              <button className="btn btn-primary px-5">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Cart;
