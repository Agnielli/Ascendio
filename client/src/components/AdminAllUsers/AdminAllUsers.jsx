import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMiniCard } from "../UserMiniCard/UserMiniCard";


export const AdminAllUsers = ({allUsers, setAllusers}) => {
  const [reset, setReset] = useState(false)
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminusers")
      .then((res) => {
        setAllusers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reset]);
  return (
    <>
      {allUsers?.map((elem, index) => {
            return (
              <UserMiniCard
                reset={reset}
                setReset={setReset}
                key={index}
                elem={elem}
              />
            );
          })}
    </>
  );
};
