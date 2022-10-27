import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const userData = async (formData) => {
    try {
      await axios
        .post(
          "http://localhost:5000/user/login",
          {
            email: formData.get("email"),
            password: formData.get("password"),
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => localStorage.setItem("userId", data.data.user._id))
        .then(() => {
          localStorage.setItem("show", true);
        });

      setError("");
      navigate("/message");
      return;
    } catch (error) {
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };

  return (
    <UserContext.Provider value={{ userData, error }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
