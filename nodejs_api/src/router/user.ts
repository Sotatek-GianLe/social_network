import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserDetail,
} from "../controllers/user";
import { isAuthenticated, isOwner } from "../middlewares";
import { validate } from "../helpers";
import { updateUserSchema } from "../validations/user";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:id", isAuthenticated, getUserDetail);
  router.patch(
    "/users/:id",
    isAuthenticated,
    isOwner,
    validate(updateUserSchema),
    updateUser
  );
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};