import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Users() {
  const [data, setData] = useState("");

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/user/allUser", {
      withCredentials: true,
    });

    if (response.data) setData(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {data &&
        data.map((user) => (
          <ul key={user._id} id={user._id}>
            <p>{user.firstName}</p>
            <img src={user.avatar} alt="user-avatar" />
          </ul>
        ))}
    </div>
  );
}

export default Users;
