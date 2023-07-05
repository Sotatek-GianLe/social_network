import * as yup from "yup";

export const updateUserSchema = yup.object({
  body: yup.object({
    username: yup.string().min(4).required(),
  }),
});
