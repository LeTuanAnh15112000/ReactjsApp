const TableUser = ({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickDelete }) => {
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
      {listUsers && listUsers.length === 0 && (
        <div className="not-found-data">Not found data</div>
      )}
    </>
  );
};

export default TableUser;
