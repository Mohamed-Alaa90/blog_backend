import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import color from "colors";
import apiRoute from "./routes.js";
import morgan from "morgan";

const app = express();

await connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

//routes
app.use("/api", apiRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.info(`server is running on port ${PORT}`.bgBlue);
});
