import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { verifyTokenAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/profile").get(verifyTokenAdmin, getAllUsers);

export default router;
