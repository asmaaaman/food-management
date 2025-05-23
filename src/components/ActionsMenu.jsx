import { useEffect, useRef } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const ActionsMenu = ({ onView, onEdit, onDelete, isOpen, onToggle }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="position-relative" ref={menuRef}>
      <button className="btn btn-light" onClick={onToggle}>
        ⋯
      </button>
      {isOpen && (
        <ul
          className="list-unstyled shadow rounded position-absolute bg-white p-2"
          style={{ right: "50px", top: "100%", zIndex: 10 }}
        >
          <li
            className="px-2 py-1 d-flex align-items-center"
            onClick={onView}
            style={{ cursor: "pointer" }}
          >
            <BiShow className="text-success" />
            <span className="text-dark m-1">View</span>
          </li>
          <li
            className="px-2 py-1 d-flex align-items-center"
            onClick={onEdit}
            style={{ cursor: "pointer" }}
          >
            <FiEdit className="text-success" />
            <span className="text-dark m-1">Edit</span>
          </li>
          <li
            className="px-2 py-1 d-flex align-items-center"
            onClick={onDelete}
            style={{ cursor: "pointer" }}
          >
            <RiDeleteBin5Line className="text-success" />
            <span className="m-1 text-dark">Delete</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ActionsMenu;
