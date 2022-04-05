import { useCallback, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthLayout from "../Layouts/AuthLayout";
import axiosAuth from "../Helpers/axiosAuth";
import Message from "../Helpers/message";
import { useNavigate } from "react-router";

const signinSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  email: Yup.string().email().required("email is required"),
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  password: Yup.string()
    .min(8, "password must contain at least 8 characters.")
    .required("password is required"),
  repeatPassword: Yup.string()
    .required("repeat password is required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

function SignUpPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const signup = useCallback(
    ({ username, email, firstname, lastname, password }) => {
      setIsSigningUp(true);
      axiosAuth
        .post("/users/", {
          username,
          email,
          first_name: firstname,
          last_name: lastname,
          password,
        })
        .then((res) => {
          console.log(res);
          Message.fire({
            titleText: "Signed Up Successfully",
            icon: "success",
          });
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response && err.response.status === 400) {
            for (const key in err.response.data) {
              Message.fire({
                titleText: err.response.data[key],
                icon: "error",
              });
            }
            return;
          }
          Message.fire({
            titleText: "A Problem Happened",
            icon: "error",
          });
        })
        .finally(() => setIsSigningUp(false));
    },
    [navigate]
  );

  return (
    <AuthLayout
      loading={isSigningUp}
      details={{
        title: "Sing Up",
        link: "/sign-in",
        text: "sign in into your account",
      }}
      submitButtonText={"Sign Up"}
      submitFunction={handleSubmit(signup)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.username)}
            id="login-username"
            label="Username"
            variant="filled"
            helperText={errors.username && errors.username.message}
            fullWidth
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.email)}
            id="login-email"
            label="Email"
            variant="filled"
            helperText={errors.email && errors.email.message}
            fullWidth
            {...field}
          />
        )}
      />

      <Controller
        name="firstname"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.firstname)}
            id="login-firstname"
            label="Firstname"
            variant="filled"
            helperText={errors.firstname && errors.firstname.message}
            fullWidth
            {...field}
          />
        )}
      />

      <Controller
        name="lastname"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.lastname)}
            id="login-lastname"
            label="Lastname"
            variant="filled"
            helperText={errors.lastname && errors.lastname.message}
            fullWidth
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormControl
            error={Boolean(errors.password)}
            {...field}
            fullWidth
            variant="filled"
          >
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <FilledInput
              id="password-input"
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
            <FormHelperText id="password-error-text">
              {errors.password && errors.password.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="repeatPassword"
        control={control}
        render={({ field }) => (
          <FormControl
            error={Boolean(errors.repeatPassword)}
            {...field}
            fullWidth
            variant="filled"
          >
            <InputLabel htmlFor="repeat-password-input">
              Repeat Password
            </InputLabel>
            <FilledInput
              id="repeat-password-input"
              type={showPassword ? "text" : "password"}
              value={repeatPassword}
              fullWidth
              onChange={(event) => setRepeatPassword(event.target.value)}
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
            <FormHelperText id="repeat-password-error-text">
              {errors.repeatPassword && errors.repeatPassword.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </AuthLayout>
  );
}

export default SignUpPage;
