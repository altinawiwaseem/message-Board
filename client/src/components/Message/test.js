import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function Message() {
  const [data, setData] = useState("");
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");
  const [menu, setMenu] = useState(false);

  const valueRef = useRef("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      if (!edit) {
        await axios.post(
          "http://localhost:5000/message/create",
          {
            message: formData.get("message"),
          },
          {
            withCredentials: true,
          }
        );
        getMessages();
        setInput("");

        return;
      } else {
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
      }
      setInput("");
      setEdit("");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const getMessages = async () => {
    const response = await axios.get(
      "http://localhost:5000/message/allmessages",
      {
        withCredentials: true,
      }
    );
    if (response.data.message) setData(response.data.message);
  };
  const handelUpdate = async (id, content) => {
    setEdit(id);
    setInput(content);
    valueRef.current.focus();
  };

  useEffect(() => {
    getMessages();
  }, [input]);

  return (
    <>
      <h1>Message</h1>

      <div>
        {data &&
          data.map(
            (message) =>
              message.deleted === false && (
                <div key={message._id} id={message._id} className={menu}>
                  <li>{message.content}</li>
                  <BsThreeDotsVertical onClick={() => setMenu(!menu)} />
                  {menu && (
                    <AiFillEdit
                      onClick={() => handelUpdate(message._id, message.content)}
                    />
                  )}
                </div>
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
