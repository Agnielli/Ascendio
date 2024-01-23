import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivatedUserMiniCard } from '../ActivatedUserMiniCard/ActivatedUserMiniCard'

export const AdminActivateUser = () => {
  const [activatedUsers, setActivatedUsers] = useState()
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/adminactivatedallusers')
      .then((res) => {
        console.log(res)
        setActivatedUsers(res.data)
        setUpdate(false)
      })
      .catch((err) => console.log(err))
  }, [update])

  
  return (
    <>
      {activatedUsers?.map((elem) => {
        return (
          <ActivatedUserMiniCard key={elem.user_id} elem={elem} update={update} setUpdate={setUpdate}/>
        )
      })}
    </>
  )
}
