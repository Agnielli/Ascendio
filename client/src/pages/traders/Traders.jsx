import React, { useEffect, useState } from 'react';
import './traders.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export const Traders = () => {

  const [show, setShow] = useState(1);
  const [lastTrades, setLastTrades] = useState(); // para enseñar: ULTIMOS TRADES 

  useEffect(() => {
    axios 
      .get("http://localhost:3000/posts/...")
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {console.log(err)})
  }, [])

  // NO SEGUIDOS

  return (
    <div>

      {/* ULTIMOS TRADES */}
      {/* hACE F */}
      {show === 1 && 
      <>
        <Button onClick={() => setShow(2)}>Top Seguidores</Button>
        <Button onClick={() => setShow(3)}>Top Acertados</Button>

        <h1>Últimos Trades</h1>
        {/* {lastTrades.map(() => {
          return (

          )
        })} */}
      </>
      }

      {/* TOP SEGUIDORES */}
      {show === 2 && 
      <>
      
        <Button onClick={() => setShow(1)}>Últimos Trades</Button>
        <Button onClick={() => setShow(3)}>Top Acertados</Button>

        <h1>Top Seguidores</h1>
        {/* {lastTrades.map(() => {
          return (

          )
        })} */}
      </>
      }

      {/* TOP ACERTADOS */}
      {show === 3 && 
      <>
        <Button onClick={() => setShow(1)}>Últimos Trades</Button>
        <Button onClick={() => setShow(2)}>Top Seguidores</Button>

        <h1>Top Acertados</h1>
        {/* {lastTrades.map(() => {
          return (

          )
        })} */}
      </>
      }


      {/* BOTON DE TOP SEGUIDORES Y BOTON DE TOP ACERTADOS */}

      {/* MAPEO DE LOS ULTIMOS TRADES  */}

    </div>
  )
}
