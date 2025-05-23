import React from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import usersHeader from "../../../assets/usersHeader.png";
import Table from "../../../components/Table";
import ListHeader from "../../../components/ListHeader";
// import { axiosInstance, USER_URLS } from "../../../axios/baseUrl";

const UsersList = () => {
  //const [list, setList] = useState([]);
  // const handleGetList = async () => {
  //   try {
  //     const response = await axiosInstance.get(USER_URLS.users, {
  //       params: {
  //         pageSize: 10,
  //         pageNumber: 1,
  //       },
  //     });

  //     setList(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching users", error);
  //   }
  // };
  // useEffect(() => {
  //   handleGetList();
  // }, []);

  return (
    <>
      <DashboardHeader
        header="Users"
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
          title="User Table Details"
          description="You can check all details"
        />
        {/* <Table
          tableHeaders={[
            { id: 1, title: "Name", key: "userName" },
            { id: 2, title: "Image", key: "imagePath" },
            { id: 3, title: "Price", key: "price" },
            { id: 4, title: "Description" },
            { id: 5, title: "Discount" },
            { id: 6, title: "Category" },
          ]}
          tableBody={list}
        /> */}
      </div>
    </>
  );
};

export default UsersList;
