import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./hoc/AuthContext";
import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./componets/Navbar";
import { Footer } from "./componets/Footer";

function App() {
  const { authState } = useContext(AuthContext);

  return authState.isAuth ? (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  ) : (
    <Login />
  );
}

export default App;
