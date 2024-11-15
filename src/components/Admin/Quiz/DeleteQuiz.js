import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForAdmin } from "../../../service/apiService";
import { toast } from "react-toastify";

const DeleteQuiz = ({ show, setShow, dataDeleteQuiz, fetchQuiz }) => {
  const handleClose = () => {
    setShow(false);
  }
  
  const handleDeleteQuiz = async () => {
    let res = await deleteQuizForAdmin(dataDeleteQuiz.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchQuiz();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz. id = {dataDeleteQuiz.id} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteQuiz}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQuiz;
