import { useContext, useEffect, useState } from "react";
import RMSModal from "../components/modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DefaultLayout from "../layout/default";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import RmsContext from "../RmsContext";
import { toast } from "react-toastify";

const ViewMore = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { productID } = useParams();
  const [product, setProduct] = useState();

  const { currentUser } = useContext(RmsContext);

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

  const handleAddToCart = () => {
    const cartRef = collection(db, "cart");
    addDoc(cartRef, {
      ownerName: currentUser.displayName,
      ownerID: currentUser.uid,
      product: { ...product, quantity: 1 },
      createdAt: serverTimestamp(),
    }).then(() => {
      toast("Added to cart!");
    });
  };

  return (
    <DefaultLayout>
      <div className="container-fluid">
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
                    onClick={handleAddToCart}
                  >
                    Add to Cart <FaCartShopping />
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
