import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Tags from "../../../selectors/tags";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Categories from "../../../selectors/Categories";
import ImageUploader from "../../../components/UploadImg";
import {
  axiosInstance,
  base_img_url,
  Recipes_URLS,
} from "../../../axios/baseUrl";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddEditRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedTag, setSelectedTag] = useState(null);
  const [tagIds, setTagList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedTag, selectedCategory);
  const [categories, setCategoryList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchRecpieDetails = async () => {
    try {
      const { data } = await axiosInstance.get(Recipes_URLS.getRecipe(id));
      console.log("data in edit", data);
      setImagePreview(`${base_img_url}/${data.imagePath}`);

      setValue("name", data.name);
      setValue("price", data.price);
      setValue("description", data.description);
      setValue("tagId", data.tag?.id);
      // setValue("recipeImage", "placeholder", { shouldValidate: true });

      setValue(
        "categoriesIds",
        data.category?.map((cat) => cat.id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch recipe details");
    }
  };

  useEffect(() => {
    fetchRecpieDetails();
  }, [id]);
  useEffect(() => {
    if (imagePreview) {
      setValue("recipeImage", "EXISTING_IMAGE", { shouldValidate: true });
    }
  }, [imagePreview, setValue]);

  const createRecipeFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    (Array.isArray(data.categoriesIds)
      ? data.categoriesIds
      : [data.categoriesIds]
    ).forEach((id) => {
      formData.append("categoriesIds", id);
    });
    formData.append("description", data.description);
    if (data.recipeImage instanceof File) {
      formData.append("recipeImage", data.recipeImage);
    }

    return formData;
  };

  const onSubmit = async (data) => {
    const formData = createRecipeFormData(data);

    if (id) {
      try {
        const response = await axiosInstance.put(
          Recipes_URLS.update(id),
          formData
        );
        console.log("rfrrg", response);
        toast.success("Recipe updated successfully");
        navigate("/dashboard/recipes");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update recipe");
      }
    } else {
      try {
        await axiosInstance.post(`${Recipes_URLS.recipes}`, formData);

        toast.success("Recipe added successfully");
        navigate("/dashboard/recipes");
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="recipe-header m-4 p-4">
          <div className="row">
            <div className="col-md-8 d-flex align-items-center ">
              <div>
                <h5 className="fw-bold">
                  {id ? "Edit" : "Fill the"}
                  <span className="text-success p-1">Recipe!</span>
                </h5>
                <p>
                  you can now fill the meals easily using the table and form ,
                  <br />
                  click here and sill it with the table !
                </p>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <button className="btn btn-success">
                All Recipes
                <BsArrowRight className="mr-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col-md-9 mt-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  className="form-control"
                  placeholder="Recipe Name"
                  {...register("name", {
                    required: { value: true, message: "Please enter the name" },
                  })}
                />

                <span className="text-danger">{errors?.name?.message}</span>
              </div>
              <div className="mb-4">
                <Tags
                  register={register}
                  errors={errors}
                  setSelectedTag={setSelectedTag}
                  tagIds={tagIds}
                  isRequired
                  setTagList={setTagList}
                />
              </div>
              <div className="mb-4">
                <Categories
                  setSelectedCategory={setSelectedCategory}
                  setCategoryList={setCategoryList}
                  categories={categories}
                  register={register}
                  errors={errors}
                  isRequired={true}
                />
              </div>
              <div className="mb-4">
                <input
                  className="form-control"
                  placeholder="Price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Please enter the price",
                    },
                  })}
                />
                <span className="text-danger">{errors?.price?.message}</span>
              </div>
              <div className="mb-4">
                <textarea
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Please enter the description",
                    },
                  })}
                  placeholder="Description"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                <span className="text-danger">
                  {errors?.description?.message}
                </span>
              </div>

              <div className="mb-4">
                <ImageUploader
                  onImageSelect={(file) => {
                    setValue("recipeImage", file, { shouldValidate: true });
                  }}
                  preview={imagePreview}
                  // error={errors.recipeImage?.message}
                />
                <span className="text-danger">
                  {errors?.recipeImage?.message}
                </span>
              </div>
              <Button
                className="mb-2"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : id
                  ? "Update Recipe"
                  : "Add Recipe"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditRecipe;
