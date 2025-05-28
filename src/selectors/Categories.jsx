import React, { useEffect } from "react";
import { axiosInstance, Categories_URLS } from "../axios/baseUrl";

const Categories = ({
  setSelectedCategory,
  setCategoryList,
  categories,
  register,
}) => {
  const handleGetCategories = async () => {
    const response = await axiosInstance.get(Categories_URLS.categories, {
      params: {
        pageSize: 100,
        page: 1,
      },
    });
    setCategoryList(response?.data?.data);
  };
  useEffect(() => {
    handleGetCategories();
  }, []);
  return (
    <>
      <select
        className="form-select rounded-3 shadow-sm border-light"
        style={{ minWidth: 150 }}
        onChange={(e) => setSelectedCategory(e.target.value)}
        {...(register ? register("categoriesIds") : {})}
      >
        <option value="">Category</option>

        {categories.map((category) => (
          <option id={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Categories;
