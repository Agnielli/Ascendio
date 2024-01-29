import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivatedUserMiniCard } from "../ActivatedUserMiniCard/ActivatedUserMiniCard";
import { Col, Container, Row } from "react-bootstrap";
import './AdminActivateUser.scss'

export const AdminActivateUser = () => {
  const [activatedUsers, setActivatedUsers] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminactivatedallusers")
      .then((res) => {
        console.log(res);
        setActivatedUsers(res.data);
        setUpdate(false);
      })
      .catch((err) => console.log(err));
  }, [update]);

  return (
    <Container fluid>
      <Row>
        {activatedUsers?.map((elem) => (
          <Col className="MiniCardMap" key={elem.user_id} xxl={6} xl={6} lg={12} md={12} xs={12} >
            <ActivatedUserMiniCard
              key={elem.user_id}
              elem={elem}
              update={update}
              setUpdate={setUpdate}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
