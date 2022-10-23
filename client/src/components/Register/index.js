import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.h1}>Register</h1>
          {error ? <p>{error}</p> : null}
          <input
            placeholder="First name"
            className={style.input}
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />

          <input
            placeholder="Last name"
            className={style.input}
            type="text"
            autoComplete="lastName"
            name="lastName"
            required
          />
          <input
            placeholder=" E-mail"
            className={style.input}
            type="email"
            autoComplete="email"
            name="email"
            required
          />
          <input
            placeholder="Password"
            className={style.input}
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <button className={style.button} type="submit">
            Register
          </button>
          <span className={style.navLink}>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
