import { useEffect, useState, useRef } from "react";
import axios from "axios";
import List from "./List";

export default function Message() {
  const [data, setData] = useState("");
  const [edit, setEdit] = useState("");
  const [del, setDel] = useState("");
  const [input, setInput] = useState("");

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
        await axios.patch(
          "http://localhost:5000/message/update",
          {
            id: edit,
            content: input,
          },
          {
            withCredentials: true,
          }
        );
        setInput("");
        setEdit("");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* const deleteMessage = async () => {
    console.log("first");
    await axios.patch(
      "http://localhost:5000/message/delete",
      { id: del },
      { withCredentials: true }
    );
    setDel("");
  }; */

  const getMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/allmessages",
      {
        withCredentials: true,
      }
    );
    if (response.data.message) setData(response.data.message);
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
  }, [input]);

  return (
    <>
      <h1>Message</h1>

      <div>
        {data &&
          data?.map(
            (message) =>
              message.deleted === false && (
                <ul key={message._id} id={message._id}>
                  <List
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
    </>
  );
}