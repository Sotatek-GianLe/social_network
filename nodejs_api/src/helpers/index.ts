import {
  BAD_REQUEST,
  INTERNAL,
  SUCCESS,
  UNAUTHORIZE,
} from "../constants/apiResponse";
import crypto from "crypto";
import express from "express";
import { AnySchema } from "yup";

const SECRET = process.env.SECRET_KEY;

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const validate =
  (schema: AnySchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return responseObj(res, {
        code: 500,
        errors: { type: err.name, message: err.message },
      });
    }
  };

export const responseObj = (
  res: express.Response,
  { errors = {}, code = 400, message = "", result = {} }
) => {
  if (code && !message) {
    switch (code) {
      case 200:
        message = SUCCESS;
        break;
      case 401:
        message = UNAUTHORIZE;
        break;
      case 403:
        message = UNAUTHORIZE;
        break;
      case 500:
        message = INTERNAL;
        break;

      default:
        message = BAD_REQUEST;
        break;
    }
  }

  switch (code) {
    case 200:
      res.json({ result, code, message });
      break;

    case 401:
    case 403:
    case 500:
      res.json({ errors, code, message });
      break;

    default:
      res.json({ result, code, message });
      break;
  }
};
