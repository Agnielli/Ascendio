import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMiniCard } from "../UserMiniCard/UserMiniCard";


export const AdminAllUsers = ({allUsers, setAllUsers}) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminusers")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {allUsers?.map((elem) => {
            return (
              <UserMiniCard            
                key={elem.user_id}
                elem={elem}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
              />
            );
          })}
    </>
  );
};
