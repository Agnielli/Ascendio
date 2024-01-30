import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminOneCourse } from "../AdminOneCourse/AdminOneCourse";
import { Row } from "react-bootstrap";

export const AdminCourses = () => {
  const [course, setCourse] = useState();
  const [updateCourses, setUpdateCourses] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/admingetallcourses`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateCourses]);

  return (
    <Row className="d-flex align-items-stretch">
    <main className="adminAllCourses d-flex flex-wrap justify-content-center gap-3 pb-5">
      {course?.map((elem) => {
        return (
          <AdminOneCourse
            elem={elem}
            key={elem.course_id}
            updateCourses={updateCourses}
            setUpdateCourses={setUpdateCourses}
          />
        );
      })}
    </main>
    </Row>
  );
};
