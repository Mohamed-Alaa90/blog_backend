import { Router } from "express";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postsRoute from "./routes/postsRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", usersRoute);
routes.use("/posts", postsRoute);
routes.use("/upload", uploadRoute);
routes.use("/comments", commentsRoute);

routes.get("/", (req, res) => {
  res.json("welcome in my blog server");
});

export default routes;
