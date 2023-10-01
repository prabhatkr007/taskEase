import React from 'react';
import '../styles/Notification.css';

function Notification({ message, isError, onClose }) {
 

  return (
    <div className={`notification ${isError ? 'error' : 'success'} show`}>
      <p className="notification-message">{message}</p>
      <button className="notification-close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Notification;
