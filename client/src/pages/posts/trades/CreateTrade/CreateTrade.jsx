import React, { useContext, useEffect, useState } from "react";
import "./createTrade.scss";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../context/AscendioContext";
import axios from "axios";
const initialValue = {
  currency: "",
  description: "",
  entryPrice: "",
  stopLoss: "",
  takeProfit: "",
  category_id: "",
};
export const CreateTrade = () => {
  const [createOneTrade, setCreateOneTrade] = useState(initialValue);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const { user, setUser } = useContext(AscendioContext);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/callcategorys")
      .then((res) => {
        setOptions(
          res.data.map((elem) => ({
            value: elem.category_id,
            label: elem.category_name,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [])
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateOneTrade({ ...createOneTrade, [name]: value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = () => {
    if (
      !createOneTrade.currency ||
      !createOneTrade.description ||
      !createOneTrade.entryPrice ||
      !createOneTrade.stopLoss ||
      !createOneTrade.takeProfit ||
      !createOneTrade.category_id
    ) {
      setMsgError("Por favor, completa todos los campos");
    } else if (
      isNaN(parseInt(createOneTrade.stopLoss)) ||
      isNaN(parseInt(createOneTrade.takeProfit)) ||
      isNaN(parseInt(createOneTrade.entryPrice))
    ) {
      setMsgError("Los ultimos tres campos, solo admiten numeros");
    } else {
      const newFormData = new FormData();
      let data = { ...createOneTrade, user_id: user.user_id };
      // console.log(data); me hace bien el data
      newFormData.append("crearTrade", JSON.stringify(data));
      newFormData.append("file", file);
      axios
        .post("http://localhost:3000/posts/createtrade", newFormData)
        .then((res) => {
          if(res.data.img){
            setCreateOneTrade({...createOneTrade, img:res.data.img})
            navigate('/profile');
          }else{
            setCreateOneTrade(createOneTrade)
            navigate('/profile');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="file" onChange={handleFile} hidden />
      </Form.Group>
      <Form.Control
        type="text"
        placeholder="Escribir la moneda o acción"
        name="currency"
        value={createOneTrade.currency}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control
        type="text"
        placeholder="Descripción"
        name="description"
        value={createOneTrade.description}
        onChange={handleChange}
      />
      <br />
      <Form.Control
        type="text"
        placeholder="Precio de entrada"
        name="entryPrice"
        value={createOneTrade.entryPrice}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control
        type="text"
        placeholder="Stop Loss"
        name="stopLoss"
        value={createOneTrade.stopLoss}
        onChange={handleChange}
        required
      />
      <br />
      <Form.Control
        type="text"
        placeholder="Take Profit"
        name="takeProfit"
        value={createOneTrade.takeProfit}
        onChange={handleChange}
        required
      />
      <br />
      <InputGroup className="mb-3">
        <label htmlFor="category">Categorías</label>
        <select
          id="category"
          name="category_id"
          value={createOneTrade.category_id}
          onChange={handleChange}
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputGroup>
      <p>{msgError}</p>
      <br />
      <Button onClick={handleSubmit}>Aceptar</Button>
      <Button onClick={() => navigate("/profile")}>Cancelar</Button>
    </div>
  );
};









