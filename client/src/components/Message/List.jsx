import { motion } from "framer-motion/dist/framer-motion";
import style from "./Message.module.css";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import styled from "@emotion/styled";

function AllBlogs({
  item,
  handleUpdate,
  handleDelete,
  isUser,
  addComment,
  deleteComment,
}) {
  const { user } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(item._id, e.target[0].value, user);
    e.target.reset();
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    item && (
      <motion.div
        layout
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 75 }}
      >
        <Card
          sx={{
            width: "100%",
            mt: 2,
            padding: 2,
            boxShadow: "5px 5px 20px #ccc",
            ":hover": { boxShadow: "20px 20px 20px #ccc" },
          }}
        >
          {isUser && (
            <Box display="flex">
              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => handleUpdate(item._id, item.content, item.title)}
              >
                <BorderColorIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(item._id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          )}
          <CardHeader
            avatar={<Avatar alt="item.user.firstName" src={item.user.avatar} />}
            subheader={item.dates.created.slice(0, -14)}
          ></CardHeader>
          {item.image && (
            <CardMedia
              component="img"
              height="250"
              image={item.image}
              alt="img"
              sx={{ objectFit: "contain" }}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              <b>Title: </b> {item.title}
            </Typography>
            <Typography variant="h5">
              <b>{item.user.firstName}</b>: {item.content}
            </Typography>
          </CardContent>
          {item.comments && (
            <>
              <b
                className={style.listB}
                onClick={handleExpandClick}
                sx={{ cursor: "pointer" }}
              >
                {item.comments.length} Comments
              </b>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {item.comments
                  .slice()
                  .reverse()
                  .map((comment, i) => (
                    <div key={i}>
                      {console.log("comment", comment)}
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ width: 25, height: 25 }}
                            alt="comment.user.firstName"
                            src={comment.user.avatar}
                          />
                        }
                        subheader={comment.user.firstName}
                        title={comment.dates.created.slice(0, -14)}
                      ></CardHeader>

                      <Typography>{comment.comment}</Typography>
                      <IconButton
                        onClick={() => deleteComment(item._id, comment._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <hr />
                    </div>
                  ))}
              </Collapse>
            </>
          )}
          <form onSubmit={handleSubmit}>
            <Input sx={{ width: "100%" }} placeholder="Add Comment" />
          </form>
        </Card>
      </motion.div>
    )
  );
}

export default AllBlogs;
