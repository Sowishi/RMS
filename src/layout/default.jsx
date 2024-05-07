import Header from "../layout/header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <Header />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
