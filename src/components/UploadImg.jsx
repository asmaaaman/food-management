import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

const ImageUploader = ({ onImageSelect, preview }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      onImageSelect(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div
        className="border border-success border-2 rounded-3 text-center p-4"
        style={{ backgroundColor: "#f0fff4", cursor: "pointer" }}
        onClick={triggerFileSelect}
      >
        {image || preview ? (
          <img
            src={image || preview}
            alt="Preview"
            style={{ maxWidth: "100%", height: "150px", objectFit: "contain" }}
          />
        ) : (
          <>
            <FaUpload className="mb-2" size={20} />
            <p className="m-0">
              Drag & Drop or{" "}
              <span className="text-success text-decoration-underline">
                Choose a Item Image
              </span>{" "}
              to Upload
            </p>
          </>
        )}
      </div>
      <Form.Control
        type="file"
        accept="image/*"
        className="d-none"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
