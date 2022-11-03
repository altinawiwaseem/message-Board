import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
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
        .then((data) =>
          localStorage.setItem("user", JSON.stringify(data.data.user))
        )

        .then(() => {
          localStorageUser();
        });

      setError("");
      navigate("/message");
      return;
    } catch (error) {
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };

  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/logout", {
          withCredentials: true,
        })
        .then(() => {
          setUser("");
        })
        .then(localStorage.clear("user"))
        .then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  const localStorageUser = () => {
    if (localStorage.getItem("user") == "undefined") return;

    const user = JSON.parse(localStorage.getItem("user"));
    return setUser(user);
  };
  useEffect(() => {
    localStorageUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, error, user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
