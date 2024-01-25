import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FormAddTopic } from "../FormAddTopic/FormAddTopic";
import { CardTopic } from "../CardTopic/CardTopic";
import axios from "axios";

export const CardSection = ({
  elem,
  deleteSection,
  course_id,
  sections,
  topics,
  setTopics,
  setResetCourse,
  resetCourse,
  deleteTopic
}) => {
  const [showTopic, setShowTopic] = useState(false);

  const handleClick = () => {
    setShowTopic(true);
  };

  // useEffect((section_id, topic_id)=>{
  //   axios
  //     .get(`http://localhost:3000/courses/topics/${course_id}/${section_id}/${topic_id}`)
  //     .then((res)=>{
  //       console.log(res);
  //       setResetCourse(!resetCourse);
  //       setTopics(res.data);
  //     })
  //     .catch((err)=>{
  //       console.log(err);
  //     })
  // },[])

  return (
    <Card>
      <Card.Body>
        {elem.section_title}
        <Button
          variant="outline-success"
          onClick={handleClick}
          disabled={showTopic ? true : false}
        >
          Añadir tema
        </Button>
        <Button
          variant="outline-success"
          onClick={() => deleteSection(elem.section_id)}
        >
          Eliminar
        </Button>
        {showTopic && (
          <FormAddTopic
            setShowTopic={setShowTopic}
            course_id={course_id}
            sections={sections}
            section_id={elem.section_id}
            topics={topics}
            setTopics={setTopics}
            setResetCourse={setResetCourse}
            resetCourse={resetCourse}
          />
        )}
        {elem.section_topics.map((elem) => {
              return (
          <CardTopic 
          key={elem.topic_id}
          topics={topics} 
          setTopics={setTopics} 
          elem={elem}
          deleteTopic={deleteTopic}
          section_id={elem.section_id}
          setResetCourse={setResetCourse}
          resetCourse={resetCourse}
          />
          );
        })}
      </Card.Body>
    </Card>
  );
};
