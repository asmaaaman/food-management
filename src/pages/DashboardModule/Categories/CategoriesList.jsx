import { useEffect, useState } from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import usersHeader from "../../../assets/usersHeader.png";
import Table from "../../../components/Table";
import ListHeader from "../../../components/ListHeader";
import { axiosInstance, Categories_URLS } from "../../../axios/baseUrl";
import AddEditCategory from "./AddEditCategory";
import ViewCategory from "./ViewCategory";
import DeleteModal from "../../../components/DeleteModal";
import { toast } from "react-toastify";
import PaginationModule from "../../../components/Pagination";
import Search from "../../../components/Search";

const CategoriesList = () => {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const handleGetList = async (page = 1, size = 10) => {
    try {
      const response = await axiosInstance.get(Categories_URLS.categories, {
        params: {
          pageSize: size,
          pageNumber: page,
          name: search,
        },
      });
      const { pageNumber, totalNumberOfPages, pageSize } = response.data;
      setPageSize(pageSize);
      setPageNumber(pageNumber);
      setTotalPages(totalNumberOfPages);

      setList(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    handleGetList(pageNumber, pageSize, search);
  }, [pageNumber, pageSize, search]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `${Categories_URLS.categories}/${selectedCategory.id}`
      );
      toast.success("Category deleted successfully");
      handleGetList();
      setIsOpenDelete(false);
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };
  return (
    <>
      <DashboardHeader
        header="Categories"
        title="List!"
        description={
          <>
            You can now add your items that any user can order it from <br />
            the Application and you can edit
          </>
        }
        headerImg={usersHeader}
      />
      <div className="m-3">
        <ListHeader
          title="Categories Table Details"
          description="You can check all details"
          btnTitle="Add New Category"
          setIsOpen={setIsOpen}
        />
        <Search
          search={search}
          setSearch={setSearch}
          searchPlaceHolder="Search by name ..."
        />
        <Table
          tableHeaders={[
            { id: 1, title: "Name", key: "name" },
            { id: 2, title: "Creation Date", key: "creationDate" },
            { id: 3, title: "Creation Date", key: "modificationDate" },
            { id: 4, title: "Actions", key: "actions" },
          ]}
          tableBody={list}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onView={(item) => {
            setSelectedCategory(item);
            setIsOpenView(true);
          }}
          onEdit={(item) => {
            setSelectedCategory(item);
            setIsOpen(true);
          }}
          onDelete={(item) => {
            setSelectedCategory(item);
            setIsOpenDelete(true);
          }}
        />
        <PaginationModule
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={(page) => setPageNumber(page)}
        />
        <AddEditCategory
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedCategory(null);
          }}
          defaultValues={selectedCategory}
          handleGetList={handleGetList}
        />
        {isOpenView && (
          <ViewCategory
            isOpen={isOpenView}
            onClose={() => setIsOpenView(false)}
            defaultValues={selectedCategory}
          />
        )}
        {isOpenDelete && (
          <DeleteModal
            isOpen={isOpenDelete}
            onClose={() => setIsOpenDelete(false)}
            onConfirm={handleDelete}
            title={`Delete ${selectedCategory?.name}?`}
            description="Are you sure you want to delete this category? This action cannot be undone."
          />
        )}
      </div>
    </>
  );
};

export default CategoriesList;
