import axios from "axios";
import React, { useEffect, useState } from "react";

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
          <div key={index} className="d-flex flex-wrap gap-5">
            <div>
              <h3>Usuarios</h3>
              <p>Usuarios: {elem.num_type_2_users}</p>
              <p>Usuarios Activos: {elem.num_active_users}</p>
              <p>
                Usuarios Bloqueados:{" "}
                {elem.num_type_2_users - elem.num_active_users}
              </p>
              <p>Admins: {elem.num_type_1_users}</p>
            </div>
            <div>
              <h3>Posts</h3>
              <p>Posts Totales: {elem.num_posts}</p>
              <p>Trades Publicados: {elem.num_trade_posts}</p>
              <p>Trades Correctos: {elem.num_correct_posts}</p>
              <p>Trades Incorrectos: {elem.num_incorrect_posts}</p>
              <p>
                Trades Pendientes:{" "}
                {elem.num_trade_posts -
                  elem.num_correct_posts -
                  elem.num_incorrect_posts}
              </p>
            </div>
            <div>
              <h3>Cursos</h3>
              <p>Cursos Publicados: {elem.num_courses}</p>
              <p>Cursos Activos:{elem.num_active_courses}</p>
              <p>Cursos Bloqueados: {elem.num_disabled_courses}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
