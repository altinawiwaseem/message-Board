/* import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./Message.module.css";
import AllBlogs from "./List";

function MyMessage() {
  const valueRef = useRef("");
  const [userData, setUserData] = useState("");
  const [val, setVal] = useState(0);
  const [input, setInput] = useState("");

  console.log(userData);
  const getUserMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/usermessages",
      {
        withCredentials: true,
      }
    );

    if (response.data) setUserData(response.data);
  };
  useEffect(() => {
    getUserMessages();
  }, []);
  return (
    <>
      <Box display="flex" justifyContent={"center"}>
        <Tabs value={val} onChange={(e, val) => setVal(val)}>
          <Tab LinkComponent={Link} to="/message" label="All Blogs" />
          <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
        </Tabs>
      </Box>

      <div className={style.mainContainer}>
        <div className={style.dataContainer}>
          {userData &&
            userData?.map(
              (message) =>
                message.deleted === false && (
                  <ul key={message._id} id={message._id}>
                    <AllBlogs
                      item={message}
                      id={message._id}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                    />
                  </ul>
                )
            )}
        </div>

        <form onSubmit={handleMessage}>
          <input
            onChange={handleChange}
            type="text"
            name="message"
            placeholder={"Enter a message"}
            ref={valueRef}
            value={input}
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default MyMessage;
 */
