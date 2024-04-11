import { useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
const Menu = () => {
  const [menus, setMenu] = useState([
    { title: "Inasal", price: 500, description: "fkldjfj" },
    { title: "Inasal", price: 500, description: "fkldjfj" },
    { title: "Inasal", price: 500, description: "fkldjfj" },
    { title: "Inasal", price: 500, description: "fkldjfj" },
    { title: "Inasal", price: 500, description: "fkldjfj" },
    { title: "Inasal", price: 500, description: "fkldjfj" },
  ]);

  return (
    <div className="container-fluid pb-5">
      <div className="row mx-5">
        {menus.map((menu) => {
          return (
            <div className="col-lg-4 my-4" key={menu}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://fastly.picsum.photos/id/784/200/300.jpg?hmac=LIWlcHgxQH79XHKNji8Jin_KakntjYyd9VXyckNYFbE"
                  style={{ height: 300, objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between">
                      <h5 className="text-primary">{menu.title}</h5>
                      <h5 className="text-secondary fw-bold">₱{menu.price}</h5>
                    </div>
                  </Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                  <button className="btn btn-primary w-100">
                    View More Details!
                  </button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
