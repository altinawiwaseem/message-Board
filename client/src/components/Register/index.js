import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await axios.post("http://localhost:5000/user/register", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
