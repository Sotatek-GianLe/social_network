import * as yup from "yup";

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().required(),
    password: yup.string().min(8).required(),
  }),
});

export const registerSchema = yup.object({
  body: yup.object({
    email: yup.string().required(),
    password: yup.string().min(8).required(),
    username: yup.string().min(4).required(),
  }),
});
