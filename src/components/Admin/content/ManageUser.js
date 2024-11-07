import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserPaginate } from "../../../service/apiService";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [showModelUpdate, setShowModelUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModelView, setShowModelView] = useState(false);
  const [dataView, setDataView] = useState({});
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState("");

  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchListUses = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT.users);
    }
  };

  const fetchListUsesWithPaginate = async (page) => {
    let res = await getUserPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  useEffect(() => {
    // fetchListUses();
    fetchListUsesWithPaginate(1);
  }, []);

  const handleClickBtnUpdate = (user) => {
    setShowModelUpdate(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnView = (user) => {
    setShowModelView(true);
    setDataView(user);
  };

  const handleClickDelete = (user) => {
    setShowModelDelete(true);
    setDataDeleteUser(user);
  };

  return (
    <div className="manage-user-container">
      <h2 className="title">Manage User</h2>
      <div className="user-content">
        <div className="btn-add">
          <button className="btn btn-info" onClick={() => setShowModel(true)}>
            <FcPlus color="red" /> Add new user
          </button>
        </div>
        <div className="table-user">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickDelete={handleClickDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickDelete={handleClickDelete}
            fetchListUsesWithPaginate={fetchListUsesWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <ModalCreateUser
        show={showModel}
        setShow={setShowModel}
        fetchListUses={fetchListUses}
        fetchListUsesWithPaginate={fetchListUsesWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModelUpdate}
        setShow={setShowModelUpdate}
        fetchListUses={fetchListUses}
        dataUpdate={dataUpdate}
        resetUpdateData={resetUpdateData}
        fetchListUsesWithPaginate={fetchListUsesWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalViewUser
        show={showModelView}
        setShow={setShowModelView}
        dataView={dataView}
      />
      <ModalDeleteUser
        show={showModelDelete}
        setShow={setShowModelDelete}
        dataDeleteUser={dataDeleteUser}
        fetchListUses={fetchListUses}
        fetchListUsesWithPaginate={fetchListUsesWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ManageUser;
