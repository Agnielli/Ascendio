import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { AscendioContext } from "../../context/AscendioContext";
import { delLocalStorage } from "../../helpers/localStorageUtils";
import "./navbarApp.scss";

function NavBarApp() {
  const { user, token, setUser, setToken, setIsLogged } =
    useContext(AscendioContext);
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false);
    navigate("/");
  };

  const redirectTo = user ? "/home" : "/";

  return (
    <Navbar expand="lg" className="BG-navbar">
      <Container fluid >
        <Navbar.Brand className="logoNav p-0 m-0" as={Link} to={redirectTo}>
         ASCENDIO
    <Navbar expand="lg" className="navbar-principal bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={redirectTo} className="fw-bold">
          ASCENDIO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className="d-flex justify-content-end w-100">
              {!user && (
                <div className="d-flex align-items-center">
                  <Nav.Link as={Link} to="/about">
                    ABOUT
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    CONTACT
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Registro
                  </Nav.Link> */}

                  
                    <Button className="ButtonLogin" variant="outline-success" onClick={()=> navigate("/login")}>LOGIN</Button>
                  
                  
                    <Button className="ButtonRegister" variant="outline-success" onClick={()=> navigate("/register")}>
                      REGISTER
                    </Button>
                  
                </div>
              )}

              {user?.type === 1 && (
                <Nav.Link as={Link} to="/admin">
                  Admin Home
                </Nav.Link>
              )}
              {user?.type === 2 && (
                <>
                  {/* <Nav.Link as={Link} to="/profile">
                    Perfil
                  </Nav.Link> */}
                  <Nav.Link as={Link} to="/allcourses">
                    Cursos
                  </Nav.Link>

                  <Nav.Link as={Link} to="/allpoststrades">
                    Trade Post
                  </Nav.Link>

                  <Nav.Link as={Link} to="/allpostsgenerals">
                    General Post
                  </Nav.Link>

                  <Nav.Link as={Link} to="/showAllUsers">
                    Usuarios
                  </Nav.Link>

                  <Nav.Link as={Link} to="/tradingview">
                    TradingView
                  </Nav.Link>
                </>
              )}
              {user ? (
                <>
                  <div
                    className="d-flex user"
                    onClick={() => navigate("/profile")}
                  >
                    <p className="mt-3 me-3">{user.nickname}</p>
                    <div className="avatar">
                      {user?.img ? (
                        <img
                          src={`http://localhost:3000/images/users/${user.img}`}
                        />
                      ) : (
                        <p>{user?.nickname.charAt(0).toUpperCase()}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline-success me-2 ms-2" onClick={logOut}>
                    LogOut
                  </Button>
                </>
              ) : (
                <></>
                <>
                <div className="d-flex">
                  <Nav.Link as={Link} to="/login">
                    <Button className="button" variant="outline-success me-2 ms-2">Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button className="button" variant="outline-success me-2 ms-2">
                      Registro
                    </Button>
                  </Nav.Link>
                </div>
                </>

              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;
