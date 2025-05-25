import React from "react";

const Search = ({ setSearch, searchPlaceHolder }) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <form action="">
          <input
            onChange={(e) => setSearch(e.target.value)}
            class="form-control form-control-lg"
            type="text"
            placeholder={searchPlaceHolder}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
