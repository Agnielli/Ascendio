import React, { useContext, useState } from 'react';
import './login.scss';
import {Button, Form} from 'react-bootstrap'
import { AscendioContext } from '../../../context/AscendioContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { saveLocalStorage } from '../../../helpers/localStorageUtils';


const initialValue = {
  email: "",
  password:""
}

export const Login = () => {

  const {setUser,setToken,setIsLogged} = useContext(AscendioContext);
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("")
  const navigate = useNavigate();
  

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setLogin({...login,[name]:value})
    console.log(e.target.value);
  }
  
  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/users/loginuser',login)
      .then((res)=>{
          setIsLogged(true);
          setUser(res.data.user)
          setToken(res.data.token)
          saveLocalStorage("token",res.data.token)

          const type = res.data.user.type;
          if(type === 1){
            navigate('/admin')
          }else if(type === 2){
            navigate('/home')
          }else{
            navigate('/')
          }
  })
      .catch((err)=> {
        console.log(err);
        setMsgError(err.response.data)
      })
  }

  return (
    <Form className=' w-25'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email </Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Email"
        name='email'
        onChange={handleChange}
        //login.email
         />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password" 
        placeholder="Password"
        name='password'
        onChange={handleChange}
        //login.password
        />
    </Form.Group>
    <p>{msgError}</p>
    <Button 
      variant="danger"
      type="button"
      onClick={handleSubmit} 
    >
      Login
    </Button>
    <Button variant="danger" type="submit">
      Registro
    </Button>
  </Form>
);
}
  

