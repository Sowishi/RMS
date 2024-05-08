import Lottie from "lottie-react";
import food from "../assets/food.json";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import DefaultLayout from "../layout/default";
import { useContext } from "react";
import RmsContext from "../RmsContext";
import google from "../assets/google.png";

const Landing = () => {
  const {
    enableAuth,
    updateCurrentUser,
    auth: rmsAuth,
  } = useContext(RmsContext);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        enableAuth();
        updateCurrentUser(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <DefaultLayout>
        <div className="container-fluid bg-dark">
          <div className="row">
            <div className="col-lg-6 p-5 d-flex justify-content-center align-items-center">
              <div className="wrapper px-5">
                <h1 className="text-white display-3 fw-bold text-left">
                  ORDER and RESERVE food you like anywhere!
                </h1>
                <h4 className="text-white">
                  Experience convenience like never before – your table is just
                  a tap away.
                </h4>

                {!rmsAuth && (
                  <button
                    onClick={handleGoogleLogin}
                    className="btn my-3 text-white"
                  >
                    <img
                      style={{
                        width: "300px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={google}
                      alt=""
                    />
                  </button>
                )}
                {rmsAuth && (
                  <Link
                    to={"/menu"}
                    className="btn btn-primary my-3 w-100 py-3 text-white fw-bold"
                  >
                    View Menu
                  </Link>
                )}
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
      </DefaultLayout>
    </>
  );
};

export default Landing;
