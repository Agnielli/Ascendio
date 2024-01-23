import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserMiniCard } from "../UserMiniCard/UserMiniCard";

export const AdminAllUsers = ({allUsers, setAllUsers}) => {
  const [updateUsers, setUpdateUsers] = useState(false)
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/adminusers")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [updateUsers]);

  return (
    <>
      {allUsers?.map((elem) => {
            return (
              <UserMiniCard
                key={elem.user_id}
                elem={elem}
                updateUsers={updateUsers}
                setUpdateUsers={setUpdateUsers}
              />
            );
          })}
    </>
  );
};

