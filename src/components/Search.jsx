import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearch, searchPlaceHolder }) => {
  return (
    <div
      className="d-flex align-items-center px-3 py-2 shadow-sm rounded-3 border border-light bg-white"
      style={{ flex: 1 }}
    >
      <FaSearch className="text-muted me-2" />
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="form-control border-0 shadow-none"
        placeholder={searchPlaceHolder}
        style={{ fontSize: "14px" }}
      />
    </div>
  );
};

export default Search;
