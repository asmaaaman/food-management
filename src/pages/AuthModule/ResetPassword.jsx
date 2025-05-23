import axios from "axios";

import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../../axios/baseUrl";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const onSubmit = async (data) => {
    try {
      await axios.post(`${base_url}/Reset`, data);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="m-auto">
      <div className="">
        <h4 className="mb-2 fw-bold">Reset Password</h4>
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
                {...register("seed", {
                  required: "OTP is required",
                })}
                className="form-control ps-5"
                placeholder="otp"
              />
              <FaLock
                className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
            </div>

            {errors.seed && (
              <p className="text-danger mt-1">{errors.seed.message}</p>
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, digit, special character, and be at least 6 characters long",
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
          <div className="form-group mb-3 position-relative text-start">
            <div className="position-relative">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  // minLength: {
                  //   value: 6,
                  //   message: "Confirm Password must be at least 6 characters",
                  // },
                })}
                className="form-control ps-5"
                placeholder="Confirm Password"
              />
              <FaLock
                className="input-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                size={18}
              />
            </div>

            {confirmPassword && !passwordsMatch && (
              <>
                <p className="text-danger">Passwords do not match</p>
              </>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
