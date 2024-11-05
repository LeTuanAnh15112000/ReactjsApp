import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="manage-user-container">
      <h2 className="title">Manage User</h2>
      <div className="user-content">
        <div className="btn-add">
          <button className="btn btn-info" onClick={handleShow}>
            <FcPlus color="red" /> Add new user
          </button>
        </div>
        <div className="table-user">table user</div>
      </div>
      <ModalCreateUser show={show} handleClose = {handleClose}/>
    </div>
  );
};

export default ManageUser;
