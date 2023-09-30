import React, { createContext, useReducer, useContext } from 'react';


export const initialState = false;

export const AuthContext = createContext();

// reducer function
export const reducer = (state, action) => {
  if (action.type === 'USER_AUTHENTICATED') {
    return true; 
  }
  if (action.type === 'USER_LOGGED_OUT') {
    return false; 
  }
  return state;
};

// provider component to wrap the app with the context
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for accessing the context
export const useAuth = () => {
  return useContext(AuthContext);
};
