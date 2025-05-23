import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../../axios/baseUrl";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${base_url}/Register`,

        data
      );

      toast.success("Register successfully");

      navigate("/verify-account");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="m-auto">
      <div className="">
        <h4 className="mb-2 fw-bold">Register</h4>
        <p className="text-muted mb-4">
          Welcome Back! Please enter your details
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3 position-relative text-start">
                  <div className="position-relative">
                    <input
                      type="string"
                      {...register("userName", {
                        required: "user name  is required",
                      })}
                      placeholder="Enter your name"
                      className="form-control ps-5"
                    />
                    <HiOutlineMail
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted input-icon"
                      size={18}
                    />
                  </div>
                  {errors.userName && (
                    <p className="text-danger mt-1">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div className="form-group mb-3 position-relative text-start">
                  <div className="position-relative">
                    <input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      className="form-control ps-5"
                      placeholder="Country"
                    />
                    <FaLock
                      className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      size={18}
                    />
                  </div>

                  {errors.country && (
                    <p className="text-danger mt-1">{errors.country.message}</p>
                  )}
                </div>
                <div className="form-group mb-3 position-relative text-start">
                  <div className="position-relative">
                    <input
                      type="password"
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
                    <p className="text-danger mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
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
                      {...register("phoneNumber", {
                        required: "phoneNumber  is required",
                        minLength: {
                          value: 10,
                          message:
                            "phoneNumber  must be at least 10 characters",
                        },
                      })}
                      className="form-control ps-5"
                      placeholder="phone"
                    />
                    <FaLock
                      className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      size={18}
                    />
                  </div>

                  {errors.phoneNumber && (
                    <p className="text-danger mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="form-group mb-3 position-relative text-start">
                  <div className="position-relative">
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "confirmPassword  is required",
                        minLength: {
                          value: 6,
                          message:
                            "confirmPassword  must be at least 6 characters",
                        },
                      })}
                      className="form-control ps-5"
                      placeholder="confirm Password "
                    />
                    <FaLock
                      className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      size={18}
                    />
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-danger mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {confirmPassword && !passwordsMatch && (
                    <>
                      <p className="text-danger">Passwords do not match</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
