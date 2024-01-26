import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ResourceViewer = () => {
  const { course_id, link } = useParams();

  console.log("aaa", course_id);
  console.log("gggg", link);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href={`http://localhost:3000/course/${course_id}`}> {course_id} </Breadcrumb.Item>
      <Breadcrumb.Item>
        Library
        <div>
          <p>Necesito el curse_title, el seccion_title y que me devuelva a la vista general de un curso</p>

          <iframe
            src={`http://localhost:3000/images/resource/${link}`}
            frameBorder="0"
          ></iframe>
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
};
