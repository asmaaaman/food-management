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
import { toast } from "react-toastify";
import DeleteModal from "../../../components/DeleteModal";
import Loader from "../../../components/Loader";

const RecipesList = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const [list, setList] = useState([]);
  const [tagIds, setTagList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategoryList] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
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
    try {
      setLoader(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(Recipes_URLS.delete(selectedItem.id));

      // await axiosInstance.delete(`${Recipes_URLS.delete}/${selectedItem.id}`);
      toast.success("Recipe deleted successfully");
      handleGetList();
      setIsOpenDelete(false);
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
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
        {loader ? (
          <Loader loader={loader} text="Loading Recipe" />
        ) : (
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
              onView={(item) => {
                setSelectedItem(item);
                navigate(`/dashboard/recipe/view/${item.id}`);
              }}
              onEdit={(item) => {
                setSelectedItem(item);
                navigate(`/dashboard/recipe/edit/${item.id}`);
              }}
              onDelete={(item) => {
                setSelectedItem(item);
                setIsOpenDelete(true);
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
        )}
        {isOpenDelete && (
          <DeleteModal
            isOpen={isOpenDelete}
            onClose={() => setIsOpenDelete(false)}
            onConfirm={handleDelete}
            title={`Delete ${selectedItem?.name}?`}
            description="Are you sure you want to delete this recipe? This action cannot be undone."
          />
        )}
      </>
    </>
  );
};

export default RecipesList;
