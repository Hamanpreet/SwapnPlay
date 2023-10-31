import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.scss';

import About from './components/About';
import Profile from './components/Profile';
import Toy from './components/Toy';
import NotFound from './components/NotFound';
import NewToy from './components/NewToy';
import ToyList from "./components/ToyList";
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import TopNavigationBar from "./components/TopNavigationBar";
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
  const [subId, setSubId] = useState(null);

  // To update the filterData state
  const updateFilterData = (data) => {
    setFilterData(data);
  };

  // Function to receive the subId from LoginButton
  const handleSubIdChange = (newSubId) => {
    setSubId(newSubId);
  };
console.log(subId);
  return (
    <div className="App">
      <Router>
        <TopNavigationBar onSubIdChange={handleSubIdChange} subId={subId?.sub} nickname = {subId?.nickname}/>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/userprofile" element={<UserProfile subId={subId?.sub} />} />
            <Route path="/toys/:id" element={<Toy />} />
            <Route path="/toys/new" element={<NewToy />} />
            <Route path="/toys" element={<ToyList subId={subId?.sub} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat/:matchId" element={<Chat subId={subId} />} />
        </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
