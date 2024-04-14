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
    <div>
      <div>Login</div>

      <TextField
        label="Username"
        type="text"
        name="username"
        value={login.username}
        onChange={onFieldChange}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={login.password}
        onChange={onFieldChange}
      />

      <div>
        <Button variant="contained" className="mr-4" onClick={onLogin}>
          Login
        </Button>

        <div>
          Haven't have an account yet? <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
