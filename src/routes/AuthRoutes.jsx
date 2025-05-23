import AuthLayout from "../layouts/AuthLayout";
import ForgetPassword from "../pages/AuthModule/ForgetPassword";
import Login from "../pages/AuthModule/Login";
import Register from "../pages/AuthModule/Register";
import ResetPassword from "../pages/AuthModule/ResetPassword";
import VerifyAccount from "../pages/AuthModule/VerifyAccount";
import ProtectedRoutes from "./protectedRoutes";

const authRoutes = (setToken) => [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login setToken={setToken} />,
      },
      {
        path: "login",
        element: <Login setToken={setToken} />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-account",
        element: <VerifyAccount />,
      },
    ],
  },
];

export default authRoutes;
