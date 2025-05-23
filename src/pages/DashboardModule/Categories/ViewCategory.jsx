import React, { useEffect } from "react";
import BaseModal from "../../../components/BaseModal";
import { axiosInstance, Categories_URLS } from "../../../axios/baseUrl";
import { Card } from "react-bootstrap";

const ViewCategory = ({ isOpen, onClose, defaultValues }) => {
  const [viewItem, setViewItem] = React.useState({});
  const handleGetItem = async () => {
    // api call to get item
    try {
      const response = await axiosInstance.get(
        `${Categories_URLS.categories}/${defaultValues.id}`
      );
      setViewItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetItem();
  }, []);
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} title="View Category">
        {viewItem && (
          <Card style={{ width: "100%", padding: "22px" }}>
            <Card.Title>
              <strong>Name:</strong> {viewItem.name}
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {viewItem.id} <br />
              <strong>Created At:</strong>{" "}
              {new Date(viewItem.creationDate).toLocaleDateString()} <br />
              <strong>Modified At:</strong>{" "}
              {new Date(viewItem.modificationDate).toLocaleDateString()} <br />
              <strong>Recipe Count:</strong> {viewItem.recipe?.length ?? 0}
            </Card.Text>
          </Card>
        )}
      </BaseModal>
    </>
  );
};

export default ViewCategory;
