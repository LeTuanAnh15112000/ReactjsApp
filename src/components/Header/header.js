import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login");
  }
  const handleRegister = () => {
    navigate("/Register");
  }

  const handleLgout = () => {
    navigate("/Login");
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">Tuấn Anh</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">User</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          </Nav>
          <Nav>
          { isAuthenticated === false ? 
            (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                <button className="btn-signup" onClick={() => handleRegister()}>Sign up</button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLgout()}>Log out</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
