import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/LoginPage';
import Signup from './pages/RegisterPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

const App = () => {

  const [showNotification, setShowNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState('');
  const [isError, setIsError] = useState(false);

  const showCustomNotification = (message, isError = false) => {
  
    setNotificationContent(message);
    setIsError(isError);
    setShowNotification(true);

    setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      
      <Navbar  showCustomNotification={showCustomNotification}/>
      
      {showNotification && (
        <Notification
          message={notificationContent}
          isError={isError}
          onClose={hideNotification}
        />
      )}
    

      <Routes>
        <Route exact path="/" element={<Home showCustomNotification={showCustomNotification} />} />
        <Route exact path="/login" element={<Login showCustomNotification={showCustomNotification} />} />
        <Route exact path="/signup" element={<Signup showCustomNotification={showCustomNotification} />} />
      </Routes>
    </>
  );
};

export default App;
