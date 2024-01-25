import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TradeCard } from '../TradeCard/TradeCard'

export const TradesPostMap = () => {
  const [trades, setTrades] = useState()
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getposttrades`)
      .then((res) => {
        console.log(res)
        setTrades(res.data)
      })
      .catch((err) => {console.log(err)})
  }, [])

  console.log(trades)
  return (
    <>
      {trades?.map((elem, index) => {
        return (
          <TradeCard elem={elem} key={index}/>
        )
      })}
    </>
  )
}
