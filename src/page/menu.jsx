import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";
import DefaultLayout from "../layout/default";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const Menu = () => {
  const menuRef = collection(db, "menu");
  const [menus, setMenus] = useState([]);

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

  return (
    <DefaultLayout>
      <div className="container-fluid pb-5">
        <div className="row mx-5">
          {menus.map((menu) => {
            return (
              <div className="col-lg-4 my-4" key={menu}>
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
                    <button className="btn btn-primary w-100">
                      <Link to={"/view-more"} className="text-white nav-link">
                        View More Details!
                      </Link>
                    </button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Menu;
