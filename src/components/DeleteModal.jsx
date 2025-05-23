import { Button, Image } from "react-bootstrap";
import deleteImg from "../assets/deleteImg.png";
import BaseModal from "./BaseModal";
const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete This Item ?",
  description = "Are you sure you want to delete this item? If you are sure just click on delete it.",
  // image = { deleteImg },
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <Image src={deleteImg} alt="delete" fluid style={{ maxHeight: 200 }} />

        <h5 className="fw-bold mt-3">{title}</h5>
        <p className="text-muted mb-4">{description}</p>

        <Button variant="outline-danger" onClick={onConfirm}>
          Delete this item
        </Button>
      </div>
    </BaseModal>
  );
};

export default DeleteModal;
