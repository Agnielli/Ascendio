import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardResource.scss";

export const Cardresource = ({
  resource,
  course_id,
  deleteResource,
  section_id,
  topic_id,
  isIntoValidate,
  userId,
  userCourse,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    let link = "";

    if (resource[0].resource_type === 1) {
      link = `${resource[0].text}`;
    } else {
      link = resource[0].text;
    }
    navigate(
      `/resource/${course_id}/${section_id}/${link}/${resource[0].resource_type}`
    );
  };

  return (
    <div className="d-flex justify-content-between pplCardResource">
      {resource &&
        (resource[0]?.resource_type === 1 ||
          resource[0]?.resource_type === 2) && (
          <>
            <Button
              className="botonResource d-flex justify-content-center align-items-center m-0 p-1"
              onClick={handleClick}
              disabled={isIntoValidate ? true : false}
            >
              {resource[0]?.resource_type === 1 ? (
                <span class="material-symbols-outlined resourceIcon">description</span> 
              ) : null}
              {resource[0]?.resource_type === 2 ? (
                <span class="material-symbols-outlined resourceIcon">smart_display</span>
              ) : null}
            </Button>

            {userId === userCourse && (
              <button
                className="delResource d-flex justify-content-center align-items-center m-0 p-1"
                variant="outline-danger"
                onClick={() =>
                  deleteResource(section_id, topic_id, resource[0].resource_id)
                }
                disabled={isIntoValidate ? true : false}
              >
                <span class="material-symbols-outlined delIcon">delete</span>
              </button>
            )}
          </>
        )}
    </div>
  );
};
