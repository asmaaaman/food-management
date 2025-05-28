import React, { useState } from "react";
import BaseModal from "../../../components/BaseModal";
import { Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { axiosInstance, USER_URLS } from "../../../axios/baseUrl";
import { toast } from "react-toastify";

const ChangePassword = ({ onClose }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const newPassword = watch("newPassword");
  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(
        USER_URLS.changePassword,

        data
      );

      toast.success("Check Code send to your email");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <BaseModal
        isOpen={true}
        onClose={onClose}
        title="Change Your Password"
        subtitle="Enter your details below"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div className="mb-3 position-relative">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              {...register("oldPassword")}
              className="form-control py-2 px-4"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              onClick={() => setShowOldPassword(!showOldPassword)}
              style={{ cursor: "pointer" }}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword")}
              className="form-control py-2 px-4"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{ cursor: "pointer" }}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              {...register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="form-control py-2 px-4"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors?.confirmNewPassword && (
              <span className="text-danger">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
          <Button type="submit" variant="success" className="w-100">
            Change Password
          </Button>
        </form>
      </BaseModal>
    </div>
  );
};

export default ChangePassword;
