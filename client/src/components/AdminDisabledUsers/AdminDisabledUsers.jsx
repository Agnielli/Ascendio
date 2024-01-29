import axios from "axios";
import React, { useEffect, useState } from "react";
import { DisabledUserCard } from "../DisabledUserMiniCard/DisabledUserCard";
import { Col, Container, Row } from "react-bootstrap";
import './AdminDisabledUsers.scss'

export const AdminDisabledUsers = () => {
  const [disabledUsers, setDisabledUsers] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/admindisabledallusers")
      .then((res) => {
        console.log(res);
        setDisabledUsers(res.data);
        setUpdate(false);
      })
      .catch((err) => console.log(err));
  }, [update]);

  return (
    <Container fluid>
      <Row>
        {disabledUsers?.map((elem) => (
          <Col className="MiniCardMap" key={elem.user_id} xxl={6} xl={6} lg={12} md={12} xs={12} >
            <DisabledUserCard
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
