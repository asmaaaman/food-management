import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import BaseModal from "../../../components/BaseModal";
import { axiosInstance, Categories_URLS } from "../../../axios/baseUrl";
import { toast } from "react-toastify";

const AddEditCategory = ({
  isOpen,
  onClose,

  defaultValues = {},
  handleGetList,
}) => {
  const [categoryName, setCategoryName] = useState(defaultValues?.name || "");
  useEffect(() => {
    setCategoryName(defaultValues?.name || "");
  }, [defaultValues]);

  const handleSubmit = async () => {
    if (categoryName.trim() === "") return;
    const data = {
      name: categoryName,
    };
    try {
      if (defaultValues?.id) {
        await axiosInstance.put(
          `${Categories_URLS.categories}/${defaultValues.id}`,
          data
        );
        toast.success("Category updated");
      } else {
        await axiosInstance.post(Categories_URLS.categories, data);
        toast.success("Category added");
      }

      handleGetList();
      onClose();
      setCategoryName("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={defaultValues?.id ? "Edit Category" : "Add Category"}
      footer={
        <>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </>
      }
    >
      <Form.Group>
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
      </Form.Group>
    </BaseModal>
  );
};

export default AddEditCategory;
