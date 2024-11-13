import { useState } from "react";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch({
        type: 'FETCH_USER_LOGIN_SUCCESS',
        payload: data,
      });
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login_inner">
      <div className="login_header">
        <span>Don't have an account yet?</span>
        <button
          className="btn_signup"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </button>
      </div>
      <div className="login_group">
        <div className="login_logo">AnthLe</div>
        <div className="login_hello">Hello, who's this?</div>
        <div className="login_form">
          <div className="form_group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form_group mb0">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form_group">
            <span className="forgot_password">Forgot Password ?</span>
            <button className="btn-submit" disabled={isLoading} onClick={() => handleLogin()} >
            {isLoading === true && <ImSpinner className="loader-icon" />}
            <span>Login</span>
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

export default Login;
