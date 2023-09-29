import React , { createContext ,useReducer} from 'react';
import {Routes, Route} from "react-router-dom";
import Login from './pages/LoginPage';
import Signup from './pages/RegisterPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import  {initialState, reducer} from "./reducer/UseReducer";

export const UserContext = createContext();

const App = () => {
 
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<>
    <Navbar />
    <UserContext.Provider value={{state, dispatch}}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
    </UserContext.Provider>
    </>);
};

export default App;
