import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
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
  deleteTopic,
  userId,
  userCourse,
  setAddTopic,
  setAddSection,
  index  
}) => {
  const [showTopic, setShowTopic] = useState(false);
  const [orderedTopics, setOrderedTopics] = useState([]);

  useEffect(() => {
    // Ordenar los temas por fecha de creación
    const sortedTopics = elem.section_topics.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setOrderedTopics(sortedTopics);
  }, [elem.section_topics]);

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
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
      {`${index}. ${elem.section_title}`}
        {userId === userCourse &&<Button
          variant="outline-success"
          onClick={handleClick}
          disabled={showTopic ? true : false}
        >
          Añadir tema
        </Button>}
        {userId === userCourse &&<Button
          variant="outline-success"
          onClick={() => deleteSection(elem.section_id)}
        >
          Eliminar
        </Button>}
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
            setAddTopic={setAddTopic}
            setAddSection={setAddSection}
          />
        )}
        </Accordion.Header>
        <Accordion.Body>
        <Accordion defaultActiveKey="1">
        {elem.section_topics.map((topic, index) => {
              return (
          <CardTopic
          key={elem.topic_id}
          topics={topics}
          setTopics={setTopics}
          topic={topic}
          deleteTopic={deleteTopic}
          section_id={elem.section_id}
          setResetCourse={setResetCourse}
          resetCourse={resetCourse}
          index={index + 1}
          />
          );
        })}
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
};