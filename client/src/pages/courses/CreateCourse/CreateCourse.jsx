import React, { useContext, useState } from 'react'
import { Form, Button, DropdownButton, InputGroup, Dropdown } from 'react-bootstrap'
import './createCourse.scss'
import { useNavigate } from 'react-router-dom'
import { AscendioContext } from '../../../context/AscendioContext'
import axios from 'axios'

const initialValue = {
  title:'',
  description:'',
  price:'',
}

export const CreateCourse = () => {
  const [createOneCourse, setCreateOneCourse] = useState(initialValue);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState('');

  const { user, setUser } = useContext(AscendioContext);

  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCreateOneCourse({...createOneCourse, [name]:value})
  }

  const handleSubmit = () => {
    if(!createOneCourse.title || !createOneCourse.description || !createOneCourse.price){
      setMsgError('Por favor, completa todos los campos');
    }else{
      const newFormData = new FormData();

      newFormData.append('crearCurso', JSON.stringify(createOneCourse))
      newFormData.append('file', file)

      axios
      .put('http://localhost:3000/courses/createcourse', newFormData)
      .then((res) => {
        if(res.data.img){
          setUser({...createOneCourse, img:res.data.img})
        }else{
          setUser(createOneCourse)
        }
      })
      .catch((err)=>{
        console.log(err)
      })

    }
  }

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFile}
          hidden
        />
      </Form.Group>
      <Form.Control 
        type="text" 
        placeholder="Titulo" 
        name='title'
        value={createOneCourse.title}
        onChange={handleChange}
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Descripción" 
        name='description'
        value={createOneCourse.description}
        onChange={handleChange}
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Precio" 
        name='price'
        value={createOneCourse.price}
        onChange={handleChange}
      />
      <br />
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Tags"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Tag1</Dropdown.Item>
          <Dropdown.Item href="#">Tag2</Dropdown.Item>
          <Dropdown.Item href="#">tag3</Dropdown.Item>
          <Dropdown.Item href="#">Tag4</Dropdown.Item>
          </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>
      <Button onClick={handleSubmit}>Siguiente</Button>
      <Button onClick={()=>navigate('/profile')}>Cancelar</Button>
    </div>
  )
}
