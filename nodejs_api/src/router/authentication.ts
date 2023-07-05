import express from "express";

import { login, register } from "../controllers/authentication";
import { loginSchema, registerSchema } from "../validations/authentication";
import { validate } from "../helpers";

export default (router: express.Router) => {
  router.post("/auth/register", validate(registerSchema), register);
  router.post("/auth/login", validate(loginSchema), login);
};
