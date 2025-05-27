import { useEffect, useState } from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import recipesHeader from "../../../assets/recepies.svg";
import Search from "../../../components/Search";

import Tags from "../../../selectors/tags";
import Categories from "../../../selectors/Categories";
import ListHeader from "../../../components/ListHeader";
import {
  axiosInstance,
  base_img_url,
  Recipes_URLS,
} from "../../../axios/baseUrl";
import Table from "../../../components/Table";
import PaginationModule from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";

const RecipesList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("sele", selectedItem);
  const [list, setList] = useState([]);
  const [tagIds, setTagList] = useState([]);
  const [categories, setCategoryList] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const renderImage = (item) => (
    <img
      src={`${base_img_url}/${item.imagePath}`}
      alt="recipe"
      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }}
    />
  );

  const tableHeaders = [
    { id: 1, title: "Name", key: "name" },
    {
      id: 2,
      title: "Image",
      key: "imagePath",
      render: (item) => renderImage(item),
    },
    { id: 3, title: "Price", key: "price" },
    { id: 4, title: "Description", key: "description" },
    { id: 5, title: "Tag", key: "tag", render: (item) => item.tag?.name },
    {
      id: 6,
      title: "Category",
      key: "category",
      render: (item) => item.category?.map((cat) => cat.name),
    },
    { id: 7, title: "Actions", key: "actions" },
  ];

  const handleGetList = async (page = 1, size = 10) => {
    const response = await axiosInstance.get(Recipes_URLS.recipes, {
      params: {
        pageSize: size,
        pageNumber: page,
        name: search,
        tagId: selectedTag,
        categoryId: selectedCategory,
      },
    });
    const { pageNumber, totalNumberOfPages, pageSize } = response.data;
    setPageSize(pageSize);
    setPageNumber(pageNumber);
    setTotalPages(totalNumberOfPages);
    setList(response?.data?.data);
  };
  useEffect(() => {
    handleGetList(pageNumber, pageSize, search, selectedTag, selectedCategory);
  }, [pageNumber, pageSize, search, selectedTag, selectedCategory]);

  return (
    <>
      <DashboardHeader
        header="Recipes"
        title="List!"
        description={
          <>
            You can now add your items that any user can order it from <br />
            the Application and you can edit
          </>
        }
        headerImg={recipesHeader}
      />
      <>
        <div className="container-fluid my-3">
          <ListHeader
            title="Recipes Table Details"
            description="You can check all details"
            btnTitle="Add New Recipe"
            onAction={() => navigate("/dashboard/recipe/add")}
          />
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Search
              search={search}
              setSearch={setSearch}
              searchPlaceHolder="Search here ..."
            />

            <div className="d-flex gap-2">
              <Tags
                setSelectedTag={setSelectedTag}
                tagIds={tagIds}
                setTagList={setTagList}
              />

              <Categories
                setSelectedCategory={setSelectedCategory}
                setCategoryList={setCategoryList}
                categories={categories}
              />
            </div>
          </div>

          <Table
            tableHeaders={tableHeaders}
            tableBody={list}
            // onClose={() => setIsOpen(false)}
            onView={(item) => {
              setSelectedItem(item);
              console.log("view", item);
            }}
            onEdit={(item) => {
              setSelectedItem(item);
              console.log("edit", item);
            }}
            onDelete={(item) => {
              setSelectedItem(item);
              console.log("delete", item);
            }}
          />
          {totalPages > 1 && (
            <PaginationModule
              pageNumber={pageNumber}
              totalPages={totalPages}
              onPageChange={(page) => setPageNumber(page)}
            />
          )}
        </div>
      </>
    </>
  );
};

export default RecipesList;
