import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnView,
  handleClickDelete,
  fetchListUsesWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  // const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
    fetchListUsesWithPaginate(+event.selected + 1);
  };

  return (
    <>
      <h2
        className="table_name"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        Table User
      </h2>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleClickBtnView(user);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handleClickBtnUpdate(user);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleClickDelete(user);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="uers-paginate d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
      {listUsers && listUsers.length === 0 && (
        <div className="not-found-data">Not found data</div>
      )}
    </>
  );
};

export default TableUserPaginate;
