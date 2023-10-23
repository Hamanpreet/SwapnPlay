import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Profile from './components/Profile';
import LogoutButton from './components/Logout';
import LoginButton from './components/Login';
import Toy from './components/Toy';
import NotFound from './components/NotFound';
import NewToy from './components/NewToy';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys/:id" element={<Toy />} />
            <Route path="/toys/newToy" element={ <NewToy /> } />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <LoginButton />
      <LogoutButton />
      <Profile />
     </ThemeProvider>
    </div>
  );
}

export default App;



