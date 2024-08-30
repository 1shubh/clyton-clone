import React, { createContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase-config/config';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../Redux/loaderSlice';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({
    isAuth: false,
    token: null,
  });

  const [adminState, setAdminState] = useState({
    isAuth: false,
    token: null,
  });

  useEffect(() => {
    // Set up Firebase auth persistence
    dispatch(showLoader());
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Set up an observer on the Auth object to detect the auth state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // Check if the user is an admin or regular user
            const isAdmin = user.email === 'adminUser@example.com'; // Replace with your admin email check
            if (isAdmin) {
              setAdminState({
                isAuth: true,
                token: user.accessToken,
              });
            } else {
              setUserState({
                isAuth: true,
                token: user.accessToken,
              });
            }
          } else {
            // User is signed out
            setUserState({
              isAuth: false,
              token: null,
            });
            setAdminState({
              isAuth: false,
              token: null,
            });
          }
          dispatch(hideLoader());
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Failed to set auth persistence:", error);
        dispatch(hideLoader());
      });
  }, []);

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUserState({
        isAuth: true,
        token: userCredential.user.accessToken,
      });
      return true;
    } catch (error) {
      console.error("Failed to login:", error);
      return false;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAdminState({
        isAuth: true,
        token: userCredential.user.accessToken,
      });
      return true;
    } catch (error) {
      console.error("Failed to login:", error);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUserState({
        isAuth: false,
        token: null,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
      setAdminState({
        isAuth: false,
        token: null,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthState: userState,
        adminAuthState: adminState,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
