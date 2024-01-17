import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'
import {AscendioContext} from '../../context/AscendioContext'
// import { delLocalStorage } from '../../helpers/localStorageUtils';
import './navbarApp.scss'

function NavBarApp() {
  const { user, token, setUser, setToken, setIsLogged } = useContext(AscendioContext);
  const navigate = useNavigate();

  const logOut = () => {
    // delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false)
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">ASCENDIO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className='d-flex justify-content-between w-100'>

            <div className='d-flex'>

            </div>

            <div className='d-flex'>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
              <Nav.Link as={Link} to="/allcourses">Cursos</Nav.Link>
            
            {user?.type === 2 &&  <>
              <Nav.Link as={Link} to="/admin">Admin General</Nav.Link>
              <Nav.Link as={Link} to="/adminUsers">Admin User</Nav.Link>
              <Nav.Link as={Link} to="/adminPictures">Admin Fotos</Nav.Link>
            </> 
            }

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/trades">Trades</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/post">
                Post
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/traders">Traders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              </NavDropdown>

            
              <>
              {/* <div className='d-flex user' onClick={()=>navigate('/user')}>
                <p className='mt-3 me-3'>{user.name} {user.lastname}</p>
                <div className='avatar'>
                  {user?.user_img?
                    <img src={`http://localhost:3000/images/users/${user.user_img}`}/>
                    :
                    <p>{user?.name.charAt(0).toUpperCase()}</p>
                  }
                </div>
              </div> */}
              <Button 
                variant='outline-success me-2 ms-2'
                onClick={logOut}
                >LogOut</Button>
              </>
              
              </div>
              </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
    
  
}

export default NavBarApp;
