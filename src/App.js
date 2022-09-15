import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map } from "./Map";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand href=''>全国の暑さ指数一覧</Navbar.Brand>
          <Nav.Link className='justify-content-end'>About</Nav.Link>
        </Container>
      </Navbar>
      <Container className='w-75 mt-3'>
        <Map />
      </Container>
    </div>
  );
}

export default App;
