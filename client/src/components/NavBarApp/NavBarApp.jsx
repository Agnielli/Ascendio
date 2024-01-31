import "./navbarApp.scss";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AscendioContext } from "../../context/AscendioContext";
import { delLocalStorage } from "../../helpers/localStorageUtils";

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
    <header>
      <Navbar expand="lg" className="BG-navbar ">
        <Container fluid className="p-0">
          <Navbar.Brand className="logoNav p-0 m-0" as={Link} to={redirectTo}>
           ASCENDIO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav w-100" >
            <Nav className="me-auto d-flex w-100 ">
              <div className="d-flex justify-content-end w-100">
                {!user && (
                  <div className=" navbarLinksBotones d-flex align-items-center">
                    <Nav.Link as={Link} to="/about">
                      ABOUT
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact">
                      CONTACT
                    </Nav.Link>
                      <Button className="ButtonLogin" variant="outline-success" onClick={()=> navigate("/login")}>LOGIN</Button>
                      <Button className="ButtonRegister" variant="outline-success" onClick={()=> navigate("/register")}>
                        REGISTER
                      </Button>
                  </div>
                )}
                {user?.type === 1 && (
                 <div className=" navbarLinksBotones d-flex align-items-center">
                  <Nav.Link as={Link} to="/admin">
                    Admin Home
                  </Nav.Link>
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
                      <Button className="ButtonLogin" variant="outline-success me-2 ms-2" onClick={logOut}>
                        LogOut
                      </Button>
                  </div>
      
      
                )}
                {user?.type === 2 && (
                  <div className=" navbarLinksBotones d-flex align-items-center">
      
                    <Nav.Link as={Link} to="/allcourses">
                      CURSOS
                    </Nav.Link>
                    <Nav.Link as={Link} to="/allpoststrades">
                      TRADE POSTS
                    </Nav.Link>
                    <Nav.Link as={Link} to="/allpostsgenerals">
                      GENERAL POSTS
                    </Nav.Link>
                    <Nav.Link as={Link} to="/showAllUsers">
                      USERS
                    </Nav.Link>
                    <Nav.Link as={Link} to="/tradingview">
                      TRADING VIEW
                    </Nav.Link>
                    <div
                      className="d-flex user"
                      onClick={() => navigate("/profile")}
                    >
                      <p className="mt-3 me-3 d-lg-none">{user.nickname.toUpperCase()}</p>
                      <div className="avatar">
                        {user?.img ? (
                          <img
                            src={`http://localhost:3000/images/users/${user.img}`}
                          />
                        ) : (
                          <p className="letteruser">{user?.nickname.charAt(0).toUpperCase()}</p>
                        )}
                      </div>
                    </div>
                    <Button className="ButtonLogin" variant="outline-success me-2 ms-2" onClick={logOut}>
                      LogOut
                    </Button>
                    </div>
                )}
      
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default NavBarApp;