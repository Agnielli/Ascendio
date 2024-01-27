import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import { useParams } from "react-router-dom";

const initialValue = {
  course_rates: "",
  commentary: "",
};

export const CardRates = ({ resetCourse, setResetCourse }) => {
  const [newRate, setNewRate] = useState(initialValue);
  const [msgError, setMsgError] = useState("")
  const course_id = useParams().course_id;
  const { user } = useContext(AscendioContext);
  let usuario = user.user_id;

  const regexNumber = /^[1-5]$/;
  
    useEffect(()=>{
    
      // setRateExist(true)
    
  },[rateExist])

  const handleSubmit = () => {
    if (!regexNumber.test(newRate.course_rates)) {
      setMsgError("Introduce un número entre 1 y 5.");
      return;
    }

    const { course_rates, commentary } = newRate;
    let data = { course_rates, commentary, usuario };

    axios
    .post(`http://localhost:3000/courses/userrateonecourse/${course_id}`, data)
    .then((res)=>{
      console.log("new rateeeeee", res.data)
      if(res.data.course_rates){
        setRateExist(!rateExist)
        //setResetCourse(!resetCourse);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRate({ ...newRate, [name]: value });
  };


  return (
    <>{!rateExist &&
      <Card style={{ width: '18rem' }}>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tu opinión importa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Puntúa de 1 a 5"
              name="course_rates"
              value={newRate?.course_rates}
              onChange={handleChange}
            />
            <Form.Control
              type="text"
              placeholder="Da tu opinión"
              name='commentary'
              value={newRate?.commentary}
              onChange={handleChange}
            />
             <p>{msgError}</p>
            <Button
              variant="outline-success"
              className="me-3"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>
          </Form.Group>
        </Form>
    </Card>}
  </>
  )
}

