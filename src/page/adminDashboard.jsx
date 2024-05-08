import { Button, Card, Form, Modal } from "react-bootstrap";
import AdminLayout from "../layout/admin";
import RMSModal from "../components/modal";
import { useEffect, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [menus, setMenus] = useState([]);

  const [currentProduct, setCurrentProduct] = useState();

  const menuRef = collection(db, "menu");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          getDownloadURL(storageRef)
            .then((url) => {
              handleSaveMenu(url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const handleSaveMenu = (url) => {
    const data = {
      title,
      price,
      description,
      image: url,
      createdAt: serverTimestamp(),
    };
    addDoc(menuRef, data).then(() => {
      toast("Menu Save Successfully!");
      setAdding(false);
    });
  };

  const handleUpdateMenu = (url) => {
    const docRef = doc(db, "menu", currentProduct.id);
    updateDoc(docRef, {
      title: title ? title : currentProduct.title,
      price: price ? price : currentProduct.price,
      description: description ? description : currentProduct.description,
    }).then(() => {
      setEditing(false);
      toast("Updated Successfully!");
    });
  };

  const handleDelete = (docID) => {
    const docRef = doc(db, "menu", docID);
    deleteDoc(docRef).then(() => {
      toast("Deleted Successfully!");
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(menuRef, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });

      setMenus(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateCurrentProduct = (docID) => {
    const selected = menus.filter((menu) => {
      if (menu.id == docID) {
        return menu;
      }
    });

    setCurrentProduct(selected[0]);
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <RMSModal
          show={adding || editing}
          onHide={() => {
            setAdding(false);
            setEditing(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{editing ? "Edit Menu" : "Add Menu"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                  placeholder={editing ? currentProduct.title : ""}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder={editing ? currentProduct.price : ""}
                  onChange={(event) => setPrice(event.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder={editing ? currentProduct.description : ""}
                  onChange={(event) => setDescription(event.target.value)}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              {!editing && (
                <>
                  <Form.Label>Image</Form.Label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setAdding(false)}>
              Close
            </Button>
            {editing ? (
              <Button variant="primary" onClick={handleUpdateMenu}>
                Update Menu
              </Button>
            ) : (
              <Button variant="primary" onClick={handleUpload}>
                Add to Menu
              </Button>
            )}
          </Modal.Footer>
        </RMSModal>
        <div className="row">
          <div className="col-12 mt-4 px-5  d-flex justify-content-between align-items-center">
            <h2 className="text-white fw-bold">Your Menu</h2>
            <button
              className="btn btn-secondary btn-lg text-white"
              onClick={() => setAdding(true)}
            >
              Add Menu
            </button>
          </div>
          <div className="col-12">
            <div className="row">
              {menus.map((menu) => {
                return (
                  <div className="col-lg-4 my-4" key={menu.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={menu.image}
                        style={{ height: 300, objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>
                          <div className="d-flex justify-content-between">
                            <h5 className="text-primary">{menu.title}</h5>
                            <h5 className="text-secondary fw-bold">
                              ₱{menu.price}
                            </h5>
                          </div>
                        </Card.Title>
                        <Card.Text>{menu.description}</Card.Text>
                        <div className="wrapper d-flex">
                          <button
                            className="btn btn-secondary mx-3 w-100"
                            onClick={() => {
                              setEditing(true);
                              updateCurrentProduct(menu.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(menu.id)}
                            className="btn mx-3 btn-primary w-100"
                          >
                            Delete
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
