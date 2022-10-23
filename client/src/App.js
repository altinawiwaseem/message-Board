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

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
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
                <MyMessage />
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
