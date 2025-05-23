import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../../axios/baseUrl";

const VerifyAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${base_url}/verify`,

        data
      );

      toast.success("Account Verified");

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="m-auto">
      <div className="">
        <h4 className="mb-2 fw-bold">Verify Account</h4>
        <p className="text-muted mb-4">
          Please Enter Your Otp or Check Your Inbox
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
                {...register("code", {
                  required: "Otp is required",
                })}
                className="form-control ps-5"
                placeholder="OTP "
              />
              <FaLock
                className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
            </div>

            {errors.code && (
              <p className="text-danger mt-1">{errors.code.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
