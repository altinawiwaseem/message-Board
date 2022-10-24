import React, { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Header() {
  const [value, setValue] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  /* const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout");
      console.log("first");
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <AppBar
      sx={{
        background: "#4267b2",
        position: "sticky",
        height: "10vh",
      }}
    >
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 32,
            marginRight: 1,
          }}
          alt="Your logo."
          src={logo}
        />
        <Typography variant="h4" sx={{ color: "white" }}>
          Message Board
        </Typography>

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ color: "white", margin: 1, borderRadius: 10 }}
              >
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              /*  onClick={handleLogout} */
              variant="contained"
              sx={{ color: "white", margin: 1, borderRadius: 10 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
