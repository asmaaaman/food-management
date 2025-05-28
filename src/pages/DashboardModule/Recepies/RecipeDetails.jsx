import React, { useEffect, useState } from "react";
import {
  axiosInstance,
  base_img_url,
  Recipes_URLS,
} from "../../../axios/baseUrl";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Loader from "../../../components/Loader";

const GetRecipeDetails = () => {
  const { id } = useParams();
  const [recipeItem, setRecipe] = useState({});
  const [loader, setLoader] = useState(false);
  const fetchRecpieDetails = async () => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.get(Recipes_URLS.getRecipe(id));
      setRecipe(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch recipe details");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRecpieDetails();
  }, [id]);

  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <div className="container">
          <div style={{ width: "80%" }} className="m-auto card mb-3">
            <img
              src={`${base_img_url}/${recipeItem.imagePath}`}
              className="card-img-top"
              alt="recipe image"
            />
            <div className="card-body">
              <p className="card-title mb-1">
                <span className="fw-bold">Recipe:</span>
                {recipeItem.name}
              </p>
              <p className="card-text mb-1">
                <span className="fw-bold">Description:</span>
                {recipeItem.description}
              </p>
              <p className="card-text mb-1">
                <span className="fw-bold">Price:</span>
                {recipeItem.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetRecipeDetails;
