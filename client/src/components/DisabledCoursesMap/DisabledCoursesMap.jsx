import axios from "axios";
import React, { useEffect, useState } from "react";
import { DisabledCourses } from "../DisabledCourses/DisabledCourses";
import { Row } from "react-bootstrap";

export const DisabledCoursesMap = () => {
  const [disabledCourses, setDisabledCourses] = useState();
  const [updateCourses, setUpdateCourses] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/getalldisabledcourses`)
      .then((res) => {
        setDisabledCourses(res.data);
        setUpdateCourses(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateCourses]);

  return (
    <Row className="d-flex align-items-stretch">
      <main className="adminAllCourses d-flex flex-wrap justify-content-center gap-3 pb-5">
        {disabledCourses?.map((elem, index) => {
          return (
            <DisabledCourses
              setUpdateCourses={setUpdateCourses}
              elem={elem}
              key={index}
            />
          );
        })}
      </main>
    </Row>
  );
};
