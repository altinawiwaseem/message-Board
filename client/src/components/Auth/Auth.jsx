import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(true);
  /* const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }; */
  /*  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  }; */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios
        .post("http://localhost:5000/user/register", {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        })
        .then(() => dispatch(authActions.login()))
        .then(navigate("/message"));
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post(
        "http://localhost:5000/user/login",
        {
          email: formData.get("email"),
          password: formData.get("password"),
        },
        {
          withCredentials: true,
        }
      );
      setError("");
      navigate("/message");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  /*  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  }; */
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <>
              <TextField
                placeholder="First name"
                type="text"
                autoComplete="firstName"
                name="firstName"
                required
              />

              <TextField
                placeholder="Last name"
                type="text"
                autoComplete="lastName"
                name="lastName"
                required
              />
            </>
          )}
          <TextField
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />
          <TextField
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? navigate("/login") : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;

/* import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function Auth() {
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography>Login</Typography>
          <TextField />
          <TextField />
          <TextField />
          <Button>Submit</Button>
          <Button>Change To Signup</Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth; */
