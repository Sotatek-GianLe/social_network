import express from "express";
import { merge, get } from "lodash";

import { getUserBySessionToken } from "../db/users";
import { responseObj } from "../helpers";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[process.env.COOKIE_KEY];

    if (!sessionToken) {
      return responseObj(res, { code: 403 });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return responseObj(res, { code: 403 });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return responseObj(res, { code: 400 });
    }

    if (currentUserId.toString() !== id) {
      return responseObj(res, { code: 403 });
    }

    next();
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};
