import Footer from "./layout/footer";
import TestModal from "./modal";
import Admin from "./page/admin";
import Landing from "./page/landing";
import Menu from "./page/menu";
import ViewMore from "./page/view-more";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="containe-fluid bg-dark" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/view-more" element={<ViewMore />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
