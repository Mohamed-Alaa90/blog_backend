import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/**
 * @description Get All Users Profile
 * @router /api/users/profile
 * @access private (Only Admin)
 * @method GET
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

/**
 * @description Get All Users Profile
 * @router /api/users/profile
 * @access private (Only Admin)
 * @method POST
 */
