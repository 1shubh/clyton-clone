import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [state, setState] = useState({
    isAuth: false,
    token: null
  });

  const loginUser = (username, password) => {
    // Hardcoded credentials for demonstration
    // let isValid = false;
    // if (currentRoute === '/videos') {
    //   isValid = password === 'marutiAi@2024'; //change videos page password here
    // } else{
    //   isValid = password === 'marutiAi@2024';
    // }
    if (username === 'testUser' && password==="test@2024") {
      setState({
        ...state,
        isAuth: true,
        // token: 'your_generated_token_here' 
      });
      return true; // Return true for successful login
    }
    return false; // Return false for unsuccessful login
  };

  const logoutUser = () => {
    setState({
      ...state,
      isAuth: false,
      token: null
    });
  };

  return (
    <AuthContext.Provider value={{ authState: state, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;