import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "./createCourse.scss";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import Select from "react-select";

const initialValue = {
  title: "",
  description: "",
  price: "",
};

export const CreateCourse = () => {
  const [createOneCourse, setCreateOneCourse] = useState(initialValue);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  const { user, setUser,userCourse,setUserCourse } = useContext(AscendioContext);

  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
    .get("http://localhost:3000/courses/calltags")
    .then((res) => {
      setOptions(
        res.data.map((elem) => ({ value: elem.tag_id, label: elem.tag_name }))
        );
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    
    const handleFile = (e) => {
      setFile(e.target.files[0]);
    };
    
    const handleOption = (option) => {
      setSelectedOption(option);
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      let newValue = value;
      if (name === 'price') {
        newValue = value.replace(/[^0-9]/g, '');
      }
      setCreateOneCourse({ ...createOneCourse, [name]: newValue });
    };
    
    let regexPrice = /^[a-zA-Z0-9\s.,:?¿!¡]{1,5}$/;
    let regexTitle = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,:?¿!¡]{1,50}$/;
    let regexDescription = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,:?¿!¡]{1,250}$/;

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!createOneCourse.title || !createOneCourse.description || !createOneCourse.price){
      setMsgError('Por favor, completa todos los campos');
      }else if (!regexTitle.test(createOneCourse.title)) {
      setMsgError("No se permiten más de 50 caracteres");
      }else if (!regexDescription.test(createOneCourse.description)) {
      setMsgError("No se permiten más de 250 caracteres");
      }else if (!regexPrice.test(createOneCourse.price)) {
        setMsgError('No se permiten más de 99999 euros');
      }else{
      const newFormData = new FormData();

      let data = { ...createOneCourse, user_id: user.user_id };

      newFormData.append("crearCurso", JSON.stringify(data));
      newFormData.append("tags", JSON.stringify(selectedOption));
      newFormData.append("file", file);
        
      axios
        .post("http://localhost:3000/courses/createcourse", newFormData)
        .then((res)=>{
        setUserCourse(res.data)
        let course_id = res.data.insertId
        navigate(`/course/${course_id}`)
        })
        .catch((err)=>{console.log(err)})  
    }
  };

  return (

    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form onSubmit={handleSubmit}> 
          <h3>Crea tu curso</h3>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>.jpg/.pdf</Form.Label>
            <Form.Control type="file" onChange={handleFile} hidden />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Título </Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo"
              name="title"
              value={createOneCourse.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Descripción </Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              name="description"
              value={createOneCourse.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Precio </Form.Label>
            <Form.Control
              type="text"
              placeholder="€"
              name="price"
              value={createOneCourse.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Tags </Form.Label>
            <Select
              placeholder="#"
              options={options}
              value={selectedOption}
              onChange={handleOption}
              isMulti
              isOptionDisabled={(option) =>
                selectedOption.length >= 4 && !selectedOption.includes(option)
              }
            />
          </Form.Group>

          <p>{msgError}</p>
          
          <Button
            variant="outline-success"
            className="me-3"
            type="submit"
          >
            Siguiente
          </Button>
          <Button
            variant="outline-success"
            className="me-3"
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
