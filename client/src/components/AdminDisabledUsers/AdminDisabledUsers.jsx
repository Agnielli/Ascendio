import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DisabledUserCard } from '../DisabledUserMiniCard/DisabledUserCard'

export const AdminDisabledUsers = () => {
  const [disabledUsers, setDisabledUsers] = useState()
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/admindisabledallusers')
      .then((res) => {
        console.log(res)
        setDisabledUsers(res.data)
        setUpdate(false)
      })
      .catch((err) => console.log(err))
  }, [update])

  
  return (
    <>
      {disabledUsers?.map((elem) => {
        return (
          <DisabledUserCard key={elem.user_id} elem={elem} update={update} setUpdate={setUpdate}/>
        )
      })}
    </>
  )
}
