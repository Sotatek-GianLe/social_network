import express from "express";

import { deleteUserById, getUsers, getUserById } from "../db/users";
import { responseObj } from "../helpers";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return responseObj(res, { code: 200, result: users });
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};

export const getUserDetail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    return responseObj(res, { code: 200, result: user });
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return responseObj(res, { code: 400 });
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res
      .status(200)
      .json(responseObj(res, { code: res.statusCode, result: user }))
      .end();
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return responseObj(res, { code: 200, result: deletedUser });
  } catch (error) {
    console.log(error);
    return responseObj(res, { code: 400 });
  }
};
