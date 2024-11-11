import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import ManageUser from "./components/Admin/content/ManageUser";
import DashBoard from "./components/Admin/content/DashBoard";
import Login from "./components/Auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
};

export default Layout;
