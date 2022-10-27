import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Header.module.css";
import { UserContext } from "../Context/UserContext";

function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("show"));
  /* const {  } = useContext(UserContext); */

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("show"));
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/logout", {
          withCredentials: true,
        })
        .then(() => {
          setIsLoggedIn(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.mainHeader}>
      <div className={style.headerLeft}>
        <img alt="logo." src={logo} />
        <h1>Message Board</h1>
      </div>

      <div>
        {!isLoggedIn && (
          <Link to="/login">
            <button className={style.button}>Login</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button className={style.button} onClick={handleLogout}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
