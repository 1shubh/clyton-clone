import React, { useContext, useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { PasswordInput } from "../components/PasswordInput";
import { AuthContext } from "../hoc/AuthContext";

export const Login = () => {
  const { loginUser,authState } = useContext(AuthContext);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const isAuthenticated = loginUser(username, password);
    if (!isAuthenticated) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="loginPage h-[100vh] pt-20 bg-[#e9e2e4]">
      <div className="w-[25%] m-auto">
        <img src="/images/logo.png" alt="logo" className="w-full" />
      </div>
      <p className="text-[35px] text-center text-black mt-5">
        Scenic Homes of AZ® Ordering Portal
      </p>
      {/* Login form */}

      <div className="w-[35%] xl:w-[40%] m-auto mt-10">
        <form action="" className="grid gap-5">
          <Input
            variant="outline"
            placeholder="Email Address or Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="text-black"
            border={"1px solid black"}
          />
          <PasswordInput value={password} setpassword={setPassword} />
          <Button
            className="w-[20%] m-auto"
            // backgroundColor={"red"}
            // color={"white"}
            colorScheme="orange"
            variant="solid"
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="text-black text-center mt-20">
          Don't have an account? Contact your CSM to request access.
        </p>
      </div>
    </div>
  );
};
