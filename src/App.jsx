import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AuthNotFound from "./pages/AuthNotFound";
import DashboardRoutes from "./routes/DashboardRoutes";
import authRoutes from "./routes/AuthRoutes";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  let { setToken, token, decodedToken } = useContext(AuthContext);
  if (token && !decodedToken) {
    return <div>Loading...</div>;
  }

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
