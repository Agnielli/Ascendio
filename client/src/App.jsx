import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { RoutesApp } from './Routes/RoutesApp'
import { AscendioContext } from './context/AscendioContext';

function App() {

  return (
    <>
      <Container fluid>
        {/* <AscendioContext> */}
          <RoutesApp /> {/* children */}
        {/* </AscendioContext> */}
      </Container>
    </>
  )
}

export default App
