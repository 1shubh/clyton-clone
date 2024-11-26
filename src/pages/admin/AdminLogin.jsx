import React, { useContext, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { PasswordInput } from "../../components/PasswordInput";
import { AuthContext } from "../../hoc/AuthContext";

export const AdminLogin = () => {
  const { loginAdmin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    setError("");

    try {
      const isAuthenticated = await loginAdmin(username, password);
      if (!isAuthenticated) {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginPage h-[100vh] pt-20 bg-[#e9e2e4]">
      <div className="w-[25%] sm:w-[50%] lg:w-[30%] m-auto">
        <img src="/images/logo.png" alt="logo" className="w-full" />
      </div>
      <p className="text-[35px] sm:text-[25px] text-center text-black mt-5">
        Scenic Homes of AZ® Admin Panel
      </p>

      <div className="w-[35%] sm:w-[90%] lg:w-[60%] xl:w-[40%] m-auto mt-10">
        <form onSubmit={handleLogin} className="grid gap-5">
          <Input
            variant="outline"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
            border={"1px solid black"}
          />
          <PasswordInput value={password} setpassword={setPassword} />
          <Button
            className="w-[20%] sm:w-[35%] lg:w-[30%] m-auto"
            colorScheme="orange"
            variant="solid"
            type="submit" // Set button type to submit
          >
            Login
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};
