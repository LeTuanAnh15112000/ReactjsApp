import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser"
import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/apiService";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";


const ManageUser = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [showModelUpdate, setShowModelUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({})

  const fetchListUses = async () => {
    let res = await getAllUser();
    if(res.EC === 0) {
      setListUsers(res.DT);
    }
  }

  useEffect(() => {
    fetchListUses();
  }, []);

  const handleClickBtnUpdate = (user) => {
    setShowModelUpdate(true);
    setDataUpdate(user)
    console.log(user);
  }


  return (
    <div className="manage-user-container">
      <h2 className="title">Manage User</h2>
      <div className="user-content">
        <div className="btn-add">
          <button className="btn btn-info" onClick={() => setShowModel(true)}>
            <FcPlus color="red" /> Add new user
          </button>
        </div>
        <div className="table-user"><TableUser listUsers={listUsers} handleClickBtnUpdate = {handleClickBtnUpdate} /></div>
      </div>
      <ModalCreateUser show = {showModel} setShow = {setShowModel} fetchListUses = {fetchListUses} set />
      <ModalUpdateUser show = {showModelUpdate} setShow = {setShowModelUpdate} dataUpdate = {dataUpdate} />
    </div>
  );
};

export default ManageUser;
