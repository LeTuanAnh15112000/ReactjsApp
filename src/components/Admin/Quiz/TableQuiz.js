const TableQuiz = (props) => {
  const {handleDeleteQuiz, listQuiz, handleUpdateQuiz} = props
  return (
    <>
      <h2 className="title_table">List quiz</h2>
      <table className="table table-bordered table-hover mt-2">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
        return (
          <tr key= {`table-quiz${index}`}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.difficulty}</td>
          <td style={{display: "flex", gap: "15px"}}>
            <button className="btn btn-warning" onClick={() => {handleUpdateQuiz(item)}}>Edit</button>
            <button className="btn btn-danger" onClick={() => {handleDeleteQuiz(item)}}>Delete</button>
          </td>
        </tr>
        )
      })}
      </tbody>
    </table>
    </>
  );
};

export default TableQuiz;
