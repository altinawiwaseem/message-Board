import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Message from "./components/Message";
import Users from "./components/Users";
import Header from "./components/Header/Header";

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
