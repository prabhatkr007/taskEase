import React , { createContext ,useReducer} from 'react';
import {Routes, Route} from "react-router-dom";
import Login from './pages/LoginPage';
import Signup from './pages/RegisterPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  
  return (<>
    <Navbar />
   
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
    </>);
};

export default App;
