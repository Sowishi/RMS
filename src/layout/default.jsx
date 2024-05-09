import { useEffect } from "react";
import Header from "../layout/header";

const DefaultLayout = ({ children }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers require this to be set.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
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
