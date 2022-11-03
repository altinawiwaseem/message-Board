/* import React from "react";
import style from "./Message.module.css";
import FileBase64 from "react-file-base64";
import { Button, IconButton } from "@mui/material";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";

function Input() {

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
  return (
    <div>
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
  );
}

export default Input;
 */
