import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Register/Register.module.css";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios
        .post(
          "http://localhost:5000/user/login",
          {
            email: formData.get("email"),
            password: formData.get("password"),
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => localStorage.setItem("userId", data.data.user._id))
        .then(() => {
          localStorage.setItem("show", true);
        });

      setError("");
      navigate("/message");
    } catch (error) {
      console.log(error);
      setError(" The email address or password is incorrect ");
    }
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleLogin}>
        <Box
          width={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #888"
          padding={3}
          margin="auto"
          borderRadius={5}
          gap="1rem"
          sx={{ background: "#f6f6f6" }}
        >
          <Typography variant="h3" textAlign="center">
            Login
          </Typography>
          <Typography color="red" textAlign="center">
            {error}
          </Typography>
          <TextField
            className={style.input}
            placeholder=" E-mail"
            type="email"
            autoComplete="email"
            name="email"
            required
          />
          <TextField
            className={style.input}
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <Button
            className={style.button}
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "0.4rem",
              padding: "1rem 2rem",
              marginTop: 3,
              width: "90%",
            }}
          >
            Login
          </Button>
          <Typography marginTop={2}>
            Don't have an account ?{" "}
            {
              <Link className={style.a} variant="contained" to="/">
                Register
              </Link>
            }
          </Typography>
        </Box>
      </form>
    </div>
  );
}

/* import { useEffect, useState, useRef } from "react";
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

 return (
    <>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.h1}>Register</h1>
          {error ? <p>{error}</p> : null}
          <input
            placeholder="First name"
            className={style.input}
            type="text"
            autoComplete="firstName"
            name="firstName"
            required
          />

          <input
            placeholder="Last name"
            className={style.input}
            type="text"
            autoComplete="lastName"
            name="lastName"
            required
          />
          <input
            placeholder=" E-mail"
            className={style.input}
            type="email"
            autoComplete="email"
            name="email"
            required
          />
          <input
            placeholder="Password"
            className={style.input}
            type="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <button className={style.button} type="submit">
            Register
          </button>
          <span className={style.navLink}>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
    </>
  );
} 

 export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post("http://localhost:5000/user/register", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  }; */

/* 
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {message.user.avatar}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          
          subheader={Date.parse({item.date.created})}
        />
       
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {item.content}
          </Typography>
        </CardContent>
       
        
      </Card>
    );
  }
  
  <li>
        {item.content}
        <BsThreeDotsVertical onClick={toggle} />
        {isExpanded && (
          <React.Fragment>
            <AiFillEdit onClick={() => handleUpdate(item._id, item.content)} />
            <MdOutlineDeleteForever onClick={() => handleDelete(item._id)} />
          </React.Fragment>
        )}
      </li>  */
