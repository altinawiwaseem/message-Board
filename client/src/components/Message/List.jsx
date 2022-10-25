import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function AllBlogs({ item, handleUpdate, handleDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => {
    setIsExpanded((s) => !s);
  };

  return (
    item && (
      <Card
        sx={{
          width: "100%",
          /* margin: "auto", */
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 20px #ccc",
          ":hover": { boxShadow: "20px 20px 20px #ccc" },
        }}
      >
        <CardHeader
          avatar={<Avatar alt="item.user.firstName" src={item.user.avatar} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          subheader={item.dates.created.slice(0, -14)}
        />
        {/*  <CardMedia
          component="img"
          height="194"
          image={item.user.avatar}
          alt="Paella dish"
        /> */}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.content}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}

export default AllBlogs;
