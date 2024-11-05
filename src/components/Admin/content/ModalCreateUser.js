import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";

function ModalCreateUser({show, handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUpload = (e) => {
    if(e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0]);
      e.target.value = null;
    } else {
      setPreviewImage("")
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handelSubmitCreateUser = async () => {
    //validate
    const isValidEmail = validateEmail(email)
    if(!isValidEmail) {
      toast.error("Invalid Email")
      return;
    }

    if(!password) {
      toast.error("Invalid Password")
      return;
    }

    //submit
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    let res = await axios.post('http://localhost:8081/api/v1/participant', data);
    if(res.data && res.data.EC === 0) {
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("");
      setImage("");
      setPreviewImage("");
      toast.success(res.data.EM);
      handleClose();
    }

    if(res.data && res.data.EC !== 0) {
      toast.error(res.data.EM)
    }
  }

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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
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
          <Button variant="primary" onClick={() => {handelSubmitCreateUser()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
