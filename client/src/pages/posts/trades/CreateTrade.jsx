import React, { useContext, useState } from 'react';
import './createTrade.scss';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AscendioContext } from '../../../context/AscendioContext';
import axios from 'axios'

const initialValue = {
  currency:'',
  description:'',
  entryPrice:'',
  stopLoss: '', 
  takeProfit: ''
}

export const CreateTrade = () => {
  const [createOneTrade, setCreateOneTrade] = useState(initialValue);
  // const [file, setFile] = useState();
  const [msgError, setMsgError] = useState('');

  // const { user, setUser } = useContext(AscendioContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCreateOneTrade({...createOneTrade, [name]:value})
  }

  // const handleFile = (e) => {
  //   setFile(e.target.files[0])
  // }

  const handleSubmit = () => {
    if(!createOneTrade.currency || !createOneTrade.description || !createOneTrade.entryPrice || !createOneTrade.stopLoss || !createOneTrade.takeProfit || !createOneTrade.category ){
      setMsgError('Por favor, completa todos los campos');
    // }else{
      // const newFormData = new FormData();

      // newFormData.append('creartrade', JSON.stringify(createOneCourse))
      // newFormData.append('file', file)

      axios
      .post('http://localhost:3000/posts/createtrade', createOneTrade)
      .then((res) => {
        console.log(res);
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <div>
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFile}
          hidden
        />
      </Form.Group> */}
      <Form.Control 
        type="text" 
        placeholder="Escribir la moneda o acción" 
        name='currency'
        value={createOneTrade.currency}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Descripción" 
        name='description'
        value={createOneTrade.description}
        onChange={handleChange}
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Precio de entrada" 
        name='entryPrice'
        value={createOneTrade.entryPrice}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Stop Loss" 
        name='stopLoss'
        value={createOneTrade.stopLoss}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control 
        type="text" 
        placeholder="Take Profit" 
        name='takeProfit'
        value={createOneTrade.takeProfit}
        onChange={handleChange}
        required
      />
      <br />
      {/* <InputGroup className="mb-3">
      <label htmlFor="options">Categoría</label>
      <select 
          name="category"
          id="options"
          value={createOneTrade.category}
          onChange={handleChange}
      >
        <option value="Crypto">Crypto</option>
        <option value="Bolsa">Bolsa</option>
        <option value="Forex">Forex</option>
      </select>
      </InputGroup> */}
      <br />
      <Button onClick={handleSubmit}>Aceptar</Button>
      <Button onClick={()=>navigate('/profile')}>Cancelar</Button>
    </div>
  )
}
