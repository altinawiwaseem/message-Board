import { useEffect, useState, useRef } from "react";
import axios from "axios";
import List from "./List";
import style from "./Message.module.css";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import AllBlogs from "./List";

export default function Message() {
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");
  const [val, setVal] = useState(0);

  const valueRef = useRef("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (!edit) {
        if (formData.get("message") == "") return;
        await axios.post(
          "http://localhost:5000/message/create",
          {
            message: formData.get("message").trim(),
          },
          {
            withCredentials: true,
          }
        );
        getMessages();
        setInput("");

        return;
      } else if (edit) {
        if (!input) return;
        await axios.patch(
          "http://localhost:5000/message/update",
          {
            id: edit,
            content: input.trim(),
          },
          {
            withCredentials: true,
          }
        );
        setInput("");
        setEdit("");
        getMessages();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/usermessages",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.data) setUserData(response.data);
  };

  const getMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/allmessages",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.data) setData(response.data);
  };

  const handleUpdate = (id, content) => {
    setEdit(id);
    setInput(content);
    valueRef.current.focus();
  };
  const handleDelete = async (id) => {
    try {
      await axios.patch(
        "http://localhost:5000/message/delete",
        { id: id },
        { withCredentials: true }
      );
      getMessages();
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent={"center"}>
        <Tabs value={val} onChange={(e, val) => setVal(val)}>
          <Tab LinkComponent={Link} to="/allBlogs" label="All Blogs" />
          <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
        </Tabs>
      </Box>

      <div className={style.mainContainer}>
        <div className={style.dataContainer}>
          {data &&
            data?.map(
              (message) =>
                message.deleted === false && (
                  <ul key={message._id} id={message._id}>
                    <AllBlogs
                      item={message}
                      id={message._id}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                    />
                    <img src={message.user.avatar} alt="user-avatar" />
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
