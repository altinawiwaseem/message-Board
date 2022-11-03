import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import style from "./Message.module.css";
import { Box } from "@mui/system";
import { Alert, Button, IconButton, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import Blogs from "./List";
import SendIcon from "@material-ui/icons/Send";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { UserContext } from "../Context/UserContext";

export default function Message() {
  const [image, setImage] = useState({ image: "" });
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [val, setVal] = useState(0);

  const valueRef = useRef("");
  const { user } = useContext(UserContext);

  const handleMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (!edit) {
        if (formData.get("message") == "") {
          setError("You should insert a message");
          return;
        } else if (formData.get("title") == "") {
          setError("You should insert a Title");
          return;
        }

        await axios.post(
          "http://localhost:5000/message/create",
          {
            message: formData.get("message").trim(),
            title: formData.get("title").trim(),
            image: image,
          },
          {
            withCredentials: true,
          }
        );
        setError("");
        getMessages();
        setInput("");
        setTitleInput("");
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
            title: titleInput.trim(),
          },
          {
            withCredentials: true,
          }
        );
        setError("");
        setInput("");
        setTitleInput("");
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

  const handleUpdate = (id, content, title) => {
    setEdit(id);
    setInput(content);
    setTitleInput(title);
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

  const addComment = async (id, comment, user) => {
    try {
      await axios.patch(
        "http://localhost:5000/message/comment",
        {
          id: id,
          comment: comment,
          user,
        },
        { withCredentials: true }
      );
      getMessages();
      getUserMessages();
    } catch (error) {
      console.log("error adding comment", error);
    }
  };
  const deleteComment = async (messageId, commentId) => {
    try {
      await axios.patch(
        "http://localhost:5000/message/deletecomment",
        {
          commentId,
          messageId,
        },
        { withCredentials: true }
      );
      getMessages();
      getUserMessages();
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  useEffect(() => {
    getMessages();
    getUserMessages();
  }, []);

  return (
    <div>
      <Box display="flex" justifyContent={"center"}>
        <Tabs value={val} onChange={(e, val) => setVal(val)}>
          <Tab LinkComponent={Link} to="/message" label="All Blogs" />
          <Tab label="My Blogs" />
        </Tabs>
      </Box>
      <div className={style.mainContainer}>
        {" "}
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
                          isUser={user._id === message.user._id}
                          item={message}
                          id={message._id}
                          handleUpdate={handleUpdate}
                          handleDelete={handleDelete}
                          addComment={addComment}
                          deleteComment={deleteComment}
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
                          isUser={user._id === message.user._id}
                          item={message}
                          id={message._id}
                          handleUpdate={handleUpdate}
                          handleDelete={handleDelete}
                        />
                      </ul>
                    )
                )}
        </div>
        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleMessage}>
            <input
              className={style.titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Title"
              type="text"
              name="title"
              autoFocus
              value={titleInput}
              ref={valueRef}
            />
            <textarea
              rows="14"
              cols="10"
              wrap="soft"
              className={style.input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind?"
              type="text"
              name="message"
              ref={valueRef}
              value={input}
            />
            <IconButton size="large">
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
                width: "100%",
                border: "1px #1976d2 solid",
                borderRadius: "0.4rem",
                padding: "1rem 2rem",
              }}
            >
              send
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
      </div>
    </div>
  );
}
