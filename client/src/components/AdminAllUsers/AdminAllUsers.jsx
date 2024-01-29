import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMiniCard } from "../UserMiniCard/UserMiniCard";
import { Col, Container, Row } from "react-bootstrap";
import './AdminAllUsers.scss'

export const AdminAllUsers = ({ allUsers, setAllUsers }) => {
  const [updateUsers, setUpdateUsers] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminusers")
      .then((res) => {
        setAllUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateUsers]);

  return (
    <Container fluid>
      <Row>
        {allUsers?.map((elem, index) => (
          <Col className="MiniCardMap" key={index} xxl={6} xl={6} lg={12} md={12} xs={12} >
            <UserMiniCard
              elem={elem}
              updateUsers={updateUsers}
              setUpdateUsers={setUpdateUsers}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
