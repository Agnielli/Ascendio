import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import "./Estadisticas.scss";

export const Estadisticas = () => {
  const [stats, setStats] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/allstatistics`)
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {stats?.map((elem, index) => {
        return (
          <Container key={index} className="mt-4">
            <Row className="d-flex flex-row">
              <Col
                key={elem.user_id}
                xs={12}
                md={12}
                lg={12}
                xl={4}
                className="mt-4 d-flex flex-column justify-content-center align-items-center text-center"
              >
                <div className="Statsdiv">
                  <h5 className="Ptitle">Usuarios</h5>
                  <div>
                    <p className="Psub">Usuarios:</p>
                    <p className="Pstat">{elem.num_type_2_users}</p>
                    <p className="Psub">Usuarios Activos:</p>
                    <p className="Pstat">{elem.num_active_users}</p>
                    <p className="Psub">Usuarios Bloqueados: </p>
                    <p className="Pstat">
                      {elem.num_type_2_users - elem.num_active_users}
                    </p>
                    <p className="Psub">Admins:</p>
                    <p className="Pstat">{elem.num_type_1_users}</p>
                  </div>
                </div>
              </Col>
              <Col
                key={elem.post_id}
                xs={12}
                md={12}
                lg={12}
                xl={4}
                className="mt-4 d-flex flex-column justify-content-center align-items-center text-center"
              >
                <div className="Statsdiv">
                  <h5 className="Ptitle">Posts</h5>
                  <div>
                    <p className="Psub">Posts Totales:</p>
                    <p className="Pstat">{elem.num_posts}</p>
                    <p className="Psub">Trades Publicados:</p>
                    <p className="Pstat">{elem.num_trade_posts}</p>
                    <p className="Psub">Trades Correctos:</p>
                    <p className="Pstat">{elem.num_correct_posts}</p>
                    <p className="Psub">Trades Incorrectos:</p>
                    <p className="Pstat">{elem.num_incorrect_posts}</p>
                    <p className="Psub">Trades Pendientes: </p>
                    <p className="Pstat">
                      {elem.num_trade_posts -
                        elem.num_correct_posts -
                        elem.num_incorrect_posts}
                    </p>
                  </div>
                </div>
              </Col>
              <Col
                key={elem.course_id}
                xs={12}
                md={12}
                lg={12}
                xl={4}
                className="mt-4 d-flex flex-column justify-content-center align-items-center text-center"
              >
                <div className="Statsdiv">
                  <h5 className="Ptitle">Cursos</h5>
                  <div>
                    <p className="Psub">Cursos Publicados:</p>
                    <p className="Pstat">{elem.num_courses}</p>
                    <p className="Psub">Cursos Activos:</p>
                    <p className="Pstat">{elem.num_active_courses}</p>
                    <p className="Psub">Cursos Bloqueados:</p>
                    <p className="Pstat">{elem.num_disabled_courses}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
    </>
  );
};
