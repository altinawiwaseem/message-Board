import "./App.css";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Message from "./components/Message";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/message"
          element={
            <>
              <Message />
              <Users />
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
    </div>
  );
}

export default App;
