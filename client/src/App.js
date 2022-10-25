import "./App.css";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Message from "./components/Message";
import Users from "./components/Users";
import Header from "./components/Header/Header";
import MyMessage from "./components/Message/MyMessage";
import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/message"
            element={
              <>
                <Message />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Users />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
