import { useCallback, useState } from "react";

import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import axiosAuth from "../Helpers/axiosAuth";
import Auth from "../Helpers/Auth";
import Message from "../Helpers/message";
import AuthLayout from "../Layouts/AuthLayout";

function SignInPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = useCallback(
    (event) => {
      event.preventDefault();
      setIsSigningIn(true);

      axiosAuth
        .post("/jwt/create/", {
          username,
          password,
        })
        .then((res) => {
          console.log(res);
          const { access, refresh } = res.data;
          Auth.login(access, refresh);
          navigate("/add-todo");
          Message.fire({
            titleText: "Logged In",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response && err.response.status === 401) {
            Message.fire({
              titleText: err.response.data.detail,
              icon: "error",
            });
            return;
          }
          Message.fire({
            titleText: "A problem happened",
            icon: "error",
          });
        })
        .finally(() => setIsSigningIn(false));
    },
    [navigate, password, username]
  );

  return (
    <AuthLayout
      loading={isSigningIn}
      details={{
        title: "Sing In",
        link: "/sign-up",
        text: "create account",
      }}
      submitButtonText={"Sign In"}
      submitFunction={signin}
    >
      <TextField
        id="login-username"
        label="Username"
        variant="filled"
        onChange={(event) => setUsername(event.target.value)}
        fullWidth
      />
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          fullWidth
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </AuthLayout>
  );
}

export default SignInPage;
