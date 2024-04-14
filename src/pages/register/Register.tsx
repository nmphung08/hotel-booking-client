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
    registerUser(register).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <div>Register</div>

      <TextField
        label="Username"
        name="username"
        type="text"
        value={register?.username}
        onChange={onInputChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={register?.password}
        onChange={onInputChange}
      />

      <div>
        <Button variant="contained" className="mr-4" onClick={onRegister}>
          Register
        </Button>

        <div>
          Already has a account? <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
