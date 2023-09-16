import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the BOOKSTORE!");
});

app.use("/books", booksRoute);

// mongoose
//   .connect(precess.env.MONGO_URI)
//   .then(() => {
//     console.log("App connected to database");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// app.listen(PORT, () => {
//   console.log(`App is listening to port: ${PORT}`);
// });

// Connect to MongoDB Atlas Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
