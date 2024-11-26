import Navbar from "./components/Navbar.jsx";
import Gamesmain from "./components/Gamesmain.jsx"
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import GameDetails from "./components/GamesDetails";
function App() {
  return (
   
    <div className="App">
      <Navbar/>
      <Router>
      <Routes>
        <Route path="/" element={<Gamesmain />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
      <Footer/>
    </div>
   
  );
}

export default App;
