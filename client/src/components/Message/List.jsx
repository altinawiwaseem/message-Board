import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";

function AllBlogs({ item, handleUpdate, handleDelete, isUser }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => {
    setIsExpanded((s) => !s);
  };

  return (
    item && (
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
            <IconButton sx={{ marginLeft: "auto" }}>
              <AiFillEdit
                onClick={() => handleUpdate(item._id, item.content)}
              />
            </IconButton>
            <IconButton>
              <MdOutlineDeleteForever onClick={() => handleDelete(item._id)} />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={<Avatar alt="item.user.firstName" src={item.user.avatar} />}
          subheader={item.dates.created.slice(0, -14)}
        >
          {" "}
        </CardHeader>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{item.user.firstName}</b>: {item.content}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}

export default AllBlogs;
