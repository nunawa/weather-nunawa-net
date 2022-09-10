import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map } from "./Map";
import { About } from "./About";
import { Data } from "./Data";
import { Navbars } from "./Navbars";
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbars/>
              <Container className='w-80 mt-3'>
                全国の年間平均値<br/>
                （2017～2021年平均）
                <p className='text-muted'>
                  各マーカーをクリックし、リンクからそれぞれの地点の詳細データが閲覧できます。
                </p>
              </Container>
              <Container className='w-80 mt-3'>
                <Map/>
              </Container>
              <Container bg="gray-500" className='w-80 mt-3'>
                &copy; <a href='https://github.com/nunawa'>Nunawa</a>
              </Container>
            </>
          }/>
          <Route path="/about" element={<About/>}/>
          <Route path="/data" element={<Data/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
