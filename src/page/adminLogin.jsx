import { Button, Form, Spinner } from "react-bootstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import laco from "../assets/laco-bg.jpg";
import AdminLayout from "../layout/admin";
import Lottie from "lottie-react";
import admin from "../assets/admin.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password == "admin" && email == "admin") {
      navigate("/admin-dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row vh-100">
        <div className="col-12">
          {error && (
            <div class="alert alert-primary text-center" role="alert">
              Username or Password is Incorrect!
            </div>
          )}
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <Lottie
            animationData={admin}
            loop={true}
            style={{ height: 600, width: 600 }}
          />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <div
            className="wrapper bg-white d-flex justify-content-center align-items-center rounded flex-column"
            style={{ width: "430px", height: "430px" }}
          >
            <Form className="w-100 p-4 rounded">
              <div className="text-center mb-5">
                <h4 className="fw-bold my-3">Restaurant Management System</h4>
                <h5>Admin Login</h5>
              </div>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <div className="wrappe d-flex justify-content-center align-items-center">
                  <FaUser className="mx-2" />
                  <Form.Control
                    onChange={(event) => setEmail(event.target.value)}
                    type="text"
                    placeholder="Enter email"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>

                <div className="wrappe d-flex justify-content-center align-items-center">
                  <FaLock className="mx-2" />
                  <Form.Control
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter email"
                    type="password"
                  />
                </div>
              </Form.Group>

              <Button
                variant="secondary"
                className="w-100 text-white"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
