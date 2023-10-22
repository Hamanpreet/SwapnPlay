import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Profile from './components/Profile';
import Toy from './components/Toy';
import NotFound from './components/NotFound';
import NewToy from './components/NewToy';
import Home from './components/Home';
import { useState } from "react";
import TopNavigationBar from './components/TopNavigationBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
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
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Toy />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys/:id" element={<Toy />} />
            <Route path="/toys/new" element={ <NewToy /> } />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <TopNavigationBar updateFilterData={updateFilterData} />
      <Profile />
     </ThemeProvider>
    </div>
  );
}

export default App;



