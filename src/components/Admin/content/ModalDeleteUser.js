import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../service/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = ({ show, setShow, dataDeleteUser, fetchListUses, fetchListUsesWithPaginate, currentPage, setCurrentPage }) => {
  const handleClose = () => {
    setShow(false);
  }
  console.log(dataDeleteUser);
  
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDeleteUser.id)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUses();
      setCurrentPage(1)
      await fetchListUsesWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user. email = <b>{dataDeleteUser.email ? dataDeleteUser.email : ""}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
