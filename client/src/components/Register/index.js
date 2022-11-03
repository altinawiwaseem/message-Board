import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();

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
        /* .then(() => dispatch(authActions.login())) */
        .then(navigate("/login"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #888"
          padding={3}
          margin="auto"
          borderRadius={5}
          gap="1rem"
          sx={{ background: "#f6f6f6" }}
        >
          <Typography variant="h3" textAlign="center">
            Register
          </Typography>
          <TextField
            label="First Name"
            className={style.input}
            placeholder="First name"
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />
          <TextField
            label="Last Name"
            className={style.input}
            placeholder="Last name"
            type="text"
            autoComplete="lastName"
            name="lastName"
            required
          />
          <TextField
            label="Email"
            className={style.input}
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />

          <TextField
            label="Password"
            className={style.input}
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <Button
            className={style.button}
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "0.4rem",
              padding: "1rem 2rem",
              marginTop: 3,
              width: "90%",
            }}
          >
            Register
          </Button>
          <Typography marginTop={2}>
            Already have an account ?{" "}
            {
              <Link className={style.a} variant="contained" to="/login">
                Login
              </Link>
            }
          </Typography>
        </Box>
      </form>
    </div>
  );
}
