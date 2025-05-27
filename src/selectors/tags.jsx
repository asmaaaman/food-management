import React, { useEffect } from "react";
import { axiosInstance, Tags_URLS } from "../axios/baseUrl";

const Tags = ({ setSelectedTag, setTagList, tagIds }) => {
  const handleGetTags = async () => {
    const response = await axiosInstance.get(Tags_URLS.tags);
    setTagList(response.data);
  };
  useEffect(() => {
    handleGetTags();
  }, []);
  return (
    <>
      <select
        className="form-select rounded-3 shadow-sm border-light"
        aria-label="Default select example"
        style={{ minWidth: 150 }}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option selected>Tags</option>
        {tagIds.map((tag) => (
          <option id={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Tags;
