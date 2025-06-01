import React from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, USER_URLS } from "../../axios/baseUrl";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(
        `${USER_URLS.forgetPassword}`,

        data
      );

      toast.success("Check Code send to your email");

      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="m-auto">
      <div className="">
        <h4 className="mt-4 fw-bold">Forgot Your Password?</h4>
        <p className="text-muted mb-4">
          No worries! Please enter your email and we will send a password reset
          link
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-4 position-relative text-start">
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
                className="position-absolute top-50 translate-middle-y text-muted input-icon"
                size={18}
              />
            </div>
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
