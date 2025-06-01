import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

//1-create   2-provide

//create
export let AuthContext = createContext(null);
//provider
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [decodedToken, setIsDecoded] = useState(null);

  console.log("decodedToken", decodedToken);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsDecoded(decoded);
      } catch {
        setIsDecoded(null);
      }
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ decodedToken, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
}
