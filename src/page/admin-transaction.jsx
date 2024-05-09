import { Badge, Dropdown, Table } from "react-bootstrap";
import AdminLayout from "../layout/admin";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import RmsContext from "../RmsContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import RmsPassword from "../password";

const AdminTransaction = () => {
  const [products, setProducts] = useState([]);

  const { currentUser } = useContext(RmsContext);
  const productsRef = collection(db, "order");

  const { password } = useParams();

  const navigate = useNavigate();

  if (password !== RmsPassword) {
    navigate("/admin");
  }

  const getProducts = () => {
    onSnapshot(productsRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        output.push({ ...data, id: doc.id });
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

  const handleUpdateStatus = (id, type) => {
    const orderDoc = doc(db, "order", id);
    updateDoc(orderDoc, { status: type })
      .then(() => {
        toast("Updated Successfully");
      })
      .catch(() => {
        toast("Error");
      });
  };

  const getStatusBackground = (type) => {
    if (type == "pending") {
      return "bg-primary";
    } else if (type == "on process") {
      return "bg-secondary";
    } else if (type == "completed") {
      return "bg-success";
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="container text-white">
        <h1 className="fw-bold my-3">RMS Transaction</h1>
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
                  <td
                    className={`${getStatusBackground(
                      product.status
                    )} text-white`}
                  >
                    {product.status}
                  </td>{" "}
                  <td>
                    <h5 className="mb-0 fw-bold">{product.type}</h5>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Update Status
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleUpdateStatus(product.id, "pending")
                          }
                        >
                          Pending
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleUpdateStatus(product.id, "on process")
                          }
                          href="#/action-2"
                        >
                          On Process
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleUpdateStatus(product.id, "completed")
                          }
                          href="#/action-3"
                        >
                          Completed
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <button
                      onClick={() => handleCancel(product.id)}
                      className="btn btn-danger mt-2"
                    >
                      Remove Order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminTransaction;
