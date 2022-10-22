import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post("http://localhost:5000/user/register", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        {error ? <p>{error}</p> : null}
        <label>
          First name
          <input
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />
        </label>
        <label>
          Last name
          <input type="text" autoComplete="lastName" name="lastName" required />
        </label>
        <label>
          E-mail
          <input type="email" autoComplete="email" name="email" required />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
