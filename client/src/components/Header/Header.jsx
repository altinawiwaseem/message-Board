import React, { useEffect, useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Header.module.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  useEffect(() => {
    const data = localStorage.getItem("show");
    if (data !== null) setIsLoggedIn(JSON.parse(data));
  }, []);

  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/logout", {
          withCredentials: true,
        })
        .then(() => {
          localStorage.setItem("show", JSON.stringify(false));
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
