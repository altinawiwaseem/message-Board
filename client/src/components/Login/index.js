import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import style from "../Register/Register.module.css";

export default function Login() {
  const { userData, error } = useContext(UserContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    userData(formData);
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleLogin}>
        <Box
          width={400}
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
            Login
          </Typography>
          <Typography color="red" textAlign="center">
            {error}
          </Typography>
          <TextField
            className={style.input}
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />
          <TextField
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
            Login
          </Button>
          <Typography marginTop={2}>
            Don't have an account ?{" "}
            {
              <Link className={style.a} variant="contained" to="/">
                Register
              </Link>
            }
          </Typography>
        </Box>
      </form>
    </div>
  );
}
