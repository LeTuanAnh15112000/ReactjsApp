import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from "../../../service/apiService";
import _ from "lodash";

const UpdateQuiz = ({show, setShow, dataUpdateQuiz, fetchQuiz, resetUpdateData}) => {
  const handleClose = () => {
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    setShow(false);
    resetUpdateData();
  }
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  
  useEffect(() => {
    if (_.isEmpty(!dataUpdateQuiz)) {
      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setType(dataUpdateQuiz.difficulty);
      setImage(dataUpdateQuiz.image)
      if (dataUpdateQuiz.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);
  
  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      e.target.value = null;
    } else {
      setPreviewImage("");
    }
  };

  const handelSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuizForAdmin(dataUpdateQuiz.id, name, description, type, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="model-add-user"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name || ""}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description || ""}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="upload" className="form-label file-upload">
                <FcPlus /> Upload file Image
              </label>
              <input
                type="file"
                id="upload"
                hidden
                onChange={(e) => handleUpload(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handelSubmitUpdateQuiz();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateQuiz;
