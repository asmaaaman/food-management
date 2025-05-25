const PaginationModule = ({ pageNumber, totalPages, onPageChange }) => {
  return (
    <div className="pagination d-flex justify-content-end">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${
                pageNumber === i + 1 ? "active-paginate" : "not-active-paginate"
              }`}
              onClick={() => onPageChange(i + 1)}
            >
              <a className="page-link" href="#">
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PaginationModule;
