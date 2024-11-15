import Select from "react-select";
import {
  getAllQuizForAdmin,
  putCreateNewQuiz,
} from "../../../service/apiService";
import "./style.scss";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import DeleteQuiz from "./DeleteQuiz";
import UpdateQuiz from "./UpdateQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [modelDelete, setModelDelete] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState('');
  const [modelUpdate, setModelUpdate] = useState(false);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState('');

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handelSubmit = async () => {
    //validate
    if (!description || !name) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await putCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleDeleteQuiz = (data) => {
    setModelDelete(true);
    setDataDeleteQuiz(data);
  };

  const handleUpdateQuiz = (data) => {
    setModelUpdate(true);
    setDataUpdateQuiz(data);
  }

  const resetUpdateData = () => {
    setDataUpdateQuiz('');
  };

  return (
    <div className="quiz-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manage Quiz</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-4">
                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="mb-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quiz type..."
                  />
                </div>
                <div className="more_actions form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    ref={fileInputRef}
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="btn btn-warning mt-4"
                    style={{ width: "100px", fontSize: "18px" }}
                    onClick={() => {
                      handelSubmit();
                    }}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz
          handleDeleteQuiz={handleDeleteQuiz}
          listQuiz={listQuiz}
          handleUpdateQuiz={handleUpdateQuiz}
        />
      </div>
      <DeleteQuiz
        show={modelDelete}
        setShow={setModelDelete}
        dataDeleteQuiz={dataDeleteQuiz}
        fetchQuiz={fetchQuiz}
      />
      <UpdateQuiz 
      show={modelUpdate} 
      setShow={setModelUpdate} 
      dataUpdateQuiz={dataUpdateQuiz}
      fetchQuiz={fetchQuiz}
      resetUpdateData={resetUpdateData}
      />
    </div>
  );
};

export default ManageQuiz;
