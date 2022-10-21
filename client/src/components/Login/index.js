import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
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

  return (
    <>
      <h1>Login</h1>
      {error ? <p>{error}</p> : null}
      <form onSubmit={handleLogin}>
        <label>
          E-mail
          <input type="email" autoComplete="email" name="email" required />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            name="password"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
