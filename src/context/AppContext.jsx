import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const passwordContext = createContext();


export const AppContext = ({ children }) => {
  const [user, setUser] = useState(false);
  const navigate=useNavigate()

  const value = {
    user,
    setUser,
    navigate
  };

  return (
    <passwordContext.Provider value={value}>
      {children}
    </passwordContext.Provider>
  );
};

export default passwordContext;
