import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url, USER_URLS } from "../../axios/baseUrl";
const Login = ({ setToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${USER_URLS.login}`,

        data
      );
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      toast.success("Logged in successfully");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="m-auto">
      <div className="">
        <h4 className="mb-2 fw-bold">Log In</h4>
        <p className="text-muted mb-4">
          Welcome Back! Please enter your details
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3 position-relative text-start">
            <div className="position-relative">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your E-mail"
                className="form-control ps-5"
              />
              <HiOutlineMail
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted input-icon"
                size={18}
              />
            </div>
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group mb-3 position-relative text-start">
            <div className="position-relative">
              <input
                //type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="form-control ps-5"
                placeholder="Password"
              />
              <FaLock
                className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
            </div>

            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="d-flex justify-content-between mb-3 text-start">
            <Link
              to="/register"
              className="text-decoration-none text-body fw-semibold fs-6"
            >
              Register Now?
            </Link>
            <a
              href="/forget-password"
              className="text-success text-decoration-none"
            >
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
