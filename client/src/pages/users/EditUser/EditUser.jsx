import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
import "../../../../public/stylesheets/ButtonsApp.scss"
import "../../../../public/stylesheets/FormulariosEInputs.scss"
import { FormEdit } from "./EditUserData/FormEdit";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { DeleteUser } from "./DeleteUser/DeleteUser";
import axios from "axios";
import Select from "react-select";

export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  const [showForm, setShowForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [categories, setCategories] = useState(false);
  const [userCategory, setUserCategory] = useState();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getcategories`)
      .then((res) => {
        console.log(res);
        setOptions(
          res.data.map((elem) => ({
            value: elem.category_id,
            label: elem.category_name,
            key: elem.category_id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    user &&
      useEffect(() => {
        axios
          .get(`http://localhost:3000/users/getcategoriesuser/${user.user_id}`)
          .then((res) => {
            console.log(res);
            setUserCategory(res.data);
            setCategories(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [categories]);
  }
  if (userCategory) {
    console.log(userCategory);
  }

  const handleOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedValues = selectedOption.map((option) => option.value);

    axios
      .post(
        `http://localhost:3000/users/usersendcategory`,
        { user_id: user.user_id, selectedValues } /* newFormData */
      )
      .then((res) => {
        console.log(res.data);
        setCategories(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const verSection = () => {
    setShowForm(!showForm);
    setShowChangePassword(false);
    setShowDeleteUser(false);
    setShowCategories(false);
  };

  const verChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setShowForm(false);
    setShowDeleteUser(false);
    setShowCategories(false);
  };

  const verDeleteUser = () => {
    setShowDeleteUser(!showDeleteUser);
    setShowForm(false);
    setShowChangePassword(false);
    setShowCategories(false);
  };

  const verCategoryUser = () => {
    setShowCategories(!showCategories);
    setShowForm(false);
    setShowChangePassword(false);
    setShowDeleteUser(false);
  };

  const categoryMapping = {
    1: "Actions",
    2: "Crypto",
    3: "Forex",
    4: "General",
  };

  return (
    <main>
      <Row className="EditUserApp w-30 s-xs-90">
        <Col xs={12} className="p-0 UserNameApp">
          <h3>{user?.nickname.toUpperCase()}</h3>
          <p >
            {" "}
            {user?.name.charAt(0).toUpperCase() + user.name.slice(1)} {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}
          </p>
          {/* <h6 className="d-flex gap-1">
            Categorías:{" "}
            {userCategory?.map((elem) => {
              return (
                <p key={elem.category_id}>
                  {elem.category_name === null
                    ? "Elige categoría's"
                    : elem.category_name}
                </p>
              );
            })}
          </h6> */}
          </Col>
          
            <Col xs={12} sm={6} className="p-0">
              <Button className="Button5 ButtonEditUser1 mb-4 mt-4" onClick={verSection}>EDITAR DATOS DEL USUARIO</Button>
              <Button className="Button5 ButtonEditUser1 mb-4" onClick={verCategoryUser}> EDITAR CATEGORÍA </Button>
              <Button className="Button5 ButtonEditUser1 mb-4" onClick={verChangePassword}>EDITAR DATOS DE LOGIN </Button>
              <Button className="Button5 ButtonEditUser1 mb-4" onClick={verDeleteUser}>ELIMINAR CUENTA </Button>
            </Col>
      
            <Col xs={12} sm={6} className="p-0">
              {showForm && (
                <FormEdit setShowForm={setShowForm} user={user} setUser={setUser} />
              )}
              {showChangePassword && (
                <ChangePassword
                  setShowChangePassword={setShowChangePassword}
                  user={user}
                  setUser={setUser}
                />
              )}
              {showDeleteUser && (
                <DeleteUser
                  setShowDeleteUser={setShowDeleteUser}
                  user={user}
                  setUser={setUser}
                />
              )}
              {showCategories && (
                <Form onSubmit={handleSubmit} className=" FormularioDatosUsuario ">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label><h4>ELIGE TU CATEGORÍA:</h4> </Form.Label>
                    <Select
                      placeholder="Categoría.."
                      options={options}
                      value={selectedOption}
                      onChange={handleOption}
                      isMulti
                    />
                  </Form.Group>
                  <div className="DivGrisParaBotones mt-3">
                    <Button className="Button3" type="submit">ACEPTAR</Button>
                    <Button className="Button1" onClick={() => setShowCategories(false)}>CANCELAR</Button>
                  </div>
                </Form>
              )}
            </Col>
        
       
      </Row>
    </main>
  );
};
