import { Router } from "express";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postRoute from "./routes/postRoute.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", usersRoute);
routes.use("/posts", postRoute);

routes.get("/", (req, res) => {
  res.json("welcome in my blog server");
});

export default routes;
