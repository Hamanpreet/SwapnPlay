import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Profile from './components/Profile';
import Toy from './components/Toy';
import NotFound from './components/NotFound';
import NewToy from './components/NewToy';
import ToyList from "./components/ToyList";
import Home from './components/Home';
import { useState } from "react";
import TopNavigationBar from "./components/TopNavigationBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chat from './components/Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
  },
});

function App() {
  const [filterData, setFilterData] = useState(null);

  // To update the filterData state
  const updateFilterData = (data) => {
    setFilterData(data);
  };

  return (
    <div className="App">
      <Router>
        <TopNavigationBar />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys/:id" element={<Toy />} />
            <Route path="/toys/new" element={ <NewToy /> } />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat/:userId" element={ <Chat /> } />
        </Routes>
        </ThemeProvider>
      </Router>
  
    </div>
  );
}

export default App;
