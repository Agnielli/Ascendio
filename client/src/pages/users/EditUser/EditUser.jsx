import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
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
  };

  const verChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setShowForm(false);
    setShowDeleteUser(false);
  };

  const verDeleteUser = () => {
    setShowDeleteUser(!showDeleteUser);
    setShowForm(false);
    setShowChangePassword(false);
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
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <h2>{user?.nickname}</h2>
        <p>
          {" "}
          {user?.name} {user?.lastname}
        </p>
        <h6 className="d-flex gap-1">
          Categorías:{" "}
          {userCategory?.map((elem) => {
            return (
              <p>
                {elem.category_name === null
                  ? "Elige categoría's"
                  : elem.category_name}
              </p>
            );
          })}
        </h6>
        <div className="d-flex gap-1 mb-1">
          <Button onClick={verSection}>Editar Usuario</Button>
          <Button onClick={verCategoryUser}>Editar Categoría </Button>
          <Button onClick={verChangePassword}>Editar datos de Login </Button>
          <Button onClick={verDeleteUser}>Eliminar cuenta </Button>
        </div>
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Elige tu categoría de usuario </Form.Label>
            <Select
              placeholder="Categoría.."
              options={options}
              value={selectedOption}
              onChange={handleOption}
              isMulti
            />
          </Form.Group>
          <Button type="submit">Aceptar</Button>
        </Form>
      </Col>
    </Row>
  );
};
