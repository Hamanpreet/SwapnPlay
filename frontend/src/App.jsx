import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.scss";

import About from "./components/About";
import Profile from "./components/Profile";
import Toy from "./components/Toy";
import NotFound from "./components/NotFound";
import NewToy from "./components/NewToy";
import ToyList from "./components/ToyList";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import TopNavigationBar from "./components/TopNavigationBar";
import Chat from "./components/Chat";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
  },
});

function App() {
  
  const [searchResults, setSearchResults] = useState("");
  const [subId, setSubId] = useState(null);

  console.log("searchResults",searchResults);
  // Function to receive the subId from LoginButton
  const handleSubIdChange = (newSubId) => {
    setSubId(newSubId);
  };
  return (
    <div className="App">
      <Router>
        <TopNavigationBar
          onSubIdChange={handleSubIdChange}
          subId={subId?.sub}
          nickname={subId?.nickname}
          setSearchResults={setSearchResults}
        />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/userprofile"
              element={<UserProfile subId={subId?.sub} searchResults={searchResults}/>} />
            <Route path="/toys/:id" element={<Toy />} />
            <Route path="/toys/new" element={<NewToy subId={subId?.sub} />} />
            <Route path="/toys" element={<ToyList subId={subId?.sub} searchResults={searchResults}/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/chat/:matchId" element={<Chat subId={subId?.sub} />} />
            </Routes>
        </ThemeProvider>
       </Router>
    </div>
  );
}

export default App;;
