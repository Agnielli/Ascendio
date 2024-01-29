import React, { useEffect, useState } from "react";
import "./purchaseCourse.scss";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PurchaseCourseCard } from "../../../components/Courses/PurchaseCourseCard/PurchaseCourseCard";
import axios from "axios";

export const PurchaseCourse = () => {
  const [cursosComprados, setCursosComprados] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/viewpurchasedcourse")
      .then((res) => {
        console.log(res.data);
        setCursosComprados(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* <Button onClick={() => navigate("/profile")}>Volver</Button> */}
      <PurchaseCourseCard />
    </div>
  );
};






