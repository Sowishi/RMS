import Footer from "./layout/footer";
import Header from "./layout/header";
import TestModal from "./modal";
import Landing from "./page/landing";
import Menu from "./page/menu";
import ViewMore from "./page/view-more";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="containe-fluid bg-dark" style={{ minHeight: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/view-more" element={<ViewMore />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
