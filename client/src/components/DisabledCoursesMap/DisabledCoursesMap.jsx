import axios from "axios";
import React, { useEffect, useState } from "react";
import { DisabledCourses } from "../DisabledCourses/DisabledCourses";

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
    <>
      <div className="adminAllCourses d-flex flex-wrap justify-content-center gap-3 pb-5">
        {disabledCourses?.map((elem, index) => {
          return (
            <DisabledCourses
              setUpdateCourses={setUpdateCourses}
              elem={elem}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
