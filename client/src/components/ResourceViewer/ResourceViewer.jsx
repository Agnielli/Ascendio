import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ResourceViewer = () => {
  const [titles, setTitles] = useState();
  let { course_id, link, type, section_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getOneBread/${course_id}/${section_id}`
      )
      .then((res) => {
        console.log(res.data);
        setTitles(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let urlbase = "https://www.youtube.com/embed/";
  if (type === "1") {
    urlbase = "http://localhost:3000/images/resource/";
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item href={`http://localhost:3000/course/${course_id}`}>
        {" "}
        {titles?.title}{" "}
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {titles?.section_title}
        <div>
          <iframe src={`${urlbase}${link}`} frameborder="0"></iframe>
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
};
