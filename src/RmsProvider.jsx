import { useState } from "react";
import RmsContext from "./RmsContext";

const RmsProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const enableAuth = () => {
    setAuth(true);
  };

  const disableAuth = () => {
    setAuth(false);
  };

  const updateCurrentUser = (data) => {
    setCurrentUser(data);
  };

  return (
    <RmsContext.Provider
      value={{ auth, enableAuth, disableAuth, updateCurrentUser, currentUser }}
    >
      {children}
    </RmsContext.Provider>
  );
};

export default RmsProvider;
