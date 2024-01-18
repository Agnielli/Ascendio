import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, DropdownButton, InputGroup, Dropdown } from 'react-bootstrap'
import './createCourse.scss'
import { useNavigate } from 'react-router-dom'
import { AscendioContext } from '../../../context/AscendioContext'
import axios from 'axios'
import Select from 'react-select';

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
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3000/courses/calltags')
      .then((res)=>{
        setOptions(res.data.map((elem)=>({value: elem.tag_id, label: elem.tag_name})))
      })
      .catch((err)=>{console.log(err)})
  }, [])
  
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleOption = option => {
    setSelectedOption(option); 
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCreateOneCourse({...createOneCourse, [name]:value})
    console.log(handleChange)
  }
  console.log(createOneCourse)

  const handleSubmit = () => {
    if(!createOneCourse.title || !createOneCourse.description || !createOneCourse.price){
      setMsgError('Por favor, completa todos los campos');
    }else{
      const newFormData = new FormData();

      let data = {...createOneCourse, user_id:user.user_id}

      newFormData.append('crearCurso', JSON.stringify(data))
      newFormData.append('tags', JSON.stringify(selectedOption))
      newFormData.append('file', file)

      axios
      .post('http://localhost:3000/courses/createcourse', newFormData)
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
        <Select
        options={options}
        value={selectedOption}
        onChange={handleOption}
        isMulti
        isOptionDisabled={(option) => selectedOption.length >= 4 && !selectedOption.includes(option)}
      />
      
      <Button onClick={handleSubmit}>Siguiente</Button>
      <Button onClick={()=>navigate('/profile')}>Cancelar</Button>
    </div>
  )
}
