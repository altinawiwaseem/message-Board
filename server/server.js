import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3001;

// specify your middleware here

// specify your routes here

console.log("Connecting to database. Put the kettle on while you wait... 🫖");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

app.listen(port, () =>
  console.log(`The server is listening on port ${port} ... 🐒`)
);
