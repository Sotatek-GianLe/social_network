import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { authentication, random, responseObj } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseObj(res, {
        code: 400,
        errors: { message: "Email and password are required" },
      });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return responseObj(res, {
        code: 400,
        errors: { message: "This email does not exist" },
      });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return responseObj(res, {
        code: 403,
        errors: { message: "The password is incorrect" },
      });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie(process.env.COOKIE_KEY, user.authentication.sessionToken, {
      signed: true,
      maxAge: 24 * 3600 * 1000,
    });

    return res
      .status(200)
      .json(responseObj(res, { code: res.statusCode, result: user }))
      .end();
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return responseObj(res, { code: 400 });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return responseObj(res, {
        code: 400,
        errors: { message: "The email already exists" },
      });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res
      .status(200)
      .json(responseObj(res, { code: res.statusCode, result: user }))
      .end();
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};
