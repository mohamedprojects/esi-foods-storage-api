import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173/",
      "http://localhost:5173",
      "https://esi-foods.vercel.app/",
      "https://esi-foods.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
