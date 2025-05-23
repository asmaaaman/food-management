import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AuthNotFound from "./pages/AuthNotFound";
import DashboardRoutes from "./routes/DashboardRoutes";
import authRoutes from "./routes/AuthRoutes";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
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

  const routes = createBrowserRouter([
    ...DashboardRoutes(token),
    ...authRoutes(setToken),

    {
      path: "*",
      Component: () => {
        const pathname = window.location.pathname;
        if (pathname.startsWith("/dashboard")) {
          return <NotFound />;
        } else {
          return <AuthNotFound />;
        }
      },
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
