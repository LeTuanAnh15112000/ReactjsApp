const TableUser = ({ listUsers, handleClickBtnUpdate }) => {
  return (
    <>
      <h2 className="table_name">Table User</h2>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Image</th>
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
                    <div className="img" style={{ display: "flex", justifyContent: "center"}}>
                      {user.image ? (
                        <img width={150} src={`data:image/jpeg;base64,${user.image}`} alt="User profile" />
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handleClickBtnUpdate(user);
                      }}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
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
