import Lottie from "lottie-react";
import food from "../assets/food.json";

const Landing = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-5 d-flex justify-content-center align-items-center">
            <div className="wrapper px-5">
              <h1 className="text-white display-3 fw-bold text-left">
                ORDER and RESERVE food you like anywhere!
              </h1>
              <h4 className="text-white">
                Experience convenience like never before – your table is just a
                tap away.
              </h4>
              <button className="btn btn-lg btn-primary my-3">View Menu</button>
              <button className="btn btn-lg btn-secondary my-3 mx-3 text-white">
                Login
              </button>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <Lottie
              animationData={food}
              loop={true}
              style={{ height: 600, width: 600 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
