import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { RoutesApp } from './Routes/RoutesApp'
import { AscendioProvider } from './context/AscendioContext';

function App() {

  return (
    <>
      <Container fluid>
        <AscendioProvider>
          <RoutesApp /> {/* children */}
        </AscendioProvider>
      </Container>
    </>
  )
}

export default App
