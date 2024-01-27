import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const ResourceViewer = () => {
  const [titles, setTitles] = useState();
  const navigate = useNavigate()
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
      <Breadcrumb.Item onClick={()=>navigate(-1)}>
        {titles?.title}
      </Breadcrumb.Item>
      <Breadcrumb.Item onClick={()=>navigate(-1)}>
        {titles?.section_title}
        <div>
          <iframe src={`${urlbase}${link}`} frameborder="0"></iframe>
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
};
