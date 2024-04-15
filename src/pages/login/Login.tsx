import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { useAuth } from "../../components/auth/AuthProvider";

export default function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.state?.path ?? "/";

  function onFieldChange(e) {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  }

  function onLogin() {
    if (login?.username?.length < 1 || login?.password?.length < 1) {
      return;
    }
    loginUser(login).then((res) => {
      auth.handleLogin(res?.jwt);
      navigate(path);
    });
  }

  return (
    <div className="below-navbar pt-8 mx-auto w-[60%] min-h-[100vh]">
      <div className="w-full text-center text-3xl font-semibold">Login</div>

      <div className="mt-8 flex flex-row justify-between">
        <TextField
          label="Username"
          type="text"
          name="username"
          value={login.username}
          sx={{
            width: "49%",
          }}
          onChange={onFieldChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={login.password}
          onChange={onFieldChange}
          sx={{
            width: "49%",
          }}
        />
      </div>

      <div className="flex flex-row mt-4 items-center">
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>

        <div className="ml-4">
          Haven't have an account yet?{"     "}
          <Link to={"/register"} className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
