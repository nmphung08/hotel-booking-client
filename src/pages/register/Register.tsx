import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api";

export default function Register() {
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });

  function onInputChange(e) {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  }

  function onRegister() {
    if (register?.username?.length < 1 || register?.password?.length < 1) {
      return;
    }
    registerUser(register).then();
  }

  return (
    <div className="below-navbar pt-8 mx-auto w-[60%] min-h-[100vh]">
      <div className="w-full text-center text-3xl font-semibold">Register</div>

      <div className="mt-8 flex flex-row justify-between">
        <TextField
          label="Username"
          type="text"
          name="username"
          value={register?.username}
          sx={{
            width: "49%",
          }}
          onChange={onInputChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={register?.password}
          sx={{
            width: "49%",
          }}
          onChange={onInputChange}
        />
      </div>

      <div className="flex flex-row mt-4 items-center">
        <Button variant="contained" onClick={onRegister}>
          Register
        </Button>

        <div className="ml-4">
          Already has a account?{"     "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
