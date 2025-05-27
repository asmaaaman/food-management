import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Tags from "../../../selectors/tags";
import { Button, Form } from "react-bootstrap";

const AddEditRecipe = ({ id }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagIds, setTagList] = useState([]);
  console.log("first", selectedTag);
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
          <div className="col-md-9 mt-4">
            <Form>
              <div className="mb-4">
                <input className="form-control" placeholder="Recipe Name" />
              </div>
              <div className="mb-4">
                <Tags
                  setSelectedTag={setSelectedTag}
                  tagIds={tagIds}
                  setTagList={setTagList}
                />
              </div>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="Password" />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditRecipe;
