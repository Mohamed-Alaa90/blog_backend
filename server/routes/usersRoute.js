import { Router } from "express";
import { getAllUsers, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { verifyTokenAndAdmin, verifyTokenAndOnlyUser } from "../middlewares/auth.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = Router();

router.route("/profile").get(verifyTokenAndAdmin, getAllUsers);
router.route("/profile/:id")
    .get(validateObjectId, getUserProfile)
    .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfile)
export default router;
