import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function AllBlogs({ item, handleUpdate, handleDelete, isUser }) {
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
                onClick={() => handleUpdate(item._id, item.content)}
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
          >
            {" "}
          </CardHeader>
          {item.image && (
            <CardMedia
              component="img"
              height="194"
              image={item.image}
              alt="img"
            />
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <b>{item.user.firstName}</b>: {item.content}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    )
  );
}

export default AllBlogs;
