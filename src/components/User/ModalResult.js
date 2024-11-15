import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataModelResult}) => {
  const handleClose = () => {
    setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>You Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question: <b>{dataModelResult.countTotal}</b></div>
          <div>Total Correct answers: <b>{dataModelResult.countCorrect}</b></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
