import Footer from "./layout/footer";
import AdminLogin from "./page/adminLogin";
import AdminDashboard from "./page/adminDashboard";
import Landing from "./page/landing";
import Menu from "./page/menu";
import ViewMore from "./page/view-more";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RmsProvider from "./RmsProvider";
import Cart from "./page/cart";
import Transaction from "./page/transcation";

function App() {
  return (
    <>
      <RmsProvider>
        <div className="containe-fluid bg-dark" style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/view-more/:productID" element={<ViewMore />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </div>
      </RmsProvider>

      <ToastContainer />
    </>
  );
}

export default App;
