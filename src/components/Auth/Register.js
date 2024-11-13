import { useState } from "react";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../service/apiService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("abc");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    let data = await postRegister(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login_inner">
      <div className="login_header">
        <span>Don't have an account yet?</span>
        <button
          className="btn_signup"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </button>
      </div>
      <div className="login_group">
        <div className="login_logo">AnthLe</div>
        <div className="login_hello">Hello, who's this?</div>
        <div className="login_form">
          <div className="form_group">
            <label>Email(*)</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form_group">
            <label>Password(*)</label>
            <input
              type={showPassword === true ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span
              className="icon_show"
              onClick={() => {
                handleShow();
              }}
            >
              {showPassword === true ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="form_group mb55">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form_group">
            <button className="btn-submit" onClick={() => handleRegister()}>
              Register
            </button>
            <span
              className="go_back"
              onClick={() => {
                navigate("/");
              }}
            >
              &#8592; Go to Homepage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
