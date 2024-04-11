import Footer from "./layout/footer";
import Header from "./layout/header";
import TestModal from "./modal";
import Landing from "./page/landing";
import Menu from "./page/menu";
import ViewMore from "./page/view-more";

function App() {
  return (
    <>
      <div className="containe-fluid bg-dark" style={{ minHeight: "100vh" }}>
        <Header />
        <ViewMore />
      </div>
    </>
  );
}

export default App;
