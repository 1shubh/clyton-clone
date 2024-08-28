import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./hoc/AuthContext";
import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useLocation } from "react-router-dom";
import { Admin } from "./pages/admin/Admin";
import { useSelector } from 'react-redux';
import { Loader } from "./components/Loader";

function App() {
  const { userAuthState } = useContext(AuthContext);
  const location = useLocation()
  const loading = useSelector((state) => state.loader.loading);
  if(loading){
    return <div className="flex items-center justify-center h-[100vh]">
      <Loader/>
    </div>
  }
  return userAuthState.isAuth ? (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  ) : (
      location.pathname === "/admin" ? <Admin/> : <Login />
  );
}

export default App;
