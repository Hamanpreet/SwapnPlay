import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;



