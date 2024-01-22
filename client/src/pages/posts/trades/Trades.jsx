import React, { useContext, useEffect, useState } from 'react';
import './trades.scss';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { AscendioContext } from '../../../context/AscendioContext';

export const Trades = () => {

  const [show, setShow] = useState(1);
  const [lastTrades, setLastTrades] = useState([]); // para enseñar: ULTIMOS TRADES o TOP SEGUIDORES o TOP ACERTADOS
 const { user } = useContext(AscendioContext);

  useEffect(() => {
    axios 
      .get("http://localhost:3000/posts/lasttrades")
      .then((res) => {
        console.log(res.data);
        setLastTrades(res.data)
      })
      .catch((err) => {console.log(err)})
  }, [])

  // NO SEGUIOS

  const seguirUsuario = (id_followed) => {
    // id del seguido, user.user_id es quien sigue
    const data = [ user.user_id, id_followed];
    // console.log(data); /* me llegan la data */

    axios 
    .post(`http://localhost:3000/users/followUser`, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {console.log(err)})
  }

  return (
    <div>

      {/* ULTIMOS TRADES */}
      {show === 1 && 
      <>
        <Button onClick={() => setShow(2)}>Top Seguidores</Button>
        <Button onClick={() => setShow(3)}>Top Acertados</Button>

        <h1>Últimos Trades</h1>
        {lastTrades?.map((elem) => {
          return (
            <Card style={{ width: '18rem', marginBottom: '1rem'}} key={elem.user_id}>
              <Card.Body>
                <div className='d-flex justify-content-between'>
                  <Card.Title>{elem.nickname}</Card.Title>
                  <Button variant="primary" onClick={() => seguirUsuario(elem.user_id)}>Seguir</Button>
                </div>

                <Card.Text>{elem.currency}</Card.Text>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Text>{elem.description}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
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
