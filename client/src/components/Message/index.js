import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import style from "./Message.module.css";
import { Box } from "@mui/system";
import { Button, IconButton, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import Blogs from "./List";
import SendIcon from "@material-ui/icons/Send";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
export default function Message() {
  const [image, setImage] = useState({ image: "" });
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
            image: image,
          },
          {
            withCredentials: true,
          }
        );
        getMessages();
        setInput("");
        getUserMessages();
        setImage("");
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
        getUserMessages();
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

    if (response.data) setUserData(response.data);
  };

  const getMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/allmessages",
      {
        withCredentials: true,
      }
    );

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
      getUserMessages();
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  useEffect(() => {
    getMessages();
    getUserMessages();
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <Box display="flex" justifyContent={"center"}>
          <Tabs value={val} onChange={(e, val) => setVal(val)}>
            <Tab LinkComponent={Link} to="/message" label="All Blogs" />
            <Tab label="My Blogs" />
          </Tabs>
        </Box>

        <div className={style.dataContainer}>
          {data && val === 0
            ? data
                ?.slice()
                .reverse()
                .map(
                  (message) =>
                    message.deleted === false && (
                      <ul key={message._id} id={message._id}>
                        <Blogs
                          isUser={
                            localStorage.getItem("userId") === message.user._id
                          }
                          item={message}
                          id={message._id}
                          handleUpdate={handleUpdate}
                          handleDelete={handleDelete}
                        />
                      </ul>
                    )
                )
            : userData &&
              userData
                ?.slice()
                .reverse()
                .map(
                  (message) =>
                    message.deleted === false && (
                      <ul key={message._id} id={message._id}>
                        <Blogs
                          isUser={
                            localStorage.getItem("userId") === message.user._id
                          }
                          item={message}
                          id={message._id}
                          handleUpdate={handleUpdate}
                          handleDelete={handleDelete}
                        />
                      </ul>
                    )
                )}
        </div>

        <form className={style.form} onSubmit={handleMessage}>
          <input
            className={style.input}
            onChange={handleChange}
            placeholder="What's on your mind?"
            type="text"
            name="message"
            ref={valueRef}
            value={input}
            autoFocus
          />
          <IconButton>
            <label className={style.fileBaseIcon}>
              <PhotoCamera htmlFor="file" />
              <FileBase64
                type="file"
                multilple={false}
                onDone={({ base64 }) => setImage({ image: base64 })}
              />
            </label>
          </IconButton>

          <Button
            endIcon={<SendIcon className={style.button} />}
            type="submit"
            sx={{
              border: "1px #1976d2 solid",
              borderRadius: "0.4rem",
              padding: "1rem 2rem",
            }}
          >
            send
          </Button>
        </form>
      </div>
    </>
  );
}
