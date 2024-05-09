import { Badge, Table } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import RmsContext from "../RmsContext";
import { toast } from "react-toastify";

const Transaction = () => {
  const [products, setProducts] = useState([]);

  const { currentUser } = useContext(RmsContext);
  const productsRef = collection(db, "order");

  const getProducts = () => {
    onSnapshot(productsRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.ownerID == currentUser.uid) {
          output.push({ ...data, id: doc.id });
        }
      });
      setProducts(output);
    });
  };

  const handleCancel = (id) => {
    const orderDoc = doc(db, "order", id);
    deleteDoc(orderDoc)
      .then(() => {
        toast("Cancelled Successfully");
      })
      .catch(() => {
        toast("Error Cancelling");
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <DefaultLayout>
      <div className="container text-white">
        <h1 className="fw-bold my-3">Your Transaction History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Remarks</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.details.name} </td>
                  <td>{product.details.phone} </td>
                  <td>{product.details.address} </td>
                  <td>{product.details.remarks} </td>

                  <td>
                    {JSON.parse(product.products).map((data, index) => {
                      return (
                        <p key={index}>
                          {data.product.title} x{data.product.quantity}
                        </p>
                      );
                    })}
                  </td>
                  <td>₱{product.total}</td>
                  <td>{product.status}</td>
                  <td>
                    <h5 className="mb-0 fw-bold">{product.type}</h5>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(product.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </DefaultLayout>
  );
};

export default Transaction;
