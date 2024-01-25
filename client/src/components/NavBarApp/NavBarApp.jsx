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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={redirectTo}>
          ASCENDIO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className="d-flex justify-content-between w-100">
              {!user && (
                <div className="d-flex">
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    Contact
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Registro
                  </Nav.Link> */}
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
                  <NavDropdown title="Más opciones" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/allpoststrades">
                      Trade Post
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/allpostsgenerals">
                      General Post
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/showAllUsers">
                      Usuarios
                    </NavDropdown.Item>
                  </NavDropdown>
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
                        <p>{user?.name.charAt(0).toUpperCase()}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline-success me-2 ms-2" onClick={logOut}>
                    LogOut
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <Button variant="outline-success me-2 ms-2">Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button variant="outline-success me-2 ms-2">
                      Registro
                    </Button>
                  </Nav.Link>
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
