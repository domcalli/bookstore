import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Allow all Origins with default of cors(*)
app.use(cors());
// Allow custom Origins
// app.use({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the BOOKSTORE!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
