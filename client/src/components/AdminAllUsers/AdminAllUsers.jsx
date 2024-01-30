import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMiniCard } from "../UserMiniCard/UserMiniCard";
import { Col, Container, Row } from "react-bootstrap";
import "./AdminAllUsers.scss";

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
    <>
      {allUsers?.map((elem, index) => (
        <Col
          className="d-flex justify-content-center"
          key={elem.user_id}
          xl={6}
          xs={12}
        >
          <UserMiniCard
            elem={elem}
            updateUsers={updateUsers}
            setUpdateUsers={setUpdateUsers}
          />
        </Col>
      ))}
    </>
  );
};
