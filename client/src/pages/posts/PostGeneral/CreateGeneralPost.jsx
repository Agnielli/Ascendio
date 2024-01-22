import React, { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";

const initialValue = {
  description: "",
};

export const CreateGeneralPost = () => {
  const [generalPost, setGeneralPost] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const [options, setOptions] = useState([]);
  const { user, setUser } = useContext(AscendioContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralPost({ ...generalPost, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!generalPost.description || generalPost.description === "") {
      setMsgError("Descripción vacía");
    } else {
      const newFormData = new FormData();
      let data = { ...generalPost, user_id: user.user_id };
      newFormData.append("crearPostGeneral", JSON.stringify(data));
      newFormData.append("file", file);
      axios
        .post("http://localhost:3000/posts/createpostgeneral", newFormData)
        .then((res) => {
          console.log(res);
          navigate("/profile");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <br />
        <h2>Crear Post General</h2>
        <br />
        <Form.Label>Subir imagen</Form.Label>
        <Form.Control type="file" onChange={handleFile} hidden />
      </Form.Group>
      <Form.Control
        type="text"
        placeholder="Exprésate"
        name="description"
        value={generalPost.description}
        onChange={handleChange}
        required
      />
      <p>{msgError}</p>
      <br />
      <Button onClick={handleSubmit}>Aceptar</Button>
      <Button onClick={() => navigate("/profile")}>Cancelar</Button>
    </div>
  );
};
